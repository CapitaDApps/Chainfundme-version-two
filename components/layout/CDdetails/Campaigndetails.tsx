"use client";

import { Button } from "@/components/ui/button";
import CustomSpinner from "@/components/ui/customSpinner";
import { useCampaign } from "@/services/api/hooks/campaign/useCampaign";
import { useRouter } from "next/navigation";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Comments from "./Comment";
import Leftpart from "./Leftpart";
import Rightpart from "./Rightpart";

function Campaigndetails({ campaignId }: { campaignId: string }) {
  const router = useRouter();
  const { campaign, retrievingCampaign, error } = useCampaign(campaignId);

  if (retrievingCampaign) {
    return <CustomSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load campaign details</p>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Campaign not found</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  console.log(campaign);
  // Calculate progress percentage
  // const progressPercentage =
  //   (campaign.currentAmount / campaign.targetAmount) * 100;

  return (
    <div className="px-4 lg:px-12">
      <span
        className="flex md:hidden flex-row gap-x-2 text-[#2C2C2C] font-semibold pt-3 text-sm cursor-pointer items-center "
        onClick={() => router.back()}
      >
        <FaLongArrowAltLeft /> <p>Back</p>
      </span>

      <h1 className="text-[#2C2C2C] font-bold text-2xl md:text-4xl pt-6">
        {campaign.title}
      </h1>

      <div className="pt-8">
        <div className="flex flex-row justify-between gap-6">
          <Leftpart campaign={campaign} />

          <div className="h-fit hidden md:block">
            <Rightpart campaign={campaign} />
          </div>
        </div>
        <div className="max-w-3xl">
          <Comments />
        </div>
      </div>
    </div>
  );
}
export default Campaigndetails;
