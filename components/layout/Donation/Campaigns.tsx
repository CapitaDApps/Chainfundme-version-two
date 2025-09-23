import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import CampaignList from "./CampaignList";

function Campaigns() {
  const campaignlist = [
    { name: "Default Campaign", value: "default" },
    { name: "Active Campaign", value: "active" },
    { name: "Completed Campaign", value: "completed" },
  ];

  return (
    <div className="pt-6">
      <div className="flex flex-row items-center justify-center gap-x-12">
        <Tabs defaultValue="default" className="w-full">
          <div className="flex justify-center">
            <TabsList>
              {campaignlist.map((list, index) => (
                <React.Fragment key={list.value}>
                  <TabsTrigger
                    value={list.value}
                    className="bg-transparent border-none shadow-none data-[state=active]:text-[#2379BC] data-[state=active]:bg-transparent data-[state=active]:border-none data-[state=active]:shadow-none focus-visible:ring-0 cursor-pointer px-4 text-[#6B6B65]"
                  >
                    {list.name}
                  </TabsTrigger>
                  {index < campaignlist.length - 1 && (
                    <div className="w-px h-10 bg-gray-300"></div>
                  )}
                </React.Fragment>
              ))}
            </TabsList>
          </div>

          <TabsContent value="default" className="w-full pt-6">
            <div className="w-full">
              <CampaignList />
            </div>
          </TabsContent>

          <TabsContent value="active" className="w-full pt-6">
            <div className="w-full">
              {" "}
              <CampaignList />
            </div>
          </TabsContent>


          <TabsContent value="completed" className="w-full pt-6">
            <div className="w-full">
              {" "}
              <CampaignList />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
export default Campaigns;
