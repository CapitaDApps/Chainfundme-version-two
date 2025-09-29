import { Suspense } from "react";
import CampaignDetailsClient from "@/components/layout/Explore/CampaignDetailsClient";

interface CampaignPageProps {
  params: { id: string };
}

function CampaignPage({ params }: CampaignPageProps) {
  return (
    <Suspense fallback={<div>Loading campaign details...</div>}>
      <CampaignDetailsClient campaignId={params.id} />
    </Suspense>
  );
}

export default CampaignPage;
