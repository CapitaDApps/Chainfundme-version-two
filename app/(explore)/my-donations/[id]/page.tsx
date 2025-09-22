import { List } from "@/lib/DonationContent";

import Leftpart from "@/components/layout/CDdetails/Leftpart";
import Rightpart from "@/components/layout/CDdetails/Rightpart";

interface CampaignPageProps {
  params: { id: string };
}

function CampaignPage({ params }: CampaignPageProps) {
  const campaign = List.find((c) => Number(c.id) === Number(params.id));

  if (!campaign) {
    return <p>Campaign not found</p>;
  }

  return (
    <div className="px-6 ">
      <h1 className="text-[#2C2C2C] font-bold text-4xl">
        Help Bob Nagamallaiah’s Family Rebuild and Find Strength
      </h1>
      <div className="pt-8">
        <div className="flex flex-row justify-between">
          <Leftpart />
          <Rightpart />
        </div>
      </div>
    </div>
  );
}
export default CampaignPage;
