import MyCampaignsPage from "@/components/layout/MyCampaign/MyCampaignPage";
import { Suspense } from "react";

export default function ExploreCampaignPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyCampaignsPage />
    </Suspense>
  );
}
