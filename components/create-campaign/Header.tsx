import React from "react";
import { Button } from "../ui/button";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaWallet } from "react-icons/fa";

export default function Header({ step }: { step: number }) {
  const arr = [
    "Campaign Basics",
    "Campaign Media",
    "Campaign Description",
    "Campaign Fundraising",
    "Campaign Review",
  ];
  return (
    <>
      <div className="space-y-3 hidden lg:block pb-16 px-2">
        <div className="flex justify-end">
          <Button
            style={{
              background: "linear-gradient(180deg, #1E5AA8 0%, #2379BC 100%)",
            }}
            className="rounded-2xl cursor-pointer  px-6 py-3"
          >
            Connect Wallet
          </Button>
        </div>

        <p className="underline text-[#878787] text-sm">Save to draft</p>
      </div>
      <div className="space-y-3 lg:hidden fixed w-full bg-[#F4F9FC] pt-4 z-50  px-2">
        <div className="flex justify-between items-center">
          <MdOutlineKeyboardArrowLeft />
          <h6 className="text-sm font-medium">{arr.at(step)}</h6>
          <button
            style={{
              background: "linear-gradient(180deg, #1E5AA8 0%, #2379BC 100%)",
            }}
            className="cursor-pointer  size-8 rounded-full flex items-center justify-center"
          >
            <FaWallet className="text-white text-xs"/>
          </button>
        </div>

        <p className="underline text-[#878787] text-sm hidden lg:block">
          Save to draft
        </p>
      </div>
    </>
  );
}
