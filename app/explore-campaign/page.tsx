// app/explore-campaign/page.tsx
import { Suspense } from "react";
import ExploreCampaignPageClient from "./ExploreCampaignPageClient";

export default function ExploreCampaignPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExploreCampaignPageClient />
    </Suspense>
  );
}
