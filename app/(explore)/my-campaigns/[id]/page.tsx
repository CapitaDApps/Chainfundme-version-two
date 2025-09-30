import Campaigndetails from "@/components/layout/CDdetails/Campaigndetails";

interface CampaignPageProps {
  params: Promise<{ id: string }>;
}

async function CampaignPage({ params }: CampaignPageProps) {
  const id = (await params).id;

  return <Campaigndetails campaignId={id} />;
}
export default CampaignPage;
