import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

function Campaigns() {
  const campaignlist = [
    { name: "Default Campaign", value: "default" },
    { name: "Active Campaign", value: "active" },
    { name: "Completed Campaign", value: "completed" },
  ];

  return (
    <div className="pt-6">
      <div className="flex flex-row items-center justify-center gap-x-12">
        <Tabs defaultValue="default" className="w-[400px]">
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
          <TabsContent value="default">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="active">
            View your active campaigns here.
          </TabsContent>
          <TabsContent value="completed">
            View your completed campaigns here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
export default Campaigns;
