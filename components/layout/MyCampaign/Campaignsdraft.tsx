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
import { Status } from "@/types/campaign";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Campaignsdraft() {
  const campaignTabs = [
    { name: "Drafts", value: "draft" },
    { name: "Pending ", value: "pending" },
    { name: "Active ", value: "active" },
    { name: "Ended ", value: "completed" },
  ];

  const [pages, setPages] = useState({
    draft: 1,
    active: 1,
    completed: 1,
    pending: 1,
  });

  const { userProfile, fetchingProfile } = useUserProfile();

  if (fetchingProfile) return <Loader />;

  const userCampaigns = userProfile?.createdCampaigns;

  const unpublishedCampaigns = userCampaigns?.filter(
    (campaign) => !campaign.published
  );

  const activeCampaign = userCampaigns?.filter(
    (campaign) =>
      isPast(new Date(campaign.startDate)) &&
      campaign.published &&
      isFuture(new Date(campaign.endDate))
  );

  const pendingCampaigns = userCampaigns?.filter(
    (campaign) => isFuture(new Date(campaign.startDate)) && campaign.published
  );

  const completed = userCampaigns?.filter(
    (campaign) => isPast(new Date(campaign.endDate)) && campaign.published
  );

  const itemsPerPage = 10;

  const handlePageChange = (tab: string, newPage: number) => {
    setPages((prev) => ({ ...prev, [tab]: newPage }));
  };

  const renderCampaigns = (
    status: Status,
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
              ? "You don't have any active campaign"
              : status == "pending"
              ? "No pending campaigns"
              : "No Completed Campaigns"
          }
          text1={
            status === "draft"
              ? "Work on a campaign privately and publish it when you’re ready."
              : status === "active"
              ? "Create a campaign to start raising funds for the causes you care about."
              : status === "pending"
              ? "Campaigns yet to start will appear here."
              : "Once a campaign reaches its goal or end date, it will appear here."
          }
          btnLink="/create"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-20">
          {campaignsToShow.map((campaign) => (
            <Draftcard
              key={campaign.cmid}
              campaignData={{ campaign }}
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
                        ? "bg-primary text-white"
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
    <div className="mt-12">
      <Tabs defaultValue="draft" className="w-full">
        <TabsList className="hidden sm:flex sm:flex-nowrap gap-2">
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
                <span>{tab.name}</span>
              </TabsTrigger>
            </React.Fragment>
          ))}
        </TabsList>

        <TabsList className="flex-nowrap sm:hidden items-center gap-2 mt-8">
          {campaignTabs.slice(0, 2).map((tab) => (
            <React.Fragment key={tab.value}>
              <TabsTrigger
                value={tab.value}
                className="bg-transparent border-none shadow-none 
                     data-[state=active]:text-primary-accent
                     data-[state=active]:bg-transparent 
                     focus-visible:ring-0 cursor-pointer 
                     px-4 text-sm font-bold md:text-[16px]
                     text-[#6B6B65]/50 whitespace-nowrap"
              >
                <span>{tab.name}</span>
              </TabsTrigger>
            </React.Fragment>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="shadow-xl border-none">
              {campaignTabs.slice(2).map((tab) => (
                <DropdownMenuItem key={tab.value}>
                  <TabsTrigger
                    value={tab.value}
                    className="bg-transparent border-none shadow-none 
                     data-[state=active]:text-primary-accent
                     data-[state=active]:bg-transparent 
                     focus-visible:ring-0 cursor-pointer 
                     w-full text-sm font-bold md:text-[16px]
                     text-[#6B6B65]/50 whitespace-nowrap"
                  >
                    <span>{tab.name}</span>
                  </TabsTrigger>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="draft" className="w-full">
            {renderCampaigns("draft", unpublishedCampaigns)}
          </TabsContent>
          <TabsContent value="pending" className="w-full">
            {renderCampaigns("pending", pendingCampaigns)}
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
