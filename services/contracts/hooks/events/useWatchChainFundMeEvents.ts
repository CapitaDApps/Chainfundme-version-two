import ChainFundMeABI from "@/services/contracts/abi/ChainFundMe.json";
import { Log } from "viem";
import { useAccount, useWatchContractEvent } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";
import axios from "axios";
import { contractEvents } from "../../constants";

interface FundCampaignLog extends Log {
  args: {
    amount: bigint;
    funder: string;
    otherToken: string;
  };
}

export function useWatchChainFundMeEvents({
  chainFundMeAddress,
  eventName,
  cb,
}: {
  chainFundMeAddress: string;
  eventName: string;
  cb: () => Promise<void>;
}) {
  const { address } = useAccount();
  const { getAccessToken } = usePrivy();
  useWatchContractEvent({
    abi: ChainFundMeABI,
    address: chainFundMeAddress as `0x${string}`,
    eventName,
    onLogs: async (logs) => {
      console.log(
        `Event ${eventName} detected on ChainFundMe at ${chainFundMeAddress}`
      );
      const accessToken = await getAccessToken();

      if (eventName == contractEvents.ChainFundMe.Deposited) {
        for (const log of logs) {
          if ((log as FundCampaignLog).args.funder == address) {
            await cb();
          }
        }
      }
    },
  });
}
