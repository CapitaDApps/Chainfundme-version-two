"use client";

import { getTokenAddress, tokenNames } from "@/services/contracts/tokensConfig";
import { useSendTransaction } from "@privy-io/react-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { encodeFunctionData, parseEther, parseUnits } from "viem";

import TokenABI from "@/services/contracts/abi/Token.json";

export function useTransfer() {
  const { sendTransaction } = useSendTransaction();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({
      selectedToken,
      recipientAddress,
      transferAmount,
    }: {
      selectedToken: string;
      recipientAddress: string;
      transferAmount: string;
    }) => {
      if (selectedToken === tokenNames.eth) {
        sendTransaction(
          {
            to: recipientAddress,
            value: parseEther(transferAmount),
          },
          {
            uiOptions: {
              showWalletUIs: true,
            },
          }
        );
      } else {
        const units = selectedToken === tokenNames.usdc ? 6 : 18;
        const data = encodeFunctionData({
          abi: TokenABI,
          functionName: "transfer",
          args: [recipientAddress, parseUnits(transferAmount, units)],
        });
        const tokenAddress = getTokenAddress(selectedToken);
        sendTransaction(
          {
            to: tokenAddress,
            value: 0,
            data,
          },
          {
            uiOptions: {
              showWalletUIs: true,
            },
          }
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["walletBalances"],
      });
    },
  });

  return {
    transfer: mutateAsync,
  };
}
