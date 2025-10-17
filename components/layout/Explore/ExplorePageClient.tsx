"use client";

import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber, formatTimeLeft } from "@/lib/utils";
import { useCampaigns } from "@/services/api/hooks/campaign/useCampaigns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CreateCamBtn from "../CreateCamBtn";
import SearchBar from "../SearchBar";
import ExploreBackground from "./ExploreBackground";
import UseCases from "./UseCases";
import WhyChooseUse from "./WhyChooseUs";

function ExplorePageClient() {
  const { campaigns, retrievingCampaigns } = useCampaigns();
  const router = useRouter();

  const firstCampaign = campaigns?.[0];

  const handleNav = (campaignId: string) => {
    router.push(`/campaign/${campaignId}`);
  };
  return (
    <div className="relative">
      <ExploreBackground />
      <div className="flex flex-col items-center justify-center mt-14 md:mt-10 lg:mt-12 py-6">
        <div className="border border-none bg-[#F5F7FA]  rounded-4xl mt-3 md:mt-0 px-4 py-2 md:mb-2 lg:mb-4">
          <h1 className="text-xs md:text-lg lg:text-[24px] font-semibold text-[#292933] px-2">
            #No 1 Decentralized Crowdfunding platform
          </h1>
        </div>
        <div className="flex flex-col items-start justify-start pt-2 py-6 px-4 relative">
          <Image
            src="/layout/h-line.png"
            alt="line"
            width={3}
            height={2}
            className="absolute -left-130  top-[50px]"
          />
        </div>

        <div className=" max-w-3xl lg:max-w-4xl px-4 md:px-14 lg:px-0">
          <h1 className="text-[#292933] text-center  md:leading-16 lg:leading-20 font-semibold  text-3xl md:text-5xl lg:text-[75px]">
            <span>Find </span>
            <span className="text-[#003DEF]">campaigns,</span>
            <span className="block md:inline">
              <span> Fund </span>
              what you care about.
            </span>
          </h1>
        </div>
        <div className="w-full max-w-3xl mt-3 md:mt-6 px-4 sm:px-10 md:px-14 lg:px-0">
          <SearchBar />
        </div>
        <div className="mt-8 md:mt-12 w-fit shadow-xl shadow-[#003DEF40]">
          <CreateCamBtn />
        </div>
      </div>

      {/* Campaigns */}
      {retrievingCampaigns ? (
        <PrioritySkeleton />
      ) : !firstCampaign ? null : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-12 md:gap-6 lg:gap-10 px-4 sm:px-10 lg:px-14 xl:px-20 mt-24 mb-20">
          {/* First */}
          <div className="lg:col-span-2">
            <div
              className="hover:bg-primary/5 p-3 xl:p-5 rounded-2xl transition-all duration-300 cursor-pointer"
              onClick={() => handleNav(firstCampaign.cmid)}
            >
              <div className="relative h-[300px] w-full xl:h-[500px]">
                <Image
                  src={firstCampaign.coverImage || ""}
                  alt=""
                  fill
                  className="rounded-[30px]"
                />
              </div>
              <div className="mt-5">
                <h3 className="text-base md:text-lg lg:text-2xl lg:text-[40px] font-bold text-secondary-text">
                  {firstCampaign.title}
                </h3>
                <p className="text-sm md:text-base lg:text-2xl text-secondary-text-muted font-medium">
                  {formatTimeLeft(
                    firstCampaign.startDate,
                    firstCampaign.endDate
                  )}
                </p>
                <div className="flex flex-wrap mt-4">
                  {firstCampaign.chains.map((chain) => (
                    <div
                      className="flex items-center gap-2 bg-primary/20 rounded-full py-1 px-3"
                      key={chain.networkId}
                    >
                      <Image
                        src={chain.imagePath}
                        width={50}
                        height={50}
                        alt=""
                        className="w-5 h-5 lg:w-7 lg:h-7 rounded-full"
                      />
                      <p className="text-xs mt-[2px] sm:mt-0 sm:text-sm">
                        {chain.symbol}
                      </p>
                    </div>
                  ))}
                </div>
                <Progress
                  value={
                    (firstCampaign.currentAmount / firstCampaign.targetAmount) *
                    100
                  }
                  className="mt-4 lg:h-4"
                />
                <div className="flex justify-between mt-1 text-xs sm:text-sm lg:text-xl">
                  <p className="text-[#292933]">
                    {formatNumber(
                      (firstCampaign.currentAmount /
                        firstCampaign.targetAmount) *
                        100
                    )}
                    % completed
                  </p>
                  <p className="text-[#292933]">
                    ${formatNumber(firstCampaign.currentAmount)} raised of $
                    {formatNumber(firstCampaign.targetAmount)}
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:block text-xl sm:text-2xl lg:text-[40px] mt-12 md:mt-16 text-[#292933] italic">
              <p>
                &quot; The Future of crowdfunding is Borderless and Frictionless
                &quot;
              </p>
              <p className="mt-4 md:mt-9">- Brainmaniac</p>
            </div>
          </div>

          {/* Second */}
          <div className="lg:col-span-1 space-y-12 md:space-y-8">
            {campaigns?.slice(1, 3).map((campaign) => (
              <div
                key={campaign.cmid}
                className="hover:bg-primary/5 p-3 rounded-2xl transition-all duration-300 cursor-pointer"
                onClick={() => handleNav(campaign.cmid)}
              >
                <div className="relative h-[300px] cursor-pointer">
                  <Image
                    src={campaign.coverImage}
                    alt=""
                    fill
                    className="rounded-[30px] w-full"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="text-secondary-text text-base md:text-lg lg:text-2xl font-bold">
                    {campaign.title}
                  </h3>
                  <p className="text-secondary-text-muted text-sm md:text-base lg:text-lg font-medium">
                    {formatTimeLeft(campaign.startDate, campaign.endDate)}
                  </p>

                  <div className="flex flex-wrap mt-4">
                    {campaign.chains.map((chain) => (
                      <div
                        className="flex items-center gap-2 bg-primary/20 rounded-full py-1 px-3"
                        key={chain.networkId}
                      >
                        <Image
                          src={chain.imagePath}
                          width={50}
                          height={50}
                          alt=""
                          className="w-5 h-5 lg:w-6 lg:h-6 rounded-full"
                        />
                        <p className="text-xs mt-[2px] sm:mt-0 sm:text-sm">
                          {chain.symbol}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Progress
                    value={
                      (campaign.currentAmount / campaign.targetAmount) * 100
                    }
                    className="mt-4"
                  />
                  <div className="text-secondary-text flex justify-between mt-1 text-sm">
                    <p>
                      {Math.floor(
                        (campaign.currentAmount / campaign.targetAmount) * 100
                      )}
                      % completed
                    </p>
                    <p>${formatNumber(campaign.targetAmount)}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="block md:hidden text-xl sm:text-2xl lg:text-[40px] mt-12 md:mt-16 text-[#292933] italic">
              <p>
                &quot; The Future of crowdfunding is Borderless and Frictionless
                &quot;
              </p>
              <p className="mt-4 md:mt-9">- Brainmaniac</p>
            </div>
          </div>
        </div>
      )}

      <section className="mt-14 mb-20">
        <WhyChooseUse />

        <UseCases />
      </section>
    </div>
  );
}

export default ExplorePageClient;

function PrioritySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-12 md:gap-8 lg:gap-12 px-4 sm:px-10 lg:px-14 xl:px-20 mt-24 mb-20 w-full">
      <div className="lg:col-span-2 ">
        <Skeleton className="rounded-[30px] h-[250px] xl:h-[500px]" />
        <div className="mt-3">
          <Skeleton className="h-6 max-w-[80%] rounded-full" />
          <Skeleton className="h-4 max-w-[50%] mt-3 rounded-full" />
        </div>
      </div>

      <div className="lg:col-span-1 space-y-12 md:space-y-8">
        <CampaignSkeleton />
        <CampaignSkeleton />
      </div>
    </div>
  );
}

function CampaignSkeleton() {
  return (
    <div>
      <Skeleton className="h-[250px] xl:h-[300px] rounded-[30px] w-full" />
      <div className="mt-3">
        <Skeleton className="h-6 max-w-[80%] rounded-full" />
        <Skeleton className="h-4 max-w-[50%] mt-3 rounded-full" />
      </div>
    </div>
  );
}
