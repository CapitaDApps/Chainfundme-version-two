"use client";

import { useSendTransaction } from "@privy-io/react-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { encodeFunctionData, parseEther, parseUnits, zeroAddress } from "viem";

import TokenABI from "@/services/contracts/abi/Token.json";
import { IToken } from "@/types/token.types";

export function useTransfer() {
  const { sendTransaction } = useSendTransaction();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({
      selectedToken,
      recipientAddress,
      transferAmount,
    }: {
      selectedToken: IToken | undefined;
      recipientAddress: string;
      transferAmount: string;
    }) => {
      if (!selectedToken) return console.log("Please select a token");
      if (selectedToken.address === zeroAddress) {
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
        const units = selectedToken.decimals;
        const data = encodeFunctionData({
          abi: TokenABI,
          functionName: "transfer",
          args: [recipientAddress, parseUnits(transferAmount, units)],
        });
        const tokenAddress = selectedToken.address;
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
