"use client";

import { usePublish } from "@/services/api/hooks/campaign/usePublish";
import { useWriteFundingFactory } from "./useWriteFundingFactory";

import { useQueryClient } from "@tanstack/react-query";

export function useWriteCampaign() {
  const createCampaignFunc = useWriteFundingFactory();
  const queryClient = useQueryClient();
  const { publish } = usePublish();

  async function createChainFundMe(
    options: {
      uri: string;
      startTime: number;
      endTime: number;
      otherTokens: string[];
    },
    cb?: (err?: string) => void
  ) {
    console.log(options.otherTokens, "tokens");
    return await createCampaignFunc(
      "createChainFundMe",
      [options.startTime, options.endTime, options.uri, options.otherTokens],
      {
        onError: async (error: { message: string }) => {
          console.log(error);
          cb?.(error.message);
        },
        onSuccess: async () => {
          cb?.();

          await queryClient.invalidateQueries();
        },
      }
    );
  }

  return { createChainFundMe };
}
