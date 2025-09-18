"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List } from "@/lib/Categories";
import OtherCampaign from "./OtherCampaigns";
import CampaignCard from "@/components/layout/ExploreCampaign/CampaignCard";
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
        <div className="flex items-center justify-center">
          <TabsList className="flex flex-row flex-wrap gap-4 mb-8">
            {List.map((list) => (
              <TabsTrigger
                key={list.value}
                value={list.value}
                className="data-[state=active]:text-white data-[state=active]:bg-[#2379BC] px-4 py-3 rounded-xl items-center cursor-pointer border border-[#666666]/50 flex flex-row gap-2"
              >
                <span className="text-lg">{<list.icon />}</span>
                <span className="truncate">{list.title}</span>
              </TabsTrigger>
            ))}
            <OtherCampaign />
          </TabsList>
        </div>

        {List.map((list) => (
          <TabsContent key={list.value} value={list.value}>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))
              ) : (
                <p>No campaigns found in this category.</p>
              )}
            </div>
          </TabsContent>
        ))}

        {["community rescue", "crisis relief", "travel"].map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))
              ) : (
                <p>No campaigns found in this category.</p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default CategoriesTab;
