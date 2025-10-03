import Loader from "@/components/layout/Loader";
import MyCampaignsPage from "@/components/layout/MyCampaign/MyCampaignPage";
import { Suspense } from "react";

export default function ExploreCampaignPage() {
  return (
    <Suspense fallback={<Loader />}>
      <MyCampaignsPage />
    </Suspense>
  );
}
