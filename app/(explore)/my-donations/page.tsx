import DonationPageClient from "@/components/layout/Donation/DonationPageClient";
import Loader from "@/components/layout/Loader";
import { Suspense } from "react";

export default function ExploreCampaignPage() {
  return (
    <Suspense fallback={<Loader />}>
      <DonationPageClient />
    </Suspense>
  );
}
