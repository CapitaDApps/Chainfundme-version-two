import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Draftcard from "./Draftcard";
import { CategorisItem } from "@/lib/CategoriesContent";
import EmptyModel from "./EmptyModel";

function Campaignsdraft() {
  const campaignlist = [
    { name: "Campaign(drafts)", value: "default" },
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
            <div className="flex justify-center">
              {CategorisItem.length === 0 ? (
                <EmptyModel
                  src="/layout/bo.png"
                  alt="campaign"
                  text2="No Drafts Yet"
                  text1="Work on a campaign privately and publish it when you’re ready."
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(330px,1fr))] gap-10 justify-items-center">
                  {CategorisItem.map((campaign) => (
                    <Draftcard
                      key={campaign.id}
                      campaign={campaign}
                      status="draft"
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="active" className="w-full pt-6">
            <div className="flex justify-center">
              {CategorisItem.length === 0 ? (
                <EmptyModel
                  src="/layout/can.png"
                  alt="campaign"
                  text2="You don't have an active campaign"
                  text1="Create a campaign to start raising funds for the causes you care about."
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(330px,1fr))] gap-10 justify-items-center">
                  {CategorisItem.map((campaign) => (
                    <Draftcard
                      key={campaign.id}
                      campaign={campaign}
                      status="active"
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="w-full pt-6">
            <div className="flex justify-center">
              {CategorisItem.length === 0 ? (
                <EmptyModel
                  src="/layout/can.png"
                  alt="campaign"
                  text2="No Completed Campaigns"
                  text1="Once a campaign reaches its goal or end date, it will appear here."
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(330px,1fr))] gap-10 justify-items-center">
                  {CategorisItem.map((campaign) => (
                    <Draftcard
                      key={campaign.id}
                      campaign={campaign}
                      status="completed"
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
export default Campaignsdraft;
