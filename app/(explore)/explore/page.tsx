import { Suspense } from "react";
import ExplorePageClient from "@/components/layout/Explore/ExplorePageClient";
import Loader from "@/components/layout/Loader";

export default function ExploreCampaignPage() {
  return (
    <Suspense fallback={<Loader />}>
      <ExplorePageClient />
    </Suspense>
  );
}
