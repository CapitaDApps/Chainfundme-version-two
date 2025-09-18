// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";
import Image from "next/image";

export interface CampaignItem {
  id: number;
  image: string;
  timeleft: string;
  title: string;
  creatorimage: string;
  creatorname: string;
  story: string;
  fundrasied: string;
  fundtarget: string;
  category: string;
}

interface FundraisingCardProps {
  campaign: CampaignItem;
}

const CampaignCard = ({ campaign }: FundraisingCardProps) => {
  return (
    <article className="w-full h-full"> 
      <div
        
        className="w-full h-full max-w-[330px] min-h-[260px] rounded-[16px] bg-blue-50/50 border-none  transition-colors duration-500 overflow-hidden flex flex-col items-center justify-between" 
      >
        <div className="relative w-full h-55"> 
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col"> 
          <div className="text-[#666666] text-xs flex justify-end items-center gap-x-2 mb-2"> 
            <Clock className="w-3 h-3" /> {campaign.timeleft}
          </div>
          <h3 className="font-semibold line-clamp-1 mb-2">{campaign.title}</h3> 
          {/* <div className="flex items-center mb-2">
            <Avatar className="w-6 h-6 mr-2">
              <AvatarImage
                src={campaign.creatorimage || "/layout/Ellipse.png"}
              />
              <AvatarFallback>{campaign.creatorname.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-xs text-[#666666]">
              {campaign.creatorname} | Campaign Creator
            </div>
          </div> */}
          {/* <div className="line-clamp-2 text-sm text-[#666666] mb-3 font-medium flex-1">
            {campaign.story}
          </div> */}
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
          {/* <div className="flex justify-center items-center">
            <Button
              style={{
                background: "linear-gradient(180deg, #1E5AA8 0%, #2379BC 100%)",
              }}
              className="rounded-2xl cursor-pointer shadow-lg/20 px-6 py-2" 
            >
              Fund now
            </Button>
          </div> */}
        </div>
      </div>
    </article>
  );
};

export default CampaignCard;