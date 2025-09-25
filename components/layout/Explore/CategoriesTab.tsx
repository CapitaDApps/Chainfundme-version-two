"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  useEffect(() => {
    const category = searchParams.get("category");
    if (category && category !== activeTab) {
      setActiveTab(category);
    }
  }, [searchParams, activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
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

  return (
    <div className="w-full">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex flex-row justify-center items-center gap-4 overflow-x-auto pb-2  pt-10 md:pt-15 scrollbar-hide snap-x snap-mandatory">
          <TabsList className="flex flex-row gap-4 mb-8">
            <span className="block md:hidden">
              <OtherCampaign />
            </span>
            {List.map((list) => (
              <TabsTrigger
                key={list.value}
                value={list.value}
                className="data-[state=active]:text-white data-[state=active]:bg-[#2379BC] px-3 py-4 md:px-4 md:py-3 rounded-xl items-center cursor-pointer border border-[#666666]/50 flex flex-row gap-2 snap-start"
              >
                <span className="text-lg">{<list.icon />}</span>
                <span className="truncate">{list.title}</span>
              </TabsTrigger>
            ))}
            <span className="hidden md:block">
              <OtherCampaign />
            </span>
          </TabsList>
        </div>

        {List.map((list) => (
          <TabsContent key={list.value} value={list.value}>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(330px,1fr))] gap-10 md:gap-20 justify-items-center">
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))
                ) : (
                  <p>No campaigns found in this category.</p>
                )}
              </div>
            </div>
          </TabsContent>
        ))}

        {["community rescue", "crisis relief", "travel"].map((category) => (
          <TabsContent key={category} value={category}>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(330px,1fr))] gap-10 justify-items-center">
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))
                ) : (
                  <p>No campaigns found in this category.</p>
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
