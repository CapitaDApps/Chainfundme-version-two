import CreateCamBtn from "../CreateCamBtn";
import SearchBar from "../SearchBar";
import Image from "next/image";

function ExplorePageClient() {
  return (
    <div className="flex flex-col items-center justify-center pt-16 py-6 px-4">
      <span className="border border-none bg-[#F5F7FA]  rounded-4xl px-4 py-2 mb-4">
        {" "}
        <h1 className="text-[24px] font-semibold text-[#292933]">
          #No 1 Decentralized Crowdfunding platform
        </h1>
      </span>
      <div className="flex flex-col items-start justify-start pt-2 py-6 px-4 relative">
        <Image
          src="/layout/h-line.png"
          alt="line"
          width={3}
          height={2}
          className="absolute left-0 -ml-120 top-[75px]"
        />
      </div>

      <span className=" max-w-4xl pt-6">
        <h1 className="text-[#292933] text-center leading-20 font-semibold text-[75px]">
          <span>Find </span>
          <span className="text-[#003DEF]">campaigns,</span>
          <span className="block md:inline">
            <span> Fund </span>
            what you care about.
          </span>
        </h1>
      </span>
      <div className="hidden md:block w-full max-w-3xl pt-3">
        <SearchBar />
      </div>
      <div className="pt-12">
        <CreateCamBtn />
      </div>
    </div>
  );
}

export default ExplorePageClient;
