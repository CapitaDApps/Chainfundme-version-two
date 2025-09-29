"use client";

import { useSearchParams } from "next/navigation";
import CategoriesTab from "@/components/layout/Explore/CategoriesTab";
import CreateCamBtn from "@/components/layout/CreateCamBtn";
import Filter from "@/components/layout/Explore/Filter";
import SearchBar from "@/components/layout/SearchBar";
import { useState } from "react";
import ComProfileModel from "@/components/layout/Explore/ComProfileModel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCampaigns } from "@/services/api/hooks/campaign/useCampaigns";

export default function ExplorePageClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "for you";
  const { campaigns, retrievingCampaigns, error } = useCampaigns();

  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="py-6 px-4">
      {isModalOpen && <ComProfileModel onClose={() => setIsModalOpen(false)} />}
      {/* {isModalOpen && <ConAllset onClose={() => setIsModalOpen(false)} />} */}
      <div>
        <p className="md:pl-2 text-[14px] md:text-[16px]">
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
            <div>
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

        <div className="block md:hidden pt-6">
          <div className="relative bg-[#F3F3F3] flex flex-col items-center justify-center mx-[-1rem]">
            <div className="absolute top-0 right-0">
              <Image src="/layout/rol2.png" alt="rol" width={30} height={30} />
            </div>

            <div className="px-4 py-6 flex flex-col items-center space-y-3">
              <p className="text-[14px] text-center">
                Want to raise some funds?
              </p>
              <div className="flex flex-row space-x-3">
                <CreateCamBtn />
                <Button
                  variant="outline"
                  style={{ boxShadow: "0 0 15px rgba(0,0,0,0.15)" }}
                  className=" px-4 md:px-6 inline-flex py-3 bg-[#FFFFFF] shadow-lg text-[#2379BC] text-xs md:text-[14px] rounded-2xl text-center cursor-pointer items-center justify-center"
                >
                  How it works
                </Button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0">
              <Image
                src="/layout/cone2.png"
                alt="cone"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
        <hr className="hidden md:block border-[#CDCDCD]/40 w-full mt-8" />
        <CategoriesTab
          initialCategory={category}
          campaigns={campaigns || []}
          isLoading={retrievingCampaigns}
          error={error}
        />
      </div>
    </div>
  );
}
