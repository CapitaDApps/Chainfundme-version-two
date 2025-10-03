"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserProfile } from "@/services/api/hooks/user/useUserProfile";
import { ReturnCampaignDocument } from "@/types/api";
import { isFuture, isPast } from "date-fns";
import React, { useState } from "react";
import Draftcard from "../Card";
import Loader from "../Loader";
import EmptyModel from "./EmptyModel";

function Campaignsdraft() {
  const campaignTabs = [
    { name: "Drafts", value: "draft" },
    { name: "Active ", value: "active" },
    { name: "Ended ", value: "completed" },
  ];

  const [pages, setPages] = useState({
    draft: 1,
    active: 1,
    completed: 1,
  });

  const { userProfile, fetchingProfile } = useUserProfile();

  if (fetchingProfile) return <Loader />;

  const userCampaigns = userProfile?.createdCampaigns;

  const unpublishedCampaigns = userCampaigns?.filter(
    (campaign) => !campaign.published
  );

  const activeCampaign = userCampaigns?.filter(
    (campaign) => isFuture(new Date(campaign.endDate)) && campaign.published
  );
  const completed = userCampaigns?.filter(
    (campaign) => isPast(new Date(campaign.endDate)) && campaign.published
  );

  const itemsPerPage = 10;

  const handlePageChange = (tab: string, newPage: number) => {
    setPages((prev) => ({ ...prev, [tab]: newPage }));
  };

  const renderCampaigns = (
    status: "draft" | "active" | "completed",
    campaigns: ReturnCampaignDocument[] | undefined
  ) => {
    if (!campaigns || campaigns?.length === 0) {
      return (
        <EmptyModel
          src="/layout/can.png"
          alt="campaign"
          text2={
            status === "draft"
              ? "No Drafts Yet"
              : status === "active"
              ? "You don't have an active campaign"
              : "No Completed Campaigns"
          }
          text1={
            status === "draft"
              ? "Work on a campaign privately and publish it when you’re ready."
              : status === "active"
              ? "Create a campaign to start raising funds for the causes you care about."
              : "Once a campaign reaches its goal or end date, it will appear here."
          }
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
      <Tabs defaultValue="draft" className="w-full">
        <TabsList className="flex-nowrap">
          {campaignTabs.map((tab) => (
            <React.Fragment key={tab.value}>
              <TabsTrigger
                value={tab.value}
                className="bg-transparent border-none shadow-none 
                     data-[state=active]:text-[#2379BC] 
                     data-[state=active]:bg-transparent 
                     focus-visible:ring-0 cursor-pointer 
                     md:px-4 px-2 text-sm font-bold md:text-[16px]
                     text-[#6B6B65]/50 whitespace-nowrap mt-8"
              >
                <span>{tab.name}</span>
              </TabsTrigger>
            </React.Fragment>
          ))}
        </TabsList>

        <div className="mt-8">
          <TabsContent value="draft" className="w-full">
            {renderCampaigns("draft", unpublishedCampaigns)}
          </TabsContent>
          <TabsContent value="active" className="w-full ">
            {renderCampaigns("active", activeCampaign)}
          </TabsContent>
          <TabsContent value="completed" className="w-full">
            {renderCampaigns("completed", completed)}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default Campaignsdraft;
