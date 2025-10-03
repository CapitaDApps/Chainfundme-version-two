import MyCampaignsPage from "@/components/layout/MyCampaign/MyCampaignPage";
import CustomSpinner from "@/components/ui/customSpinner";
import { Suspense } from "react";

export default function ExploreCampaignPage() {
  return (
    <Suspense fallback={<CustomSpinner />}>
      <MyCampaignsPage />
    </Suspense>
  );
}
