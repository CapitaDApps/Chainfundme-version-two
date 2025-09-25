// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FundraisingCardProps } from "@/types/campaign";
import { Clock } from "lucide-react";
import Image from "next/image";

const CampaignCard = ({ campaign }: FundraisingCardProps) => {
  return (
    <>
      <article className="w-full h-full hidden md:block">
        <div className="w-full h-full max-w-[330px] min-h-[260px] rounded-[16px] bg-blue-50/50 border-none  transition-colors duration-500 overflow-hidden flex flex-row md:flex-col items-center">
          <div className="relative w-full h-55">
            <Image
              src={campaign.image}
              alt={campaign.title}
              fill
              className="object-cover w-full h-full"
            />
          </div>
          <div className="py-2 px-6 flex-1 flex flex-col w-full">
            <div className="text-[#666666] text-xs flex justify-end items-center gap-x-2 mb-2">
              <Clock className="w-3 h-3" /> {campaign.timeleft}
            </div>
            <h3 className="font-semibold line-clamp-1 mb-2">
              {campaign.title}
            </h3>

            <div className="space-y-2">
              <Progress value={43} className="h-2" />
              <div className="flex justify-end items-center text-xs space-x-2">
                <span className="text-muted-foreground/80">
                  {campaign.fundrasied} raised
                </span>
                <span className="text-muted-foreground">
                  of {campaign.fundtarget}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="block md:hidden w-full">
        <div className="w-full max-w-full mx-auto rounded-[16px] bg-blue-50/50 border-none transition-colors duration-500 overflow-hidden flex flex-row min-h-[120px]">
          <div className="relative w-28 h-35 flex-shrink-0">
            <Image
              src={campaign.image}
              alt={campaign.title}
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="flex-1 p-3 flex flex-col min-w-0">
            <div className="text-[#666666] text-xs flex justify-between items-center mb-1">
              <span className="flex items-center gap-x-1">
                <Clock className="w-3 h-3" /> {campaign.timeleft}
              </span>
            </div>
            <h3 className="font-bold line-clamp-2 mb-2 text-sm max-w-50">
              {campaign.title}
            </h3>
            <div className="space-y-1 mt-auto">
              <Progress value={43} className="h-2" />
               <div className="flex justify-start items-center text-[10px] md:text-xs space-x-2">
                <span className="text-muted-foreground/80">
                  {campaign.fundrasied} raised
                </span>
                <span className="text-muted-foreground">
                  of {campaign.fundtarget}
                </span>
              </div>
              {/* <div className="flex justify-start space-x-2 items-center text-[10px]">
                <span>{campaign.fundrasied} raised</span>
                <span>of {campaign.fundtarget}</span>
              </div> */}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default CampaignCard;

{
  /* <div className="flex items-center mb-2">
            <Avatar className="w-6 h-6 mr-2">
              <AvatarImage
                src={campaign.creatorimage || "/layout/Ellipse.png"}
              />
              <AvatarFallback>{campaign.creatorname.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-xs text-[#666666]">
              {campaign.creatorname} | Campaign Creator
            </div>
          </div> */
}
{
  /* <div className="line-clamp-2 text-sm text-[#666666] mb-3 font-medium flex-1">
            {campaign.story}
          </div> */
}
