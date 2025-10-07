import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatPrice, formatTimeLeft } from "@/lib/utils";
import { DraftCardProps } from "@/types/campaign";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";

const MobileDraftCard = ({ campaignData, status }: DraftCardProps) => {
  const isClickable = status !== "draft";

  const campaign = campaignData.campaign;
  const amountFunded = campaignData.amount;

  const chains = campaign.chains;

  return (
    <article className="block md:hidden w-full">
      {isClickable ? (
        <Link href={`/campaign/${campaign.cmid}`} className="block w-full">
          <div className="w-full max-w-full mx-auto rounded-[16px] bg-blue-50/50 border-none transition-colors duration-500 overflow-hidden flex flex-row hover:shadow-md cursor-pointer">
            <div className="relative w-28 flex-shrink-0">
              <Image
                src={campaign.image}
                alt={campaign.title}
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <div className="flex-1 p-3 flex flex-col min-w-0">
              <div
                className={`text-xs flex justify-start space-x-1 items-center mb-1 ${
                  status == "active"
                    ? "text-blue-600"
                    : status === "completed"
                    ? "text-green-600"
                    : "text-[#666666]"
                }`}
              >
                {formatTimeLeft(campaign.startDate, campaign.endDate)}
              </div>
              <h3 className="font-bold line-clamp-2 mb-2 text-sm max-w-50">
                {campaign.title}
              </h3>
              <div className="flex justify-between items-center pb-1">
                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
                  {chains.map((chain, i) => (
                    <Avatar className="h-4 w-4" key={i}>
                      <AvatarImage src={chain.imagePath} alt="" />
                    </Avatar>
                  ))}
                </div>
                {amountFunded && (
                  <p className="text-[10px] text-green-600">
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
                      : "[&>div]:bg-blue-500"
                  }`}
                />
                <div className="flex justify-start space-x-1 items-center text-[10px]">
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
        </Link>
      ) : (
        <div className="w-full max-w-full mx-auto rounded-[16px] bg-blue-50/50 border-none transition-colors duration-500 overflow-hidden flex flex-row">
          <div className="relative w-28 flex-shrink-0">
            <Image
              src={campaign.image}
              alt={campaign.title}
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="flex-1 p-3 flex flex-col min-w-0">
            <div className="text-xs flex justify-start space-x-1 items-center mb-1 text-[#666666]">
              <Clock className="w-3 h-3" />
              <span>Draft</span>
            </div>
            <h3 className="font-bold line-clamp-2 mb-2 text-sm max-w-50">
              {campaign.title}
            </h3>

            <div className="flex items-center justify-start gap-3 pt-4">
              <Button
                variant="outline"
                className="rounded-xl shadow-md px-2 text-[10px] md:px-6 md:text-sm"
              >
                <CiEdit className="w-3 h-3" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default MobileDraftCard;
