"use client";
import { useAddFunder } from "@/services/api/hooks/funder/useAddFunder";
import { contractEvents } from "@/services/contracts/constants";
import { useWatchFactoryEvents } from "@/services/contracts/hooks/events/useWatchFactoryEvents";
import { useWatchTokenEvents } from "@/services/contracts/hooks/events/useWatchTokenEvents";
import { useFund } from "@/services/contracts/hooks/useWriteFund";
import { useWriteTokenContract } from "@/services/contracts/hooks/useWriteTokenContract";
import { TokenObjectType } from "@/services/contracts/tokensConfig";
import { usePrivy } from "@privy-io/react-auth";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { parseUnits, zeroAddress } from "viem";
import { useAccount } from "wagmi";

function SelectToken({
  tokens,
  campaignAddress,
  campaignNetworkId,
  campaignId,
}: {
  tokens: TokenObjectType[];
  campaignAddress: string | undefined;
  campaignNetworkId: number;
  campaignId: string;
}) {
  const [selectedToken, setSelectedToken] = useState("");
  const [amount, setAmount] = useState("");
  const [isFunding, setIsFunding] = useState(false);
  const writeTokenContract = useWriteTokenContract();

  const { user } = usePrivy();
  const { address } = useAccount();
  const { fundCampaign } = useFund();

  const { syncFund } = useAddFunder();

  const queryClient = useQueryClient();

  const token = tokens.find((token) => token.name == selectedToken);

  useWatchTokenEvents({
    tokenAddress: token?.address || "",
    eventName: contractEvents.token.Approval,
    cb: async () => {
      if (!campaignAddress) return;
      console.log("Token approval event detected", token?.address);
      toast.success("Approval successful. Confirm next transaction to fund");

      fundCampaign(
        campaignAddress,
        amount,
        selectedToken,
        campaignNetworkId,
        undefined,
        {
          errorCb: async () => {
            toast.error("Error funding, Please try again.");
            setIsFunding(false);
          },
          successCb: async () => {
            toast.success("Sending Transaction...");
          },
        }
      );
    },
  });

  useWatchFactoryEvents({
    eventName: contractEvents.FundingFactory.CampaignFunded,
    async cb() {
      console.log({ ad: campaignAddress });
      syncFund(
        {
          userId: user?.id || "",
          campaignId,
          tokenAddress: token?.address || "",
          amount: parseUnits(amount, token?.decimals || 18).toString(),
          chainId: campaignNetworkId,
        },
        {
          onSuccess: () => {
            toast.success("You've successfully funded the campaign");
            setIsFunding(false);
            queryClient.invalidateQueries();
          },
          onError: () => {
            setIsFunding(false);
          },
        }
      );
    },
  });

  // useWatchChainFundMeEvents({
  //   chainFundMeAddress: campaignAddress!,
  //   eventName: contractEvents.ChainFundMe.Deposited,
  //   cb: async () => {

  //   },
  // });

  const handleFund = async () => {
    if (!selectedToken || !amount || !address || !user) return;

    const token = tokens.find((token) => token.name == selectedToken);

    if (!token) {
      return toast.error(`Could not process token ${selectedToken}`);
    }

    if (!campaignAddress) return;
    console.log({ campaignAddress, campaignNetworkId });
    if (token.address == zeroAddress) {
      // not need for approval
      // Fund
      setIsFunding(true);
      await fundCampaign(
        campaignAddress,
        amount,
        token.name,
        campaignNetworkId,
        amount,
        {
          errorCb: async () => {
            toast.error("Error funding, Please try again.");
            setIsFunding(false);
          },
          successCb: async () => {
            setIsFunding(false);
            toast.success("Successfully Funded.");
          },
        }
      );
    } else {
      // Approval then Fund
      setIsFunding(true);
      await writeTokenContract(
        token.address,
        [campaignAddress, parseUnits(amount, token.decimals)],
        "approve",
        {
          errorCb: async () => {
            toast.error("Error approving token, Please try again.");
            setIsFunding(false);
          },
          successCb: async () => {
            console.log("Watching event for token approval");
          },
        }
      );
    }
  };

  return (
    <div className="rounded-md md:p-4 bg-transparent">
      <div className="flex flex-row gap-3 md:gap-6 mb-4">
        <div className="w-[70%] py-3">
          <label className="md:text-sm text-[10px] text-sidebar-content mb-2">
            Select Token
          </label>
          <div className="relative">
            <select
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className="w-full rounded-md bg-background border border-disabled-text px-3 py-2 h-10 text-sidebar-content md:text-sm text-[12px] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isFunding}
            >
              <option value="">Select token</option>
              {tokens.map((token) => (
                <option key={token.address} value={token.name}>
                  {token.name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sidebar-content">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="w-[100%] md:py-3 py-4">
          <label className="md:text-sm text-[10px] text-sidebar-content block mb-1">
            Enter Amount
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-md bg-background border border-disabled-text px-3 py-2 h-10 text-sidebar-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent md:text-sm text-[12px]"
            disabled={isFunding}
          />
        </div>

        <div className="w-[100%] py-2">
          <label className="text-sm block mb-2">fund campaign</label>
          <button
            style={{
              background:
                "linear-gradient(270.05deg, #003def 68.33%, #001f7a 114.25%)",
            }}
            className="w-[100%] bg-primary md:px-4 py-2.5 rounded-md text-white last:col-span-2 md:last:col-span-1 md:text-sm text-[12px]"
            disabled={isFunding || !address}
            onClick={handleFund}
          >
            {isFunding ? (
              <ClipLoader size={20} color="#fff" />
            ) : (
              "Fund Campaign"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default SelectToken;
