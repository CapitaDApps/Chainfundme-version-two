import { IToken } from "@/types/token.types";
import { parseUnits, zeroAddress } from "viem";
import { useWriteFundingFactory } from "./useWriteFundingFactory";

export function useFund() {
  const fundContractFunc = useWriteFundingFactory();

  async function fundCampaign(
    campaignAddress: string,
    amount: string,
    token: IToken,

    options?: {
      errorCb?: () => Promise<void>;
      successCb?: () => Promise<void>;
    }
  ) {
    const tokenAddress = token.address;

    const parsedAmount = parseUnits(amount, token.decimals);

    console.log({ token, campaignAddress, parsedAmount, amount });

    let txValue: bigint | undefined;
    if (token.address === zeroAddress)
      txValue = parseUnits(amount, token.decimals);

    const { hash } = await fundContractFunc(
      "chainFundMe_fundChainFundMe",
      [campaignAddress, tokenAddress, parsedAmount],
      {
        onError: async () => {
          await options?.errorCb?.();
        },
        onSuccess: async () => {
          console.log(
            `Funded campaign ${campaignAddress} with ${amount} ${token.name}`
          );
          await options?.successCb?.();
        },
      },
      txValue
    );

    return hash;
  }

  return { fundCampaign };
}
