"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { List } from "@/lib/Categories";
import OtherCampaign from "./OtherCampaigns";
import { CategorisItem } from "@/lib/CategoriesContent";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ReturnCampaignDocument } from "@/types/api/campaign.types";
import { CampaignItem } from "@/types/campaign";

interface Props {
  initialCategory: string;
  campaigns: ReturnCampaignDocument[];
  isLoading: boolean;
  error?: Error | null;
}

function CategoriesTab({
  initialCategory,
  campaigns,
  isLoading,
  error,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(initialCategory);

  // Function to map API campaign data to the expected format
  const mapCampaignData = (
    apiCampaign: ReturnCampaignDocument,
    index: number
  ): CampaignItem => {
    const endDate = new Date(apiCampaign.endDate);
    const now = new Date();
    const timeLeft =
      endDate > now
        ? Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    return {
      id: apiCampaign.cmid || `fallback-${index}`, // Use the actual cmid from API
      image: apiCampaign.image || apiCampaign.coverImage || "/layout/Frame.png",
      timeleft: timeLeft > 0 ? `${timeLeft} days left` : "Expired",
      title: apiCampaign.title,
      creatorimage: apiCampaign.owner?.profilePicture || "/layout/Ellipse.png",
      creatorname: apiCampaign.owner?.name || "Anonymous",
      story: apiCampaign.description,
      fundrasied: `$${apiCampaign.currentAmount.toLocaleString()}`,
      fundtarget: `$${apiCampaign.targetAmount.toLocaleString()}`,
      category: apiCampaign.category.toLowerCase(),
    };
  };

  useEffect(() => {
    const category = searchParams.get("category");
    if (category && category !== activeTab) {
      setActiveTab(category);
      setCurrentPage(1);
    }
  }, [searchParams, activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Use real campaign data if available, otherwise fallback to static data
  const campaignData =
    campaigns && campaigns.length > 0
      ? campaigns.map((campaign, index) => mapCampaignData(campaign, index))
      : CategorisItem.map((item) => ({ ...item, id: item.id.toString() }));

  const filteredCampaigns =
    activeTab === "for you"
      ? campaignData
      : campaignData.filter(
          (campaign) =>
            campaign.category.toLowerCase() === activeTab.toLowerCase()
        );

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCampaigns = filteredCampaigns.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex flex-row justify-center items-center gap-4 pb-2 pt-10 md:pt-15">
          <TabsList
            className="
             flex flex-row gap-4 mb-8
             overflow-x-auto md:overflow-visible
            scrollbar-hide scroll-smooth
            w-full md:w-auto
            snap-x snap-mandatory
    "
          >
            <span className="block md:hidden flex-shrink-0">
              <OtherCampaign />
            </span>

            {List.map((list) => (
              <TabsTrigger
                key={list.value}
                value={list.value}
                className="
                 data-[state=active]:text-white 
                 data-[state=active]:bg-[#2379BC] 
                  px-3 py-4 md:px-4 md:py-3 
                  rounded-xl items-center cursor-pointer 
                  border border-[#666666]/50 
                  flex flex-row gap-2 flex-shrink-0 
                  snap-start
               "
              >
                <span className="text-lg">{<list.icon />}</span>
                <span className="truncate">{list.title}</span>
              </TabsTrigger>
            ))}

            <span className="hidden md:block flex-shrink-0">
              <OtherCampaign />
            </span>
          </TabsList>
        </div>

        {List.map((list) => (
          <TabsContent key={list.value} value={list.value}>
            <div className="flex flex-col items-center space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(330px,1fr))] gap-10 md:gap-20 justify-items-center">
                {isLoading ? (
                  <div className="col-span-full flex justify-center items-center py-8">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2379BC] mx-auto mb-2"></div>
                      <p className="text-gray-600">Loading campaigns...</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="col-span-full flex justify-center items-center py-8">
                    <div className="text-center">
                      <p className="text-red-600 mb-2">
                        Failed to load campaigns
                      </p>
                      <p className="text-gray-600 text-sm">{error.message}</p>
                    </div>
                  </div>
                ) : filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-600 py-8">
                    No campaigns found in this category.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        ))}

        {["community rescue", "crisis relief", "travel"].map((category) => (
          <TabsContent key={category} value={category}>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(330px,1fr))] gap-10 justify-items-center">
                {isLoading ? (
                  <div className="col-span-full flex justify-center items-center py-8">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2379BC] mx-auto mb-2"></div>
                      <p className="text-gray-600">Loading campaigns...</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="col-span-full flex justify-center items-center py-8">
                    <div className="text-center">
                      <p className="text-red-600 mb-2">
                        Failed to load campaigns
                      </p>
                      <p className="text-gray-600 text-sm">{error.message}</p>
                    </div>
                  </div>
                ) : filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-600 py-8">
                    No campaigns found in this category.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default CategoriesTab;
