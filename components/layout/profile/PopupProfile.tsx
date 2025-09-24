"use client";

import React, { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Socials from "./Socials";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "./ProgressIndicator";

function PopupProfile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const toggleFollow = () => setIsFollowing(!isFollowing);

  return (
    <div >
      <span className="flex justify-end absolute top-4 right-4 cursor-pointer">
        <FaExclamationTriangle className="md:text-xl text-lg text-red-500" />
      </span>

      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src="/layout/pro.png"
          alt="avatar"
          width={80}
          height={80}
          className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full shadow-sm"
        />

        <div className="text-center flex flex-row gap-x-2 items-center justify-center mt-2">
          <h3 className="text-2xl font-bold">John Doe</h3>
          <Button
            style={{
              background: "linear-gradient(90deg, #1E5AA8 0%, #2379BC 100%)",
            }}
            className="h-7 px-3 text-white text-xs rounded-2xl font-bold"
            onClick={toggleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        <div className="flex md:justify-between md:flex-row flex-col-reverse gap-4 items-center justify-center w-full">
          <ProgressIndicator value={43} size={120} />

          <div className="flex justify-center gap-4">
            <div className="text-center">
              <p className="font-bold text-lg">1.2k</p>
              <p className="text-gray-500 text-sm">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">284</p>
              <p className="text-gray-500 text-sm">Following</p>
            </div>
          </div>
        </div>

        <Socials />
      </div>
    </div>
  );
}
export default PopupProfile;
