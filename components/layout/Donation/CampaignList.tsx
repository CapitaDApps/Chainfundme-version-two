import Image from "next/image";
import { CiStar } from "react-icons/ci";
import millify from "millify";
import { List } from "@/lib/DonationContent";
import React from "react";
import Link from "next/link";

function CampaignList() {
  return (
    <div className="w-full px-6">
      <div className="grid grid-cols-[450px_250px_240px_260px_100px] text-[#6B6B6573] md:text-[16px] text-[14px] font-medium mb-6 min-w-[1270px]">
        <span className="pl-30">Campaign Title</span>
        <span className="text-left">Amount Donated</span>
        <span className="text-left">%Campaign Goal</span>
        <span className="text-left">Donor Numbers</span>
        <span className="text-left">Status</span>
      </div>

      {List.map((list) => (
        <div
          key={list.id}
          className="grid grid-cols-[480px_270px_200px_230px_100px] items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg border-b border-[#CDCDCD]/50 min-w-[1270px]"
        >
          <div className="flex flex-row items-center space-x-4">
            <CiStar />
            <Link href={`/my-donations/${list.id}`} className="block">
              <Image
                src={list.image}
                alt="donation image"
                width={125}
                height={123}
                className="md:w-[125px] md:h-[123px] w-[50px] h-[50px]"
              />
            </Link>
            <div>
              <h1 className="max-w-[200px] font-semibold text-[14px] md:text-[16px]">
                {list.title}
              </h1>
              <p className="text-[#6B6B6573] text-[10px] md:text-xs">
                {list.name} | Creator
              </p>
            </div>
          </div>
          <div className="text-left text-[#32A2D9] text-[14px] md:text-[16px] font-medium">
            ${list.amount}
          </div>
          <div className="text-[#1A1A1A] text-[14px] md:text-[16px] font-medium text-left">
            {list.goal}%
          </div>
          <div className="text-[#1A1A1A] text-[14px] md:text-[16px] font-medium">
            {millify(list.donoeNumber)} donors
          </div>
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
      ))}
    </div>
  );
}

export default CampaignList;
