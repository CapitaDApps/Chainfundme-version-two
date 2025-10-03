"use client";

import CreateCamBtn from "@/components/layout/CreateCamBtn";
import Filter from "@/components/layout/Explore/Filter";
import Campaignsdraft from "@/components/layout/MyCampaign/Campaignsdraft";
import SearchBar from "@/components/layout/SearchBar";
import DonationModel from "../Donation/DonationModel";
import { useState } from "react";

function MyCampaignsPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div className="pt-16 px-4 md:px-14 lg:px-20">
      {isModalOpen && (
        <DonationModel
          text="Join or Sign In to Access Your Campaigns"
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div className="md:flex flex-row justify-between items-center mt-4 hidden">
        <CreateCamBtn />
        <Filter />
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-sidebar-content text-center leading-tight mb-3 font-semibold text-[24px] md:text-[32px] text-[#101828]">
          Manage&nbsp;{" "}
          <span className="block md:inline">
            Your&nbsp;{" "}
            <span className="text-[#003DEF] font-semibold">
              Campaigns&nbsp;
            </span>{" "}
          </span>
        </h1>
        <div className="hidden md:block w-full max-w-3xl">
          <SearchBar />
        </div>

        <div className="flex flex-row items-center justify-center w-full space-x-4 pt-6 md:hidden">
          <div className="flex items-center justify-center pt-4">
            <Filter />
          </div>
          <div className="flex-1">
            <SearchBar />
          </div>
        </div>
      </div>
      <div>
        <Campaignsdraft />
      </div>
    </div>
  );
}
export default MyCampaignsPage;
