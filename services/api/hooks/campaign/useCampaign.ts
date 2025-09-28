import { useQuery } from "@tanstack/react-query";
import { getCampaign } from "../../campaign";

export function useCampaign(campaignId: string) {
  const { data: campaign, isLoading: retrievingCampaign } = useQuery({
    queryKey: ["campaign", campaignId],
    queryFn: async () => getCampaign(campaignId),
  });
  return { campaign, retrievingCampaign };
}
