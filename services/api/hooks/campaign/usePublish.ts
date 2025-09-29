import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishCampaign } from "../../campaign";

export function usePublish() {
  const queryClient = useQueryClient();
  const { mutateAsync: publish } = useMutation({
    mutationFn: async (campaignId: string) => await publishCampaign(campaignId),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { publish };
}
