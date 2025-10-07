import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatNumber, formatTimeLeft } from "@/lib/utils";
import { DraftCardProps } from "@/types/campaign";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import MobileDraftCard from "./MobileCard";

const Draftcard = ({ campaignData, status }: DraftCardProps) => {
  const isClickable = status !== "draft";
  const router = useRouter();

  const handleClick = (campaignId: string) => {
    router.push(`/campaign/${campaignId}`);
  };
  const campaign = campaignData.campaign;
  const amountFunded = campaignData.amount;

  const chains = campaign.chains;

  return (
    <>
      <article className="w-full h-full hidden md:block">
        {isClickable ? (
          <div
            className="w-full h-fit rounded-[16px] bg-blue-50/50 border-none transition-colors duration-500 overflow-hidden flex flex-col hover:shadow-md cursor-pointer"
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
                    <div
                      key={i}
                      className="py-2 px-3 bg-gray-100 rounded-3xl flex text-xs items-center gap-2"
                    >
                      <Image
                        src={chain.imagePath}
                        alt={chain.symbol}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <p className="text-secondary-text mt-1">
                        {chain.symbol.toUpperCase()}
                      </p>
                    </div>
                  ))}
                </div>
                {amountFunded && (
                  <p className="text-xs text-green-600">
                    Donated ${formatNumber(amountFunded)}
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
                    {formatNumber(campaign.currentAmount)} raised
                  </span>
                  <span className="text-muted-foreground">
                    of {formatNumber(campaign.targetAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-fit rounded-[16px] bg-blue-50/50 border-none transition-colors duration-500 overflow-hidden flex flex-col hover:shadow-md">
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
                <span className="mt-1">Draft</span>
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
