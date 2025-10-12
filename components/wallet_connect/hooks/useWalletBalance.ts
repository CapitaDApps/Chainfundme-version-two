"use client";

import { useNetworkTokens } from "@/services/api/hooks/token/useNetworkTokens";
import { getCoinBalance } from "@/services/contracts/utils";
import { IToken } from "@/types/token.types";
import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";

export function useWalletBalance() {
  const { user } = usePrivy();
  const address = user?.wallet?.address;

  const { tokens } = useNetworkTokens();

  const { data, isFetching } = useQuery({
    queryKey: ["walletBalances", address, tokens?.length],
    queryFn: async () => {
      if (!tokens) return;
      const balances: IToken[] = [];
      for (const token of tokens) {
        if (!address) return balances;
        const balance = await getCoinBalance(token, address);

        const exist = balances.findIndex((c) => c.name === token.name);
        if (exist > -1) {
          balances[exist] = {
            name: token.name,
            balance,
            src: token.imagePath,
            address: token.address,
            decimals: token.decimals,
            symbol: token.symbol,
          };
        } else {
          balances.push({
            name: token.name,
            balance,
            src: token.imagePath,
            address: token.address,
            decimals: token.decimals,
            symbol: token.symbol,
          });
        }
      }
      return balances;
    },
    enabled: !!tokens,
  });

  const tokenBalances: IToken[] = data || [];

  return {
    tokenBalances,
    isFetching,
  };
}
