import { Progress } from "@/components/ui/progress";
import CreateCamBtn from "../CreateCamBtn";
import SearchBar from "../SearchBar";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ExplorePageClient() {
  return (
    <div className="flex flex-col items-center justify-center mt-14 md:mt-10 lg:mt-12 py-6">
      <span className="border border-none bg-[#F5F7FA]  rounded-4xl px-4 py-2 md:mb-2 lg:mb-4">
        {" "}
        <h1 className="text-xs md:text-lg lg:text-[24px] font-semibold text-[#292933] px-2">
          #No 1 Decentralized Crowdfunding platform
        </h1>
      </span>
      <div className="flex flex-col items-start justify-start pt-2 py-6 px-4 relative">
        <Image
          src="/layout/h-line.png"
          alt="line"
          width={3}
          height={2}
          className="absolute -left-130  top-[50px]"
        />
      </div>

      <div className=" max-w-3xl lg:max-w-4xl px-4 md:px-14 lg:px-0">
        <h1 className="text-[#292933] text-center  md:leading-16 lg:leading-20 font-semibold  text-3xl md:text-5xl lg:text-[75px]">
          <span>Find </span>
          <span className="text-[#003DEF]">campaigns,</span>
          <span className="block md:inline">
            <span> Fund </span>
            what you care about.
          </span>
        </h1>
      </div>
      <div className="w-full max-w-3xl mt-3 md:mt-6 px-4 md:px-14 lg:px-0">
        <SearchBar />
      </div>
      <div className="mt-8 md:mt-12 w-fit shadow-xl shadow-[#003DEF40]">
        <CreateCamBtn />
      </div>

      {/* Campaigns */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4 lg:px-14 xl:px-20 mt-32 mb-20">
        <div className="lg:col-span-2">
          <Image
            src={"/explore/explore-1.jpg"}
            alt=""
            width={500}
            height={500}
            className="xl:h-[500px] rounded-[30px] w-full"
          />
          <div className="mt-5">
            <h3 className="text-base md:text-lg lg:text-2xl lg:text-[40px] font-bold text-secondary-text">
              Help Fund Life-Saving Surgeries
            </h3>
            <p className="text-sm md:text-base lg:text-2xl text-secondary-text-muted font-medium">
              3days left until completion
            </p>
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale mt-4">
              <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                <AvatarImage src="/tokens/usdc.svg" alt="usdc" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                <AvatarImage src="/tokens/frenchie.svg" alt="frenchie" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </div>
            <Progress value={7} className="mt-4 lg:h-4" />
            <div className="flex justify-between mt-1 text-xs sm:text-sm lg:text-xl">
              <p className="text-[#292933]">7% completed</p>
              <p className="text-[#292933]">$100,000</p>
            </div>
          </div>

          <div className="text-xl sm:text-2xl lg:text-[40px] mt-12 md:mt-16 text-[#292933] italic">
            <p>
              &quot; The Future of crowdfunding is Borderless and Frictionless
              &quot;
            </p>
            <p className="mt-4 md:mt-9">- Brainmaniac</p>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-12 md:space-y-8">
          <div>
            <Image
              src={"/explore/explore-2.jpg"}
              alt=""
              width={500}
              height={500}
              className="xl:h-[340px]  rounded-[30px] w-full"
            />
            <div className="mt-3">
              <h3 className="text-secondary-text text-base md:text-lg lg:text-2xl font-bold">
                Help Fund Life-Saving Surgeries
              </h3>
              <p className="text-secondary-text-muted text-sm md:text-base lg:text-lg font-medium">
                3days left until completion
              </p>

              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale mt-4">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/tokens/usdc.svg" alt="usdc" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/tokens/frenchie.svg" alt="frenchie" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
              </div>
              <Progress value={7} className="mt-4" />
              <div className="text-secondary-text flex justify-between mt-1 text-sm">
                <p>7% completed</p>
                <p>$100,000</p>
              </div>
            </div>
          </div>
          {/* Second */}
          <div>
            <Image
              src={"/explore/explore-2.jpg"}
              alt=""
              width={500}
              height={500}
              className="xl:h-[340px]  rounded-[30px] w-full"
            />
            <div className="mt-3">
              <h3 className="text-secondary-text text-base md:text-lg lg:text-2xl font-bold">
                Help Fund Life-Saving Surgeries
              </h3>
              <p className="text-secondary-text-muted text-sm md:text-base lg:text-lg font-medium">
                3days left until completion
              </p>

              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale mt-4">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/tokens/usdc.svg" alt="usdc" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/tokens/frenchie.svg" alt="frenchie" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
              </div>
              <Progress value={7} className="mt-4" />
              <div className="text-secondary-text flex justify-between mt-1 text-sm">
                <p>7% completed</p>
                <p>$100,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorePageClient;
