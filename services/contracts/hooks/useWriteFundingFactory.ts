"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseEther } from "viem";
import { useAccount, useWriteContract } from "wagmi";

import CapitaFundingFactoryABI from "../abi/CapitaFundingFactory.json";
import { networkContractAddresses } from "../constants";

function useWriteFundingFactory() {
  const { chainId, address } = useAccount();
  console.log({ chainId, address });

  const { writeContractAsync } = useWriteContract();

  return async (
    functionName: string,
    args: any[],
    mutateOptions?: any,
    value?: string
  ) => {
    console.log({ chainId });
    const fundingFactoryAddress =
      networkContractAddresses[`${chainId}`].fundingFactoryAddress;

    const writeCall = async () =>
      await writeContractAsync(
        {
          address: fundingFactoryAddress as `0x${string}`,
          functionName,
          abi: CapitaFundingFactoryABI,
          args,
          value: value ? parseEther(value) : undefined,
        },
        mutateOptions
      );

    const result = await writeCall();
    console.log(
      `Function ${functionName} executed successfully on funding factory at ${fundingFactoryAddress}`
    );
    console.log("Transaction hash:", result);
    return { hash: result };
  };
}
export { useWriteFundingFactory };
