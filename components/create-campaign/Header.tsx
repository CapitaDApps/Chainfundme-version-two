"use client";
import React from "react";
import { Button } from "../ui/button";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CreateWalletButton from "@/components/wallet_connect/CreateWalletButton";
import UserDropdownMenu from "../layout/Header/userDropdownMenu";

export default function Header({ step }: { step: number }) {
  const arr = [
    "Campaign Basics",
    "Campaign Media",
    "Campaign Description",
    "Campaign Fundraising",
    "Campaign Review",
  ];
  const router = useRouter();
  return (
    <>
      <div className="space-y-3 hidden lg:block pb-16 px-2">
        <div className="flex justify-end">
          <div className="max-w-xs">
            <CreateWalletButton>
              <UserDropdownMenu />
            </CreateWalletButton>
          </div>
        </div>

        <Button variant={"outline"} className="text-sm">
          Save to draft
        </Button>
      </div>
      <div className="lg:hidden fixed flex items-center   w-full bg-[#F4F9FC] z-50 px-5 sm:px-8 h-14">
        <div className="flex justify-between items-center  w-full">
          <div className="flex items-center gap-5">
            <div
              className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center"
              onClick={() => router.back()}
            >
              <MdOutlineKeyboardArrowLeft />
            </div>
            <h6 className="text-sm font-medium">{arr.at(step)}</h6>
          </div>

          <div className="max-w-xs mt-2">
            <CreateWalletButton>
              <UserDropdownMenu />
            </CreateWalletButton>
          </div>
        </div>
      </div>
    </>
  );
}
