import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "../../campaign";

export function useCampaigns() {
  const {
    data: campaigns,
    isLoading: retrievingCampaigns,
    error,
  } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => await getCampaigns(),
  });

  return { campaigns, retrievingCampaigns, error };
}
