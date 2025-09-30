import { Suspense } from "react";
import Campaigndetails from "@/components/layout/CDdetails/Campaigndetails";

interface CampaignPageProps {
  params: Promise<{ id: string }>;
}

async function CampaignPage({ params }: CampaignPageProps) {
  const id = (await params).id;
  return (
    <Suspense fallback={<div>Loading campaign details...</div>}>
      <Campaigndetails campaignId={id} />
    </Suspense>
  );
}

export default CampaignPage;
