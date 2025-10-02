"use client";

import { getNetworkTokens } from "@/services/contracts/tokensConfig";
import { getCoinBalance } from "@/services/contracts/utils";
import { IToken, TokenType } from "@/types/token.types";
import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";

export function useWalletBalance() {
  const { user } = usePrivy();
  const address = user?.wallet?.address;

  const tokens = getNetworkTokens();

  const { data, isFetching } = useQuery({
    queryKey: ["walletBalances", address],
    queryFn: async () => {
      const balances: IToken[] = [];
      for (const token of tokens) {
        if (!address) return balances;
        const balance = await getCoinBalance(token.name, address);

        const exist = balances.findIndex((c) => c.name === token.name);
        if (exist > -1) {
          balances[exist] = {
            name: token.name as TokenType,
            balance,
            src: token.src,
          };
        } else {
          balances.push({
            name: token.name as TokenType,
            balance,
            src: token.src,
          });
        }
      }
      return balances;
    },
  });

  const tokenBalances: IToken[] = data || [];

  return {
    tokenBalances,
    isFetching,
  };
}
