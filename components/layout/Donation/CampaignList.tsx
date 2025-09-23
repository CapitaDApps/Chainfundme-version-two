import Image from "next/image";
import { CiStar } from "react-icons/ci";
import millify from "millify";
import { List } from "@/lib/DonationContent";
import React from "react";
import Link from "next/link";

function CampaignList() {
  return (
    <div className="w-full px-6">
      <div className="grid grid-cols-[420px_270px_240px_255px_100px] items-center text-[#6B6B6573] font-medium mb-6">
        <span></span>
        <span className="text-left">Amount Donated</span>
        <span className="text-left">%Campaign Goal</span>
        <span className="text-left">Donor Numbers</span>
        <span className="text-left">Status</span>
      </div>
      <hr className="border-[#CDCDCD]/50 w-full mb-6" />
      
      {List.map((list) => (
        <React.Fragment key={list.id}>
          <div className="grid grid-cols-[450px_290px_200px_230px_100px] items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
            {/* First column - Campaign info */}
            <div className="flex flex-row items-center space-x-4">
              <CiStar />
              <Link href={`/my-donations/${list.id}`} className="block">
                <Image
                  src={list.image}
                  alt="donation image"
                  width={125}
                  height={123}
                />
              </Link>
              <div>
                <h1 className="max-w-[200px] font-semibold text-[16px]">
                  {list.title}
                </h1>
                <p className="text-[#6B6B6573] text-xs">
                  {list.name} | Creator
                </p>
              </div>
            </div>
            
            {/* Amount Donated column */}
            <div className="text-left text-[#32A2D9] text-[16px] font-medium">
              ${list.amount}
            </div>
            
            {/* Campaign Goal column */}
            <div className="text-[#1A1A1A] text-[16px] font-medium text-left">
              {list.goal}%
            </div>
            
            {/* Donor Numbers column */}
            <div className="text-[#1A1A1A] text-[16px] font-medium">
              {millify(list.donoeNumber)} donors
            </div>
            
            {/* Status column - FIXED */}
            <div
              className={`text-[14px] font-semibold whitespace-nowrap ${
                list.status === "in-progress"
                  ? "text-yellow-400"
                  : list.status === "completed"
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              {list.status === "in-progress"
                ? "In Progress"
                : list.status === "completed"
                ? "Completed"
                : "Unknown"}
            </div>
          </div>
          <hr className="border-[#CDCDCD]/50 w-full mt-6 mb-6" />
        </React.Fragment>
      ))}
    </div>
  );
}

export default CampaignList;