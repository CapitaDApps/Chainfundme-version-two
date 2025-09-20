import DonationPageClient from "@/components/layout/Donation/DonationPageClient";
import { Suspense } from "react";

export default function ExploreCampaignPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DonationPageClient />
    </Suspense>
  );
}
