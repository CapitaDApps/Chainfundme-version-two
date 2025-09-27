import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GoPlus } from "react-icons/go";
import React from "react";
import Draftcard from "../MyCampaign/Draftcard";
import { CategorisItem } from "@/lib/CategoriesContent";
import { FaFacebook } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import Matrics from "./Metrics";
import { ProgressIndicator } from "./ProgressIndicator";

function ProfilePrivateClient() {
  return (
    <div>
      <div className="relative w-full h-[200px] md:h-[250px] mt-2 md:-mt-2">
        <Image
          src="/layout/sol.png"
          alt="solor"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div>
        <div className="relative pl-5 md:pl-10">
          <Image
            src="/layout/pro.png"
            alt="profile"
            width={120}
            height={120}
            className="absolute z-20 bottom-[-50px] md:bottom-[-70px] w-[80px] h-[80px] md:w-[120px] md:h-[120px] object-contain"
          />
        </div>

        <div className="pl-28 md:pl-44 flex flex-col md:flex-row pt-2 md:pt-4 justify-between">
          <div className="text-[#6D6D6D] text-[14px] space-x-2">
            <span className="space-x-2">
              <span className="font-bold text-[#2C2C2C] text-xs md:text-sm">
                22.4k
              </span>
              <span className="text-xs md:text-sm">Followers</span>
            </span>
            <span className="space-x-2">
              <span className="font-bold text-[#2C2C2C] text-xs md:text-sm">
                500
              </span>
              <span className="text-xs md:text-sm">Following</span>
            </span>
          </div>
          <div className="hidden md:flex items-center flex-col pr-10 ">
            <ProgressIndicator value={75} size={70} />
            <p className="text-[#05BB72] text-[14px] ml-4">Boost Trust Score</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between py-2 px-5 md:px-10 pt-15 md:pt-1">
          <div className="space-y-3 -mt-4">
            <span className="flex space-x-3 items-center">
              <h1 className="font-bold md:text-2xl text-xl">Josiah Dennis</h1>
              <Button
                variant="outline"
                className="text-[#626262] text-[10px] md:text-xs py-1 px-2 flex items-center gap-1"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Get Verification Badge
              </Button>
            </span>
            <div>
              <span className="flex flex-row space-x-3">
                <span>
                  <IoWalletOutline />
                </span>
                <span>
                  <FaFacebook className="text-blue-700" />
                </span>
                <span>
                  <BsTwitterX />
                </span>
              </span>
            </div>
            <p className="text-[#6D6D6D] text-xs md:text-[14px] max-w-[45rem] line-clamp-3">
              I share tips and free resources on UX Design | @base Builder |
              Ui/ux designer @futa_mart | Check Pinned tweet for my free design
              guide
            </p>
          </div>

          {/* MOBILE */}
          <div className="flex md:hidden justify-between items-center w-full mt-4">
            <Button
              variant="outline"
              className="shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-2xl text-[#2379BC] text-xs border-none cursor-pointer"
            >
              <GoPlus /> Edit Profile
            </Button>
           <div className="flex flex-col space-y-2">
             <ProgressIndicator value={75} size={60} />
             <p className="text-[#05BB72] text-[14px] ml-4">Boost Trust Score</p>
           </div>
          </div>
        </div>

        <div className="pt-6 px-10">
          <h1 className="text-2xl md:text-3xl font-bold">Metrics</h1>
          <Matrics />
        </div>
        <div className="pt-8 px-10">
          <p className="text-2xl font-bold">Osama's</p>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(330px,1fr))] gap-8 md:gap-25 pt-6 pb-10">
              {CategorisItem.slice(0, 3).map((campaign) => (
                <Draftcard
                  key={campaign.id}
                  campaign={campaign}
                  status="draft"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePrivateClient;
