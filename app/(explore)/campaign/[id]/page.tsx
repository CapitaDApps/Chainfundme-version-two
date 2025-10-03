import { Suspense } from "react";
import Campaigndetails from "@/components/layout/CDdetails/Campaigndetails";
import Loader from "@/components/layout/Loader";

interface CampaignPageProps {
  params: Promise<{ id: string }>;
}

async function CampaignPage({ params }: CampaignPageProps) {
  const id = (await params).id;
  return (
    <Suspense fallback={<Loader />}>
      <Campaigndetails campaignId={id} />
    </Suspense>
  );
}

export default CampaignPage;
