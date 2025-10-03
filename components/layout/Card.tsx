import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DraftCardProps } from "@/types/campaign";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { IoIosCheckmarkCircle } from "react-icons/io";
import MobileDraftCard from "./MobileCard";
import { formatPrice } from "@/lib/utils";

const Draftcard = ({ campaign, status }: DraftCardProps) => {
  const isClickable = status !== "draft";
  const router = useRouter();

  const handleClick = (campaignId: string) => {
    router.push(`/campaign/${campaignId}`);
  };

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
                className={`text-xs flex justify-start space-x-1 items-center mb-1 ${
                  status === "completed" ? "text-green-600" : "text-[#666666]"
                }`}
              >
                {status === "active" && (
                  <>
                    <IoIosCheckmarkCircle className="w-3 h-3 text-blue-600" />
                    <span>Active</span>
                  </>
                )}
                {status === "completed" && (
                  <>
                    <IoIosCheckmarkCircle className="w-3 h-3 text-green-600" />
                    <span>Ended</span>
                  </>
                )}
                {status === "explore" && (
                  <>
                    <Clock className="w-3 h-3" />
                    <span>3days left</span>
                  </>
                )}
              </div>

              <h3 className="font-semibold line-clamp-1 mb-2">
                {campaign.title}
              </h3>

              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2  pb-2 ">
                {campaign.tokens.map((token) => (
                  <Avatar className="h-6 w-6" key={token.address}>
                    <AvatarImage src={token.imagePath} alt={token.name} />
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                ))}
                {/* <Avatar className="h-6 w-6">
                  <AvatarImage src="/layout/12.png" alt="CLOUDPLEXO" />
                  <AvatarFallback>CL</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/layout/13.png" alt="JAWGULAR" />
                  <AvatarFallback>JA</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/layout/14.png" alt="FRENCHIE" />
                  <AvatarFallback>FR</AvatarFallback>
                </Avatar> */}
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
        <MobileDraftCard campaign={campaign} status={status} />
      </div>
    </>
  );
};

export default Draftcard;
