"use client";

import React, { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Socials from "./Socials";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { UserDocument } from "@/types/api";

function PopupProfile({ owner }: { owner: UserDocument }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const toggleFollow = () => setIsFollowing(!isFollowing);

  return (
    <div className="relative">
      <button
        aria-label="Report profile"
        className="absolute top-4 right-4 cursor-pointer"
      >
        <FaExclamationTriangle className="md:text-xl text-lg text-red-500" />
      </button>

      <div className="flex flex-col items-center justify-center gap-3">
        {owner.profilePicture ? (
          <Image
            src={owner.profilePicture}
            alt="avatar"
            width={100}
            height={100}
            className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full shadow-sm"
          />
        ) : (
          <div className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full shadow-sm bg-gray-200 flex items-center justify-center">
            <p className="text-xl text-gray-800">{owner.name.slice(0, 2)}</p>
          </div>
        )}

        <div className="text-center flex flex-row gap-x-2 items-center justify-center mt-2">
          <h3 className="text-xl font-semibold">{owner.name}</h3>
          <span className="flex flex-row items-center justify-center space-x-1">
            <Image src="/layout/bag.png" alt="bag" width={20} height={20} />
            <p className="text-xs">{owner.isVerified ? "Verified" : "Unverified"}</p>
          </span>
        </div>

        <p className="text-sm text-[#6D6D6D] line-clamp-2 text-center">
          {owner.bio}
        </p>

        <div className="flex justify-center pt-6 space-x-8">
          <div className="text-center">
            <p className="font-bold text-sm">{owner.followers}</p>
            <p className="text-gray-500 text-xs">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-sm">{owner.supportedCampaigns?.length || 0}</p>
            <p className="text-gray-500 text-xs">Following</p>
          </div>
        </div>

        <Button
          className="flex items-center gap-1 mt-4 py-1.5 px-4 text-xs rounded-2xl cursor-pointer bg-[#003DEF] text-white hover:bg-sky-600"
          onClick={toggleFollow}
        >
          {isFollowing ? "Unfollow" : "Follow"}
          <GoPlus className="text-sm" />
        </Button>

        <Socials />
      </div>
    </div>
  );
}

export default PopupProfile;
