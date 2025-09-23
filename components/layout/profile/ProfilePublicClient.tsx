import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GoPlus } from "react-icons/go";
import React from "react";
import { IoIosTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";

function ProfilePublicClient() {
  const list = [
    {
      image: "/layout/mic.png",
      campaigns: "Total Campaigns",
      stack: "78 bmp",
    },
    {
      image: "/layout/lh.png",
      campaigns: "Total Donations",
      trend: 2.5,
      trendDirection: "up",
      stack: "$5.5k",
    },
    {
      image: "/layout/mo.png",
      campaigns: "Amout raised from campaigns",
      trend: 2.3,
      trendDirection: "down",
      stack: "$300k",
    },
  ];

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
            <p className="text-[#05BB72] text-[14px] ml-4">
              Average Trust Score
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between py-2 px-10">
          <div className="space-y-3 -mt-4">
            <h1 className="font-bold text-2xl">Josiah Dennis</h1>
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
              <GoPlus /> Follow
            </Button>
          </div>
        </div>
        <div className="pt-6 px-10 pb-10">
          <h1 className="text-3xl font-bold">Metrics</h1>
          <div className="py-4 px-2 flex flex-row space-x-35 justify-center items-center">
            {list.map((item) => (
              <React.Fragment key={item.campaigns}>
                <div className="relative border border-[#6D6D6D]/30 shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-2xl w-[300px] flex flex-col items-center justify-center p-8 space-y-2">
                  {item.trend && (
                    <span
                      className={`flex items-center absolute gap-x-2 top-2 right-2 border border-none rounded-2xl text-xs px-4 py-1 ${
                        item.trendDirection === "up"
                          ? "bg-green-100 text-[#00B600]"
                          : "bg-red-100 text-[#FF0000]"
                      }`}
                    >
                      {item.trend}
                      {item.trendDirection === "up" ? (
                        <IoIosTrendingUp />
                      ) : (
                        <IoIosTrendingDown />
                      )}
                    </span>
                  )}
                  <Image src={item.image} alt="image" width={70} height={70} />
                  <p className="text-[14px] text-[#6D6D6D]">{item.campaigns}</p>
                  <h1 className="font-bold text-xl">{item.stack}</h1>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePublicClient;
