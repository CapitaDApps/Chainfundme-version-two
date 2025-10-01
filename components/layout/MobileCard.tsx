import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DraftCardProps } from "@/types/campaign";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { IoIosCheckmarkCircle } from "react-icons/io";

const MobileDraftCard = ({ campaign, status }: DraftCardProps) => {
  const isClickable = status !== "draft";

  const renderStatus = () => {
    if (status === "explore") {
      return (
        <>
          <Clock className="w-3 h-3" />
          <span>3days left</span>
        </>
      );
    }
    if (status === "draft") {
      return (
        <>
          <Clock className="w-3 h-3" />
          <span>Draft</span>
        </>
      );
    }
    if (status === "active") {
      return (
        <>
          <IoIosCheckmarkCircle className="w-3 h-3 text-blue-600" />
          <span>Active</span>
        </>
      );
    }
    return (
      <>
        <IoIosCheckmarkCircle className="w-3 h-3 text-green-600" />
        <span>Completed</span>
      </>
    );
  };

  const renderButtons = () => {
    if (status === "draft") {
      return (
        <div className="flex items-center justify-start gap-3 pt-4">
          <Button
            variant="outline"
            className="rounded-2xl shadow-md py-1 px-2 text-[10px] md:py-2 md:px-6 md:text-sm"
          >
            <CiEdit className="mr-1 w-3 h-3 md:w-4 md:h-4" />
            Edit
          </Button>
        </div>
      );
    }

    return (
      <div className=" justify-start pt-2 hidden">
        <Button
          disabled
          className="rounded-2xl cursor-not-allowed shadow-md py-2 px-2 text-[10px] md:py-2 md:px-6 md:text-sm bg-gray-400 text-gray-200"
        >
          View now
        </Button>
      </div>
    );
  };

  return (
    <article className="block md:hidden w-full">
      {isClickable ? (
        // Clickable card - entire card is a link
        <Link href={`/my-campaigns/${campaign.id}`} className="block w-full">
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
                  status === "completed" ? "text-green-600" : "text-[#666666]"
                }`}
              >
                {renderStatus()}
              </div>
              <h3 className="font-bold line-clamp-2 mb-2 text-sm max-w-50">
                {campaign.title}
              </h3>
              <div className="space-y-2">
                <Progress
                  value={status === "completed" ? 100 : 43}
                  className={`h-2 ${
                    status === "completed"
                      ? "[&>div]:bg-green-500"
                      : "[&>div]:bg-blue-500"
                  }`}
                />
                <div className="flex justify-start space-x-1 items-center text-[10px]">
                  <span className="text-muted-foreground/80">
                    {campaign.fundrasied} raised
                  </span>
                  <span className="text-muted-foreground">
                    of {campaign.fundtarget}
                  </span>
                </div>
              </div>
              {renderButtons()}
            </div>
          </div>
        </Link>
      ) : (
        // Non-clickable card - draft status with edit button
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
                className="rounded-2xl shadow-md py-1 px-2 text-[10px] md:py-2 md:px-6 md:text-sm"
              >
                <CiEdit className="mr-1 w-3 h-3 md:w-4 md:h-4" />
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