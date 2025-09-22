import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CiShare2 } from "react-icons/ci";
import Image from "next/image";
import { list } from "@/lib/donatelist";
import React from "react";

function Rightpart() {
  return (
    <div>
      <div className="border border-none shadow-[0_0_15px_rgba(0,0,0,0.3)] p-6 rounded-xl w-full max-w-[430px]">
        <h1 className="text-[20px] font-medium">$398,383 USD raised</h1>
        <p className="text-[#6B6B65] text-xs pb-2">
          $500K target | 6.4K donations
        </p>
        <span>
          <Progress value={43} className="h-3 w-75" />
        </span>
        <span className="flex flex-col space-y-4 pt-8 pb-8">
          <Button className="!px-24 !py-6 space-x-2 cursor-pointer rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] ">
            Donate Now
          </Button>
          <Button
            variant="outline"
            className="!px-20 !py-6 space-x-2 cursor-pointer rounded-2xl text-[#2379BC] shadow-[0_0_15px_rgba(0,0,0,0.3)] "
          >
            <CiShare2 /> <span>Share Campaigns</span>
          </Button>
        </span>
        <div>
          <span className="flex flex-row items-center space-x-4 w-full pb-3">
            <Image
              src="/layout/tr.png"
              alt="image"
              width={40}
              height={40}
              className="shrink-0"
            />
            <p className="text-[#47698D] text-[14px] max-w-[12rem] font-medium">
              519 people have just made a donation
            </p>
          </span>
          {list.map((list) => (
            <React.Fragment key={list.id}>
              <span className="flex flex-row items-center space-x-4 w-full pb-3 ">
                <Image
                  src={list.image}
                  alt="image"
                  width={40}
                  height={40}
                  className="shrink-0 rounded-full"
                />
                <span>
                  <h3 className="text-[14px]">{list.name}</h3>
                  <span></span>{" "}
                  <p className="text-xs ">
                    <span className="font-medium">${list.donatedamount}</span>{" "}
                    <span className="text-[#47698D]/90">| Recent Donation</span>
                  </p>
                </span>
              </span>
            </React.Fragment>
          ))}
          <div className="flex flex-row items-center justify-between pt-6">
            <Button variant="outline" className="rounded-2xl cursor-pointer">
              See all
            </Button>
            <Button variant="outline" className="rounded-2xl cursor-pointer">
              See top
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Rightpart;
