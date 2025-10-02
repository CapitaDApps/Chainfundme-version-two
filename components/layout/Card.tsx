import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DraftCardProps } from "@/types/campaign";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { IoIosCheckmarkCircle } from "react-icons/io";
import MobileDraftCard from "./MobileCard";

const Draftcard = ({ campaign, status }: DraftCardProps) => {
  const isClickable = status !== "draft";

  return (
    <>
      <article className="w-full h-full hidden md:block">
        {isClickable ? (
          <Link
            href={`/campaign/${campaign.cmid}`}
            className="block w-full h-full"
          >
            <div className="w-full h-full max-w-[330px] min-h-[260px] rounded-[16px] bg-blue-50/50 border-none transition-colors duration-500 overflow-hidden flex flex-col hover:shadow-md cursor-pointer">
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

                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale pb-2 ">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/layout/i1.png" alt="SPC" />
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-6 w-6">
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
                  </Avatar>
                </div>

                <div className="space-y-2">
                  <Progress
                    value={
                      status === "completed"
                        ? 100
                        : status === "active"
                        ? 43
                        : 0
                    }
                    className={`h-2 ${
                      status === "completed"
                        ? "[&>div]:bg-green-500"
                        : "[&>div]:bg-[#003DEF]"
                    }`}
                  />
                  <div className="flex justify-start space-x-1 items-center text-xs pb-2">
                    <span className="text-muted-foreground/80">
                      {campaign.currentAmount} raised
                    </span>
                    <span className="text-muted-foreground">
                      of {campaign.targetAmount}
                    </span>
                  </div>
                </div>
                {/* 
                <div className="flex flex-row justify-center items-center py-1 pt-2">
                  <Button
                    disabled
                    className="rounded-2xl cursor-not-allowed shadow-lg/20 px-6 py-2 bg-gray-400 text-gray-200"
                  >
                    View now
                  </Button>
                </div> */}
              </div>
            </div>
          </Link>
        ) : (
          <div className="w-full h-full max-w-[330px] min-h-[260px] rounded-[16px] bg-blue-50/50 border-none transition-colors duration-500 overflow-hidden flex flex-col">
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
