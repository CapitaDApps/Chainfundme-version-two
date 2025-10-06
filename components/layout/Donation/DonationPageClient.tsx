"use client";

import Campaigns from "@/components/layout/Donation/Campaigns";
import SearchBar from "@/components/layout/SearchBar";
import { useUser } from "@privy-io/react-auth";
import Filter from "../Explore/Filter";
import DonationModel from "./DonationModel";
function DonationPageClient() {
  const { user } = useUser();

  if (!user)
    return <DonationModel text="Join or Sign In to Access Your Donations" />;

  return (
    <div className="mt-16 px-4 sm:px-10 md:px-14 lg:px-20 min-h-[100dvh] md:h-auto">
      <div className="flex flex-col items-center justify-center mt-28 md:mt-18">
        <h1 className="text-sidebar-content text-center leading-tight mt-5 mb-3 font-semibold text-[22px] md:text-[32px] text-[#101828]">
          Track Your&nbsp;{" "}
          <span className="block md:inline">
            <span className="text-[#003DEF] font-semibold">
              Contributions&nbsp;
            </span>{" "}
            & Impact
          </span>
        </h1>
        <div className="hidden md:block w-full mb-3 max-w-3xl">
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

      <div className="">
        <Campaigns />
      </div>
    </div>
  );
}

export default DonationPageClient;
