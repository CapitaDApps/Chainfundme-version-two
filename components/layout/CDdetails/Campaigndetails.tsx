"use client";

import { Button } from "@/components/ui/button";
import { useCampaign } from "@/services/api/hooks/campaign/useCampaign";
import { useRouter } from "next/navigation";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Loader from "../Loader";
import Comments from "./Comment";
import Leftpart from "./Leftpart";
import Rightpart from "./Rightpart";

function Campaigndetails({ campaignId }: { campaignId: string }) {
  const router = useRouter();
  const { campaign, retrievingCampaign, error } = useCampaign(campaignId);

  if (retrievingCampaign) {
    return <Loader />;
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

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-20 mt-20 md:mt-0">
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
        <div className="flex flex-col lg:flex-row justify-between gap-6 ">
          <div className="flex-1 w-full max-w-4xl">
            <Leftpart campaign={campaign} />
          </div>
          <div className="h-fit min-w-[300px] w-full max-w-[600px] lg:max-w-[400px] lg:mt-0">
            <Rightpart campaign={campaign} />
          </div>
        </div>
        <div className="max-w-3xl mt-20 lg:mt-8">
          <Comments />
        </div>
      </div>
    </div>
  );
}
export default Campaigndetails;
