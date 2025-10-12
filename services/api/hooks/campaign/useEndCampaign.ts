import { useMutation } from "@tanstack/react-query";
import { endCampaign } from "../../campaign";
import { toast } from "sonner";

export function useEndCampaign() {
  const { mutate: endCampaignMutation, isPending: endingCampaign } =
    useMutation({
      mutationFn: async ({
        campaignId,
        networkId,
      }: {
        campaignId: string;
        networkId: string;
      }) => await endCampaign(campaignId, networkId),

      onError: (err) => {
        toast.error(err.message);
      },
      onSuccess(data) {
        toast.success(data);
      },
    });

  return { endCampaignMutation, endingCampaign };
}
