"use client";

import TokenABI from "@/services/contracts/abi/Token.json";
import { Log } from "viem";
import { useAccount, useWatchContractEvent } from "wagmi";

interface TokenApprovalLog extends Log {
  args: {
    owner: string;
    spender: string;
    value: bigint;
  };
}

export function useWatchTokenEvents({
  tokenAddress,
  eventName,
  cb,
}: {
  tokenAddress: string;
  eventName: string;
  cb: () => Promise<void>;
}) {
  const { address: connectedAddress } = useAccount();
  useWatchContractEvent({
    abi: TokenABI,
    address: tokenAddress as `0x${string}`,
    eventName,
    onLogs: async (logs) => {
      console.log(`Event ${eventName} detected on token ${tokenAddress}`);
      console.log({ logs });
      for (const log of logs) {
        if ((log as TokenApprovalLog).args.owner == connectedAddress) {
          console.log("Call back called");
          await cb();
        }
      }
    },
  });
}
