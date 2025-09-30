import { Suspense } from "react";
import CampaignDetailsClient from "@/components/layout/Explore/CampaignDetailsClient";

interface CampaignPageProps {
  params: Promise<{ id: string }>;
}

async function CampaignPage({ params }: CampaignPageProps) {
  const id = (await params).id;
  return (
    <Suspense fallback={<div>Loading campaign details...</div>}>
      <CampaignDetailsClient campaignId={id} />
    </Suspense>
  );
}

export default CampaignPage;
