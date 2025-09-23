import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DraftCardProps } from "@/types/campaign";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Draftcard = ({ campaign, status }: DraftCardProps) => {
  return (
    <article className="w-full h-full">
      <div className="w-full h-full max-w-[330px] min-h-[260px] rounded-[16px] bg-blue-50/50 border-none transition-colors duration-500 overflow-hidden flex flex-col">
        <div className="relative w-full h-50">
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            className="object-cover w-full h-full"
          />
        </div>

        <div className="py-2 px-4 flex-1 flex flex-col">
          <div
            className={`text-xs flex justify-end space-x-1 items-center mb-1 ${
              status === "completed" ? "text-green-600" : "text-[#666666]"
            }`}
          >
            {status === "draft" ? (
              <>
                <Clock className="w-3 h-3" />
                <span>{campaign.timeleft}</span>
              </>
            ) : status === "active" ? (
              <>
                <IoIosCheckmarkCircle className="w-3 h-3 text-blue-600" />
                <span>Active</span>
              </>
            ) : (
              <>
                <IoIosCheckmarkCircle className="w-3 h-3 text-green-600" />
                <span>Completed</span>
              </>
            )}
          </div>

          <h3 className="font-semibold line-clamp-1 mb-2">{campaign.title}</h3>

          <div className="space-y-2">
            <Progress
              value={
                status === "completed"
                  ? 100
                  : status === "draft"
                  ? 4
                  : status === "active"
                  ? 43
                  : 0
              }
              className={`h-2 ${
                status === "completed"
                  ? "[&>div]:bg-green-500"
                  : "[&>div]:bg-blue-500"
              }`}
            />
            <div className="flex justify-end space-x-1 items-center text-xs">
              <span className="text-muted-foreground/80">
                {campaign.fundrasied} raised
              </span>
              <span className="text-muted-foreground">
                of {campaign.fundtarget}
              </span>
            </div>
          </div>

          <div
            className={`flex flex-row justify-between items-center py-1 ${
              ["completed", "active"].includes(status)
                ? "flex items-center justify-center pt-2"
                : ""
            }`}
          >
            <Button
              variant="outline"
              className={`rounded-2xl shadow-lg/20 py-2 !px-6 disabled:cursor-not-allowed cursor-pointer ${
                ["completed", "active"].includes(status) ? "hidden" : ""
              }`}
            >
              <CiEdit className="mr-1" />
              Edit
            </Button>
            {status === "draft" ? (
              <Button
                style={{
                  background:
                    "linear-gradient(180deg, #1E5AA8 0%, #2379BC 100%)",
                }}
                className="rounded-2xl cursor-pointer shadow-lg/20 px-6 py-2"
              >
                Post now
              </Button>
            ) : (
              <Link href={`/my-campaigns/${campaign.id}`} className="block">
                <Button
                  style={{
                    background:
                      "linear-gradient(180deg, #1E5AA8 0%, #2379BC 100%)",
                  }}
                  className="rounded-2xl cursor-pointer shadow-lg/20 px-6 py-2"
                >
                  View now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Draftcard;
