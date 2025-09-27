"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import SelectToken from "@/components/layout/CDdetails/SelectToken";
import { CiShare2 } from "react-icons/ci";
import Profile from "./Profile";
import Comments from "./Comment";
import PreviewImages from "./PreviewImages";
import { useState } from "react";

function Leftpart() {
  const [expanded, setExpanded] = useState(false);

  const fullText = `
On May 2026, our beloved friend and community member, Bob Nagamallaiah, was taken from us far too soon. Bob was a devoted husband to Nisha, a loving father to his son Gaurav, and a kind, hardworking man whose generosity touched countless lives. Bob’s sudden passing has left his family heartbroken and facing an uncertain future. His son, Gaurav, just graduated high school and is preparing to begin college this fall with dreams of studying Hospitality Management, inspired by his father’s dedication and compassion. This campaign has been created to honor Bob’s memory by supporting Nisha and Gaurav during this incredibly difficult time. Funds raised will go directly toward helping the family manage immediate expenses and ensuring Gaurav can continue his education, carrying forward the legacy of his father’s love and generosity.
`;

  const previewText = fullText.slice(0, 250) + "...";

  return (
    <div>
      <div className="max-w-[720px]">
        <div className="mb-10">
          <Image
            src="/layout/hr.png"
            alt=""
            width={720}
            height={400}
            className="rounded-xl"
          />
        </div>
        <hr className="border-[#CDCDCD]/40 w-full" />
        <Profile />
        <hr className="border-[#CDCDCD]/40 w-full " />

        <div className="mt-1 md:mt-10">
          <p className="text-xs md:text-sm whitespace-pre-line leading-7">
            {expanded ? fullText : previewText}
            <br />
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read less" : "Read more"}
            </span>
          </p>
        </div>

        <div className="pt-6">
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
          />
          <div className="flex flex-row space-x-4 mt-[-10] mb-3 md:mt-4">
            <PreviewImages />
          </div>
          <div className="mt-4">
            <span>
              <p className="font-medium">Network</p>
              <span className="flex flex-row space-x-2 mt-2 mb-2">
                <Image src="/layout/BNB.png" alt="bnb" width={20} height={20} />
                <h3 className="text-xs">BNB</h3>
              </span>
            </span>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">
                  Other Accepted Chains for this Campaign
                </p>
              </div>
              <div className="flex flex-row space-x-2">
                <div className="flex space-x-2 bg-[#E4E4E4]/70 px-3 py-2 rounded-2xl max-w-[110px] items-center">
                  <Image
                    src="/layout/capita.png"
                    alt="token"
                    width={20}
                    height={20}
                    className="bg-purple-700 rounded-2xl"
                  />
                  <p className="text-xs font-semibold">Somnia</p>
                </div>
                <div className="flex space-x-2 bg-[#E4E4E4]/70 px-3 py-2 rounded-2xl max-w-[110px] items-center">
                  <Image
                    src="/layout/eth.png"
                    alt="token"
                    width={20}
                    height={20}
                  />
                  <p className="text-xs font-semibold">POLYGON</p>
                </div>
                <div className="flex space-x-2 bg-[#E4E4E4]/70 px-3 py-2 rounded-2xl max-w-[110px] items-center">
                  <Image
                    src="/layout/BASE.png"
                    alt="token"
                    width={20}
                    height={20}
                  />
                  <p className="text-xs font-semibold">BASE</p>
                </div>
              </div>
              <div>
                <SelectToken />
              </div>
              <div className="mb-6">
                <Button
                  variant="outline"
                  className="!px-24 !py-6 space-x-2 cursor-pointer"
                >
                  <CiShare2 /> <span>Share</span>
                </Button>
              </div>
              <hr className="border-[#CDCDCD]/40 w-full " />
              <div>
                <Comments />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Leftpart;
