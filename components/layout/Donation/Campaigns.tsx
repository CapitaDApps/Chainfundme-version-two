import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import CampaignList from "./CampaignList";
import { useUserProfile } from "@/services/api/hooks/user/useUserProfile";
import Loader from "../Loader";
import EmptyModel from "../MyCampaign/EmptyModel";
import { ReturnCampaignDocument } from "@/types/api";
import Draftcard from "../Card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { isFuture, isPast } from "date-fns";

function Campaigns() {
  const campaignTabs = [
    { name: "Active", value: "active" },
    { name: "Ended", value: "completed" },
  ];

  const [pages, setPages] = useState({
    draft: 1,
    active: 1,
    completed: 1,
  });

  const { userProfile, fetchingProfile } = useUserProfile();

  if (fetchingProfile) return <Loader />;

  const userSupportedCampaigns = userProfile?.supportedCampaigns;

  console.log({ userSupportedCampaigns });

  const supportedCampaigns = userSupportedCampaigns?.map(
    (campaign) => campaign.campaign
  );

  const activeCampaigns = supportedCampaigns?.filter((campaign) =>
    isFuture(new Date(campaign.endDate))
  );

  const endedCampaigns = supportedCampaigns?.filter((campaign) =>
    isPast(new Date(campaign.endDate))
  );

  const itemsPerPage = 10;

  const handlePageChange = (tab: string, newPage: number) => {
    setPages((prev) => ({ ...prev, [tab]: newPage }));
  };

  const renderCampaigns = (
    status: "active" | "completed",
    campaigns: ReturnCampaignDocument[] | undefined
  ) => {
    if (!campaigns || campaigns?.length === 0) {
      return (
        <EmptyModel
          src="/layout/can.png"
          alt="campaign"
          text2={
            status === "active"
              ? "No supported campaigns"
              : "No supported campaigns completed"
          }
          text1={
            status === "active"
              ? "Support a campaign, and you'll see it here."
              : "Once a campaign you support reaches its goal or end date, it will appear here."
          }
          btnText="Fund a story"
          btnLink="/explore"
        />
      );
    }

    const currentPage = pages[status];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const campaignsToShow = campaigns.slice(startIndex, endIndex);

    const totalPages = Math.ceil(campaigns.length / itemsPerPage);

    return (
      <div className="flex justify-center flex-col items-center gap-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {campaignsToShow.map((campaign) => (
            <Draftcard
              key={campaign.cmid}
              campaign={campaign}
              status={status}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination className="mb-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() =>
                    handlePageChange(status, Math.max(1, currentPage - 1))
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <button
                    onClick={() => handlePageChange(status, i + 1)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      currentPage === i + 1
                        ? "bg-[#2379BC] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() =>
                    handlePageChange(
                      status,
                      Math.min(totalPages, currentPage + 1)
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    );
  };

  return (
    <div className="mt-12 mb-20">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="flex-nowrap gap-2">
          {campaignTabs.map((tab) => (
            <React.Fragment key={tab.value}>
              <TabsTrigger
                value={tab.value}
                className="bg-transparent border-none shadow-none 
                     data-[state=active]:text-primary-accent 
                     data-[state=active]:bg-transparent 
                     focus-visible:ring-0 cursor-pointer 
                      px-4 text-sm font-bold md:text-[16px]
                     text-[#6B6B65]/50 whitespace-nowrap mt-8"
              >
                {tab.name}
              </TabsTrigger>
            </React.Fragment>
          ))}
        </TabsList>

        <div className="mt-8">
          <TabsContent value="active" className="w-full">
            <div className="w-full">
              {renderCampaigns("active", activeCampaigns)}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="w-full">
            <div className="w-full">
              {renderCampaigns("completed", endedCampaigns)}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default Campaigns;
