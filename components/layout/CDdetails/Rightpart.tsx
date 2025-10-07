import FundDialog from "@/components/fund/fundDialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatNumber, formatTimeLeft } from "@/lib/utils";
import { ReturnCampaignDocument } from "@/types/api";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { MoonLoader } from "react-spinners";

function Rightpart({ campaign }: { campaign: ReturnCampaignDocument }) {
  const startsInFuture = new Date(campaign.startDate).getTime() > Date.now();
  const [isFunding, setIsFunding] = useState(false);

  return (
    <div className="border border-none shadow-lg p-6 rounded-xl w-full">
      <h1 className="text-[20px] font-medium">
        ${campaign.currentAmount.toLocaleString()} USD raised
      </h1>
      <p className="text-[#6B6B65] text-xs pb-2">
        ${formatNumber(campaign.targetAmount)} target |{" "}
        {formatNumber(campaign.funders.length)} donations
      </p>
      <Progress
        value={(campaign.currentAmount / campaign.targetAmount) * 100}
        className="h-3 w-full"
      />
      <div className="flex flex-col space-y-4 pt-8 pb-8">
        <FundDialog
          campaign={campaign}
          isFunding={isFunding}
          setIsFunding={setIsFunding}
        >
          <Button
            className="!px-24 !py-6 space-x-2 cursor-pointer rounded-2xl shadow-lg w-full"
            disabled={isFunding}
          >
            {startsInFuture ? (
              <p className="flex items-center gap-3 text-xs">
                <Clock />{" "}
                <span className="mt-1">
                  {" "}
                  {formatTimeLeft(campaign.startDate, campaign.endDate)}
                </span>
              </p>
            ) : isFunding ? (
              <MoonLoader size={20} color="#fff" />
            ) : (
              "Fund Now"
            )}
          </Button>
        </FundDialog>
        <Button
          variant="outline"
          className="!px-20 !py-6 space-x-2 cursor-pointer rounded-2xl text-[#2379BC] shadow-lg"
        >
          <CiShare2 /> <span>Share Campaigns</span>
        </Button>
      </div>
      <div>
        <span className="flex flex-row items-center space-x-4 w-full pb-3">
          <Image
            src="/layout/tr.png"
            alt="image"
            width={40}
            height={40}
            className="shrink-0"
          />
          <p className="text-[#47698D] text-[14px] max-w-[12rem] font-medium">
            {campaign.funders.length}{" "}
            {campaign.funders.length > 1 ? "people" : "person"} have just made a
            donation
          </p>
        </span>
        {/* {list.map((list) => (
            <React.Fragment key={list.id}>
              <span className="flex flex-row items-center space-x-4 w-full pb-3 ">
                <Popover>
                  <PopoverTrigger asChild>
                    <Image
                      src={list.image}
                      alt="image"
                      width={40}
                      height={40}
                      className="shrink-0 rounded-full"
                    />
                  </PopoverTrigger>

                  <PopoverContent
                    side="bottom"
                    align="center"
                    sideOffset={10}
                    className="bg-white rounded-xl shadow-md p-6 w-[400px] md:w-[350px]"
                  >
                    <PopupProfile />
                  </PopoverContent>
                </Popover>

                <span>
                  <h3 className="text-[14px]">{list.name}</h3>
                  <span></span>{" "}
                  <p className="text-xs ">
                    <span className="font-medium">${list.donatedamount}</span>{" "}
                    <span className="text-[#47698D]/90">| Recent Donation</span>
                  </p>
                </span>
              </span>
            </React.Fragment>
          ))} */}
        {/* <div className="flex flex-row items-center justify-between pt-6">
            <Button variant="outline" className="rounded-2xl cursor-pointer">
              See all
            </Button>
            <Button variant="outline" className="rounded-2xl cursor-pointer">
              See top
            </Button>
          </div> */}
      </div>
    </div>
  );
}
export default Rightpart;
