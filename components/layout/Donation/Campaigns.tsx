import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import CampaignList from "./CampaignList";

function Campaigns() {
  const campaignlist = [
    { name: "Active", value: "active" },
    { name: "Ended", value: "completed" },
  ];

  return (
    <div className="pt-6">
      <div className="flex flex-col items-center">
        <Tabs defaultValue="active" className="w-full">
          <div className="flex justify-center">
            <TabsList className="flex-nowrap">
              {campaignlist.map((list, index) => (
                <React.Fragment key={list.value}>
                  <TabsTrigger
                    value={list.value}
                    className="bg-transparent border-none shadow-none data-[state=active]:text-[#003DEF] data-[state=active]:bg-transparent data-[state=active]:border-none data-[state=active]:shadow-none focus-visible:ring-0 cursor-pointer md:px-4 px-2 text-[15px] font-bold md:text-[17px] text-[#6B6B65] whitespace-nowrap"
                  >
                    {list.name}
                  </TabsTrigger>
                  {index < campaignlist.length - 1 && (
                    <div className="w-px h-10 bg-gray-300 md:block"></div>
                  )}
                </React.Fragment>
              ))}
            </TabsList>
          </div>

          <TabsContent value="active" className="w-full pt-6">
            <div className="w-full overflow-x-auto md:overflow-x-visible scrollbar-hide md:scrollbar-auto">
              <CampaignList status="active" />
            </div>
          </TabsContent>

          <TabsContent value="completed" className="w-full py-6">
            <div className="w-full overflow-x-auto md:overflow-x-visible scrollbar-hide md:scrollbar-auto">
              <CampaignList status="completed" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Campaigns;
