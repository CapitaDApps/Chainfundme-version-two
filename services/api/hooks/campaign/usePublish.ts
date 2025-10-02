import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishCampaign } from "../../campaign";

export function usePublish() {
  const queryClient = useQueryClient();
  const { mutateAsync: publish, isPending: publishing } = useMutation({
    mutationFn: async ({
      campaignId,
      tokens,
      networkId,
    }: {
      campaignId: string;
      tokens: string[];
      networkId: number;
    }) => await publishCampaign(campaignId, tokens, networkId),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { publish, publishing };
}
