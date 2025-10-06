import FundDialog from "@/components/fund/fundDialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/lib/utils";
import { ReturnCampaignDocument } from "@/types/api";
import Image from "next/image";
import { CiShare2 } from "react-icons/ci";

function Rightpart({ campaign }: { campaign: ReturnCampaignDocument }) {
  return (
    <div>
      <div className="border border-none shadow-[0_0_15px_rgba(0,0,0,0.3)] p-6 rounded-xl w-full max-w-[430px]">
        <h1 className="text-[20px] font-medium">
          ${campaign.currentAmount.toLocaleString()} USD raised
        </h1>
        <p className="text-[#6B6B65] text-xs pb-2">
          ${formatPrice(campaign.targetAmount)} target |{" "}
          {formatPrice(campaign.funders.length)} donations
        </p>
        <Progress
          value={(campaign.currentAmount / campaign.targetAmount) * 100}
          className="h-3 w-full"
        />
        <div className="flex flex-col space-y-4 pt-8 pb-8">
          <FundDialog campaign={campaign}>
            <Button className="!px-24 !py-6 space-x-2 cursor-pointer rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] w-full">
              Fund Now
            </Button>
          </FundDialog>
          <Button
            variant="outline"
            className="!px-20 !py-6 space-x-2 cursor-pointer rounded-2xl text-[#2379BC] shadow-[0_0_15px_rgba(0,0,0,0.3)] "
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
              {campaign.funders.length} people have just made a donation
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
    </div>
  );
}
export default Rightpart;
