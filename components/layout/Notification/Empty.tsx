import { Button } from "@/components/ui/button";
import Image from "next/image";

function Empty() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-[45rem] min-h-[250px] bg-white rounded-xl p-6 pb-6 transition-all duration-500 shadow-2xl flex flex-col items-center justify-center text-center">
        <Image
          src="/layout/bell.png"
          alt="bell"
          width={70}
          height={70}
          className="cursor-pointer"
        />
        <h1 className="font-bold text-lg mt-4">
          You don’t have any notification yet.
        </h1>
        <p className="text-[#666666] text-sm mt-2 max-w-md">
          Go to explore campaign to start donating funds or create campaigns for
          the causes you care about.
        </p>
        <div className="flex flex-row space-x-4 mt-6">
          <Button className="px-6 py-3 shadow-xl rounded-xl text-white cursor-pointer">
            Go to campaigns
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Empty;
