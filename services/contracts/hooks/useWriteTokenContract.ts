/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWriteContract } from "wagmi";
import TokenABI from "../abi/Token.json";
import { parseEther } from "viem";

function useWriteTokenContract() {
  const { writeContractAsync } = useWriteContract();

  return async (
    tokenAddress: string,
    args: any[],
    functionName: string,
    options?: {
      value?: string;
      errorCb?: () => Promise<void>;
      successCb?: () => Promise<void>;
    }
  ) => {
    await writeContractAsync(
      {
        abi: TokenABI,
        address: tokenAddress as `0x${string}`,
        functionName,
        value: options?.value ? parseEther(options?.value) : undefined,
        args,
      },
      {
        onError: async () => {
          options?.errorCb?.();
        },
        onSuccess: async () => {
          console.log(
            `Function ${functionName} executed successfully on token ${tokenAddress}`
          );
          await options?.successCb?.();
        },
      }
    );
  };
}

export { useWriteTokenContract };
