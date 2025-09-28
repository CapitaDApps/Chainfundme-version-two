/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWriteContract } from "wagmi";
import chainFundMeABI from "../abi/ChainFundMe.json";
import { parseEther } from "viem";

function useWriteChainFundMeContract() {
  const { writeContractAsync } = useWriteContract();

  return async (
    chainFundMeAddress: string,
    args: any[],
    functionName: string,
    value?: string
  ) => {
    const result = await writeContractAsync({
      abi: chainFundMeABI,
      address: chainFundMeAddress as `0x${string}`,
      functionName,
      value: value ? parseEther(value) : undefined,
      args,
    });
    return { hash: result };
  };
}
export { useWriteChainFundMeContract };
