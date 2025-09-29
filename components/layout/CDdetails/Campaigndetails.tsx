"use client";

import Leftpart from "./Leftpart";
import Rightpart from "./Rightpart";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Campaigndetails() {
  const router = useRouter();

  return (
    <div className="md:px-12 px-4 ">
      <span
        className="flex md:hidden flex-row gap-x-2 text-[#2C2C2C] font-semibold pt-3 text-sm cursor-pointer items-center "
        onClick={() => router.back()} 
      >
        <FaLongArrowAltLeft /> <p>Back</p>
      </span>

      <h1 className="text-[#2C2C2C] font-bold text-2xl md:text-4xl pt-6">
        Help Bob Nagamallaiah’s Family Rebuild and Find Strength
      </h1>

      <div className="pt-8">
        <div className="flex flex-row justify-between">
          <Leftpart />

          <div className="sticky top-6 h-fit hidden md:block">
            <Rightpart />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Campaigndetails;
