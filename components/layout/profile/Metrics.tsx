import { IoIosTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";
import Image from "next/image";
import React from "react";
function Matrics() {
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
    <div className="py-4 px-1 flex flex-row justify-start space-x-15 items-center">
      {list.map((item) => (
        <React.Fragment key={item.campaigns}>
          <div className="relative border border-[#6D6D6D]/30 shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-2xl w-[300px] flex flex-col items-center justify-start p-8 space-y-2">
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
  );
}
export default Matrics;
