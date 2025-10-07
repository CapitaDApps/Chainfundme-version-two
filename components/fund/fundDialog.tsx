import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getChainData } from "@/lib/networks/config";
import { ReturnCampaignDocument } from "@/types/api";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useFund } from "@/services/contracts/hooks/useWriteFund";
import { useSwitchChain } from "wagmi";
import { useWalletBalance } from "../wallet_connect/hooks/useWalletBalance";
import { useUser } from "@privy-io/react-auth";
import { redirect } from "next/navigation";
import { useAddFunder } from "@/services/api/hooks/funder/useAddFunder";
import { parseUnits } from "viem";
import { formatTimeLeft } from "@/lib/utils";
import { ClipLoader } from "react-spinners";
function FundDialog({
  campaign,
  children,
  isFunding,
  setIsFunding,
}: {
  campaign: ReturnCampaignDocument;
  children: React.ReactNode;
  isFunding: boolean;
  setIsFunding: Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const [amount, setAmount] = useState("");

  const { user } = useUser();

  const authenticated = !!user;

  const { switchChain } = useSwitchChain();

  const { fundCampaign } = useFund();

  const { tokenBalances } = useWalletBalance();

  const { syncFund } = useAddFunder();

  if (!campaign.campaignAddresses) return redirect("/explore");

  const startsInFuture = new Date(campaign.startDate).getTime() > Date.now();

  const tokens = campaign.tokens;
  const chains = campaign.chains;

  const selectedTokenBalance = tokenBalances.find(
    (token) => token.address === selectedToken
  );

  const tokenName = selectedTokenBalance?.name.split("(")[0];

  const tokensForChosenChain = tokens.filter(
    (token) => token.chainId === +selectedNetwork
  );

  const campaignAddress = campaign.campaignAddresses[selectedNetwork];

  const handleSwitchChain = (networkId: string) => {
    setSelectedNetwork(networkId);
    switchChain({ chainId: +networkId });
  };

  const handleDonate = async () => {
    if (!authenticated) return toast.error("Please sign in to donate");
    if (isNaN(Number(amount)) || !amount)
      return toast.error(`Enter valid ${tokenName} amount`);

    if (!campaign) return;
    if (!selectedTokenBalance) return;

    setIsFunding(true);

    fundCampaign(campaignAddress, amount, selectedTokenBalance, {
      successCb: async () => {
        // add funder
        syncFund(
          {
            campaignId: campaign.cmid,
            chainId: +selectedNetwork,
            userId: user.id,
            amount: parseUnits(
              amount,
              selectedTokenBalance.decimals
            ).toString(),
            tokenAddress: selectedToken,
          },
          {
            onSettled: () => {
              setIsFunding(false);
            },
            onSuccess: () => {
              toast.success("You have successfully supported this campaign.");
            },
          }
        );
      },
      errorCb: async () => {
        toast.error("Donation was unsuccessfully");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="text-left">
          <DialogTitle>Support cause - {campaign.title}</DialogTitle>
          <DialogDescription>
            Select your network and token to contribute to this campaign
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          {/* Networks */}
          <Select
            onValueChange={(val) => handleSwitchChain(val)}
            value={selectedNetwork}
          >
            <SelectTrigger className="border-[1px] border-primary-accent flex-1">
              <SelectValue placeholder="Select Chain" />
            </SelectTrigger>
            <SelectContent>
              {chains.map((chain) => (
                <SelectItem
                  value={chain.networkId.toString()}
                  key={chain.networkId}
                >
                  <Avatar className="w-4 h-4">
                    <AvatarImage src={chain.imagePath} />
                  </Avatar>
                  {chain.symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tokens */}
          {tokensForChosenChain.length > 0 && (
            <Select
              onValueChange={(val) => setSelectedToken(val)}
              value={selectedToken}
            >
              <SelectTrigger className="border-[1px] border-primary-accent flex-1">
                <SelectValue placeholder="Select tokens" />
              </SelectTrigger>

              <SelectContent>
                {tokensForChosenChain.map((token) => (
                  <SelectItem value={token.address} key={token.address}>
                    <Avatar className="w-4 h-4">
                      <AvatarImage src={token.imagePath} />
                    </Avatar>
                    {token.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {selectedTokenBalance && (
          <>
            <Input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className="h-9 border-[1px] border-primary-accent focus:outline-0 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-primary-accent px-4 placeholder:text-xs"
              placeholder={`Enter ${tokenName} Amount`}
            />
            {selectedTokenBalance && (
              <div className="border-[1px] border-primary-accent h-8 rounded-xl px-4 text-xs flex items-center justify-between">
                <p>Balance</p>

                <div className="flex items-center gap-3 text-xs">
                  {+amount >= +selectedTokenBalance.balance && (
                    <>
                      <p>Maxed</p> <p>|</p>
                    </>
                  )}
                  <div className="flex items-center text-gray-600 gap-1">
                    <p>{+selectedTokenBalance.balance}</p>
                    <p className="">
                      {selectedTokenBalance.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {selectedTokenBalance && (
              <Button
                className="bg-primary-accent rounded-xl"
                onClick={handleDonate}
                disabled={
                  !authenticated ||
                  +amount > +selectedTokenBalance.balance ||
                  startsInFuture
                }
              >
                {startsInFuture ? (
                  formatTimeLeft(campaign.startDate, campaign.endDate)
                ) : isFunding ? (
                  <ClipLoader color="#fff" size={20} />
                ) : (
                  "Donate"
                )}
              </Button>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
export default FundDialog;
