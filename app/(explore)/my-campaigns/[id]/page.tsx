import { CategorisItem } from "@/lib/CategoriesContent";
import Campaigndetails from "@/components/layout/CDdetails/Campaigndetails";

interface CampaignPageProps {
  params: { id: string };
}

function CampaignPage({ params }: CampaignPageProps) {
  const campaign = CategorisItem.find(
    (c) => Number(c.id) === Number(params.id)
  );

  if (!campaign) {
    return <p>Campaign not found</p>;
  }

  return <Campaigndetails />;
}
export default CampaignPage;
