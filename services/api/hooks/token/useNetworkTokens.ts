import { useAccount } from "wagmi";
import { useTokens } from "./useTokens";

export function useNetworkTokens() {
  const { chainId } = useAccount();

  const { tokens, fetchingTokens } = useTokens();

  const networkTokens =
    tokens?.filter((token) => token.chainId === chainId) || [];

  const defaultTokens = networkTokens.filter(
    (token) => token.type === "default"
  );

  return {
    tokens: networkTokens,
    defaultTokens,
    fetchingTokens,
  };
}
