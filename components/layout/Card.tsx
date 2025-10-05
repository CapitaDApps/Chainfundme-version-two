import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatPrice, formatTimeLeft } from "@/lib/utils";
import { DraftCardProps } from "@/types/campaign";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import MobileDraftCard from "./MobileCard";
import { getChainImage } from "@/lib/networks/config";

const Draftcard = ({ campaignData, status }: DraftCardProps) => {
  const isClickable = status !== "draft";
  const router = useRouter();

  const handleClick = (campaignId: string) => {
    router.push(`/campaign/${campaignId}`);
  };
  const campaign = campaignData.campaign;
  const amountFunded = campaignData.amount;

  const chains = campaign.chains.map((chain) => getChainImage(chain.networkId));

  return (
    <>
      <article className="w-full h-full hidden md:block">
        {isClickable ? (
          <div
            className="w-full h-full rounded-[16px] bg-blue-50/50 border-none transition-colors duration-500 overflow-hidden flex flex-col hover:shadow-md cursor-pointer"
            onClick={() => handleClick(campaign.cmid)}
          >
            <div className="relative w-full h-60 rounded-[16px] overflow-hidden">
              <Image
                src={campaign.image}
                alt={campaign.title}
                fill
                className="object-cover w-full h-full"
              />
            </div>

            <div className="py-2 px-4 flex-1 flex flex-col">
              <div
                className={`text-xs font-bold flex justify-start space-x-1 items-center mb-1 ${
                  status === "active"
                    ? "text-blue-600"
                    : status == "completed"
                    ? "text-green-600"
                    : "text-[#666666]"
                }`}
              >
                {formatTimeLeft(campaign.startDate, campaign.endDate)}
              </div>

              <h3 className="font-bold line-clamp-1 mb-2">{campaign.title}</h3>

              <div className="flex justify-between items-center pb-1">
                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
                  {chains.map((chain, i) => (
                    <Avatar className="h-5 w-5" key={i}>
                      <AvatarImage src={chain} alt="" />
                    </Avatar>
                  ))}
                </div>
                {amountFunded && (
                  <p className="text-xs text-green-600">
                    Donated ${formatPrice(amountFunded)}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Progress
                  value={(campaign.currentAmount / campaign.targetAmount) * 100}
                  className={`h-2 ${
                    status === "completed"
                      ? "[&>div]:bg-green-500"
                      : "[&>div]:bg-[#003DEF]"
                  }`}
                />
                <div className="flex justify-start space-x-1 items-center text-xs pb-2">
                  <span className="text-muted-foreground/80">
                    {formatPrice(campaign.currentAmount)} raised
                  </span>
                  <span className="text-muted-foreground">
                    of {formatPrice(campaign.targetAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full rounded-[16px] bg-blue-50/50 border-none transition-colors duration-500 overflow-hidden flex flex-col">
            <div className="relative w-full h-60 rounded-[16px] overflow-hidden">
              <Image
                src={campaign.image}
                alt={campaign.title}
                fill
                className="object-cover w-full h-full"
              />
            </div>

            <div className="py-2 px-4 flex-1 flex flex-col">
              <div className="text-xs flex justify-start space-x-1 items-center mb-1 text-[#666666]">
                <Clock className="w-3 h-3" />
                <span>Draft</span>
              </div>

              <h3 className="font-semibold line-clamp-1 mb-2">
                {campaign.title}
              </h3>

              <Button
                variant="outline"
                className="rounded-xl py-2 md:!px-6 text-xs !px-4 cursor-pointer w-fit"
              >
                <CiEdit className="mr-1" />
                Edit
              </Button>
            </div>
          </div>
        )}
      </article>

      <div className="block md:hidden">
        <MobileDraftCard campaignData={campaignData} status={status} />
      </div>
    </>
  );
};

export default Draftcard;
