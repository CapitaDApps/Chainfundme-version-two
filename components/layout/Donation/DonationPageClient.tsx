"use client";

import Campaigns from "@/components/layout/Donation/Campaigns";
import SearchBar from "@/components/layout/SearchBar";
import DonationModel from "./DonationModel";
import { useState } from "react";
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
        <h1 className="text-sidebar-content flex flex-row font-semibold text-[32px] text-[#101828]">
          Track Your&nbsp;{" "}
          <span className="text-[#2379bc] font-semibold">
            Contributions&nbsp;
          </span>{" "}
          & Impact
        </h1>
        <SearchBar />
      </div>
      <div className="">
        <Campaigns />
      </div>
    </div>
  );
}

export default DonationPageClient;
