"use client";

import { useSearchParams } from "next/navigation";
import CategoriesTab from "@/components/layout/Explore/CategoriesTab";
import CreateCamBtn from "@/components/layout/CreateCamBtn";
import Filter from "@/components/layout/Explore/Filter";
import SearchBar from "@/components/layout/SearchBar";
import { useState } from "react";
import ComProfileModel from "@/components/layout/Explore/ComProfileModel";
import Raisefund from "../Reusables/Raisefund";

export default function ExplorePageClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "for you";

  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="py-6 px-4">
      {isModalOpen && <ComProfileModel onClose={() => setIsModalOpen(false)} />}
      {/* {isModalOpen && <ConAllset onClose={() => setIsModalOpen(false)} />} */}
      <div>
        <p className="md:pl-2 text-[14px] md:text-[16px] font-semibold">
          Welcome back, <span className="text-[#2379bc]">Tarey Kasali</span>
        </p>

        <div className="flex flex-col items-center justify-center pt-4">
          <h1 className="text-sidebar-content text-center leading-tight font-semibold text-[22px] md:text-[32px] text-[#101828]">
            <span className="font-[1000]">Find </span>
            <span className="text-[#2379bc]">campaigns</span>.
            <span className="block md:inline">
              <span className="font-[1000]"> Fund </span>
              what you care about.
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

        <div className="hidden md:flex flex-row justify-between items-center mt-10 px-4">
          <CreateCamBtn />
          <Filter />
        </div>

        <Raisefund />
        <hr className="hidden md:block border-[#CDCDCD]/40 w-full mt-8" />
        <CategoriesTab initialCategory={category} />
      </div>
    </div>
  );
}
