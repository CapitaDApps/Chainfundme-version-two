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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { List } from "@/lib/Categories";
import OtherCampaign from "./OtherCampaigns";
import { CategorisItem } from "@/lib/CategoriesContent";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Draftcard from "../Card";

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
    <div className="">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="flex flex-row items-center pb-2 pt-10">
          <ScrollArea className="w-full">
            <div className="flex justify-center">
              <TabsList className="flex flex-row gap-3 whitespace-nowrap">
                <span className="block md:hidden flex-shrink-0">
                  <OtherCampaign />
                </span>

                {List.map((list) => (
                  <TabsTrigger
                    key={list.value}
                    value={list.value}
                    className="
              data-[state=active]:text-white 
              data-[state=active]:bg-[#003DEF]
              px-3 py-4 md:px-4 md:py-3 
              rounded-xl items-center cursor-pointer 
              border border-[#666666]/50 
              flex flex-row gap-2 flex-shrink-0
            "
                  >
                    <span className="text-sm md:text-lg">{<list.icon />}</span>
                    <span className="truncate text-xs md:text-sm">
                      {list.title}
                    </span>
                  </TabsTrigger>
                ))}
                <span className="hidden md:block flex-shrink-0">
                  <OtherCampaign />
                </span>
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {List.map((list) => (
          <TabsContent key={list.value} value={list.value}>
            <div className="w-full">
              {currentCampaigns.length > 0 ? (
                <div className="flex justify-center px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {currentCampaigns.map((campaign) => (
                      <Draftcard
                        key={campaign.id}
                        campaign={campaign}
                        status="explore"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center">
                  No campaigns found in this category.
                </p>
              )}

              {totalPages > 1 && (
                <div className="mt-10 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1)
                              setCurrentPage(currentPage - 1);
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
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default CategoriesTab;
