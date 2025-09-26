"use client";

import Campaigns from "@/components/layout/Donation/Campaigns";
import SearchBar from "@/components/layout/SearchBar";
import DonationModel from "./DonationModel";
import { useState } from "react";
import Filter from "../Explore/Filter";
function DonationPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div className="p-6">
      {isModalOpen && (
        <DonationModel
          text="Join or Sign In to Access Your Donations"
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-sidebar-content text-center leading-tight mb-3 font-semibold text-[22px] md:text-[32px] text-[#101828]">
          Track Your&nbsp;{" "}
          <span className="block md:inline">
            <span className="text-[#2379bc] font-semibold">
              Contributions&nbsp;
            </span>{" "}
            & Impact
          </span>
        </h1>
        <div className="hidden md:block w-full mb-3 max-w-3xl">
          <SearchBar />
        </div>
        <div className="flex flex-row items-center justify-center w-full space-x-4 pt-6 md:hidden">
          <div>
            <Filter />
          </div>
          <div className="flex-1">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="">
        <Campaigns />
      </div>
    </div>
  );
}

export default DonationPageClient;
