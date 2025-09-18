import { Suspense } from "react";
import ExploreCampaignPageClient from "./ExplorePageClient";

export default function ExploreCampaignPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExploreCampaignPageClient />
    </Suspense>
  );
}
