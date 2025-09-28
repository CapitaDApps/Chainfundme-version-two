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
import CampaignCard from "@/components/layout/Explore/CampaignCard";
import { CategorisItem } from "@/lib/CategoriesContent";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  initialCategory: string;
}

function CategoriesTab({ initialCategory }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const filteredCampaigns =
    activeTab === "for you"
      ? CategorisItem
      : CategorisItem.filter(
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
                {currentCampaigns.length > 0 ? (
                  currentCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))
                ) : (
                  <p>No campaigns found in this category.</p>
                )}
              </div>

              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === i + 1}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(i + 1);
                          }}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            setCurrentPage(currentPage + 1);
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default CategoriesTab;
