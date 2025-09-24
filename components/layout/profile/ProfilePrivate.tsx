import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GoPlus } from "react-icons/go";
import React from "react";
import Draftcard from "../MyCampaign/Draftcard";
import { CategorisItem } from "@/lib/CategoriesContent";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Matrics from "./Metrics";

function ProfilePrivateClient() {

  return (
    <div>
      <div className="relative w-full h-[250px] -mt-2">
        <Image
          src="/layout/sol.png"
          alt="solor"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div>
        <div className="relative pl-10">
          <Image
            src="/layout/pro.png"
            alt="solor"
            className="object-fit absolute z-20 bottom-[-70px]"
            width={120}
            height={120}
          />
        </div>
        <div className="pl-44 flex flex-row pt-4 justify-between">
          <div className="text-[#6D6D6D] text-[14px] space-x-2">
            <span className="space-x-2">
              <span className="font-bold text-[#2C2C2C]">22.4k</span>
              <span>Followers</span>
            </span>
            <span className="space-x-2">
              <span className="font-bold text-[#2C2C2C]">500</span>
              <span>Following</span>
            </span>
          </div>
          <div className="flex items-center flex-col pr-10">
            <Image src="/layout/lo.png" alt="solor" width={70} height={70} />
            <p className="text-[#05BB72] text-[14px] ml-4">Boost Trust Score</p>
          </div>
        </div>
        <div className="flex items-center justify-between py-2 px-10">
          <div className="space-y-3 -mt-4">
            <span className="flex space-x-3 items-center">
              <h1 className="font-bold text-2xl">Josiah Dennis</h1>
              <Button
                variant="outline"
                className="text-[#626262] text-xs py-1 px-2 flex items-center gap-1"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Get Verification Badge
              </Button>
            </span>

            <p className="text-[#6D6D6D] text-[14px] max-w-[45rem]">
              I share tips and free resources on UX Design | @base Builder |
              Ui/ux designer @futa_mart | Check Pinned tweet for my free design
              guide
            </p>
          </div>
          <div className="pr-4">
            <Button
              variant="outline"
              className="shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-2xl text-[#2379BC] border-none cursor-pointer"
            >
              <GoPlus /> Edit Profile
            </Button>
          </div>
        </div>
        <div className="pt-6 px-10">
          <h1 className="text-3xl font-bold">Metrics</h1>
          <Matrics />
          <div className="pt-6">
            <h1 className="text-2xl font-bold pb-3">Linked Account</h1>
            <span className="flex flex-col space-y-3 max-w-80 ">
              <Button
                variant="outline"
                className="px-20 rounded-2xl py-4 font-light"
              >
                Connect Wallet
              </Button>
              <Button
                variant="outline"
                className="px-20 rounded-2xl py-4 font-light"
              >
                <FaFacebook className="text-blue-700" /> Connect your Facebook
              </Button>
              <Button
                variant="outline"
                className="px-20 rounded-2xl py-4 font-light"
              >
                <BsTwitterX /> Connect you x
              </Button>
            </span>
          </div>
        </div>
        <div className="pt-8 px-10">
          <p className="text-2xl font-bold">Osama’s</p>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(330px,1fr))] gap-25 pt-6 pb-10">
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
