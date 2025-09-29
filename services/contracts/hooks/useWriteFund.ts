import { config } from "@/lib/networks/config";
import { getChainId } from "@wagmi/core";
import { parseUnits } from "viem";
import { networkContractAddresses } from "../constants";
import { useWriteFundingFactory } from "./useWriteFundingFactory";
import { getNetworkTokens, getTokenAddress } from "../tokensConfig";
import { useSwitchChain } from "wagmi";

export function useFund() {
  const fundContractFunc = useWriteFundingFactory();
  const { switchChain } = useSwitchChain();

  async function fundCampaign(
    campaignAddress: string,
    amount: string,
    token: string,
    campaignNetworkId: number,
    txValue?: string,
    options?: {
      errorCb?: () => Promise<void>;
      successCb?: () => Promise<void>;
    }
  ) {
    const chainId = getChainId(config);

    if (chainId !== campaignNetworkId) {
      switchChain({ chainId: campaignNetworkId });
    }

    const tokenAddress = getTokenAddress(token);
    const tokens = getNetworkTokens(campaignNetworkId);
    const foundToken = tokens.find((token) => token.address == tokenAddress);
    if (!foundToken)
      throw new Error(`token with address ${tokenAddress} not found`);

    const parsedAmount = parseUnits(amount, foundToken.decimals);

    console.log({ foundToken, campaignAddress, parsedAmount, amount });

    const { hash } = await fundContractFunc(
      "chainFundMe_fundChainFundMe",
      [campaignAddress, tokenAddress, parsedAmount],
      {
        onError: async () => {
          await options?.errorCb?.();
        },
        onSuccess: async () => {
          console.log(
            `Funded campaign ${campaignAddress} with ${amount} ${token}`
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
