import Image from "next/image";
import { CiStar } from "react-icons/ci";
import millify from "millify";
import { List } from "@/lib/DonationContent";
import React from "react";
function CampaignList() {
  return (
    <div className="w-full px-6">
      <div className="flex flex-row text-[#6B6B6573] justify-end gap-x-38 font-medium">
        <span>Amount Donated</span>
        <span>%Campaign Goal</span>
        <span>Donor Numbers</span>
        <span>Status</span>
      </div>
      <hr className="border-[#CDCDCD]/50 w-full mt-6 mb-6" />
      {List.map((list) => (
        <React.Fragment key={list.id}>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-4">
              <CiStar />
              <Image
                src={list.image}
                alt="donation image"
                width={125}
                height={123}
              />
              <div>
                <h1 className="max-w-[200px] font-semibold text-[16px]">
                  {list.title}
                </h1>
                <p className="text-[#6B6B6573] text-xs">
                  {list.name} | Creator
                </p>
              </div>
            </div>
            <div className="text-left text-[#32A2D9] text-[16px] -ml-30 font-medium">
              ${list.amount}
            </div>
            <div className="text-[#1A1A1A] text-[16px] font-medium text-left">
              {list.goal}%
            </div>
            <div className="text-[#1A1A1A] text-[16px] font-medium ">
              {millify(list.donoeNumber)} donors
            </div>
            <div
              className={`text-[16px] font-semibold ${
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
