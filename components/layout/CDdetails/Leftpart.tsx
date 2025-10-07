"use client";

import { allowedChains } from "@/lib/networks/config";
import { formatTimeLeft } from "@/lib/utils";
import { ReturnCampaignDocument } from "@/types/api";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PreviewImages from "./PreviewImages";
import Profile from "./Profile";

function Leftpart({ campaign }: { campaign: ReturnCampaignDocument }) {
  const [expanded, setExpanded] = useState(false);

  const fullText = campaign.description;

  const previewText = fullText.slice(0, 250) + "...";

  const timeLeft = formatTimeLeft(campaign.startDate, campaign.endDate);

  const router = useRouter();

  if (!campaign.published) router.back();

  const deployedChains = campaign.chains.map((chain) => {
    const allowedChain = allowedChains.find(
      (ac) => ac.networkId == chain.networkId
    );
    return {
      name: chain.chain,
      src: allowedChain?.image || "",
    };
  });

  console.log({ deployedChains });

  const firstChain = deployedChains[0];

  return (
    <>
      <div className="w-full h-[350px] md:h-[400px] lg:h-[500px]">
        <Image
          src={campaign.coverImage}
          alt=""
          width={720}
          height={400}
          className="rounded-xl w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center gap-2 text-gray-600 mt-3 bg-gray-100 w-fit px-3 py-2 rounded-2xl">
        <Clock className="w-5 h-5" />
        <span className="text-primary-accent">{timeLeft}</span>
      </div>
      <hr className="border-[#CDCDCD]/40 w-full mt-8" />

      <div className="mt-8 mb-8">
        <Profile owner={campaign.owner} />
      </div>

      <div className="mt-1 md:mt-1 bg-gray-100 px-3 py-2 md:px-5 md:py-5 rounded-2xl">
        <p className="text-xs md:text-sm whitespace-pre-line leading-5 md:leading-7">
          {expanded ? fullText : previewText}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Read less" : "Read more"}
          </span>
        </p>
      </div>

      <div className="md:pt-1 pt-4">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
        />
        <div className="flex flex-row space-x-4 mt-[-10] mb-3 md:mt-4">
          <PreviewImages images={campaign.otherImages} />
        </div>
        <div className="mt-4">
          <div>
            <p className="font-medium">Network</p>
            <div className="flex flex-row gap-2 items-center bg-gray-100 px-3 py-2 rounded-2xl w-fit">
              <Image
                src={firstChain.src}
                alt={firstChain.name}
                width={20}
                height={20}
                className="rounded-full"
              />
              <h3 className="text-xs">{firstChain.name}</h3>
            </div>
          </div>
          <div className="space-y-3">
            {deployedChains.length > 1 && (
              <>
                <div>
                  <p className="text-sm font-medium">
                    Other Accepted Chains for this Campaign
                  </p>
                </div>
                <div className="flex flex-row space-x-2">
                  {deployedChains.slice(1).map((chain, index) => (
                    <div
                      className="flex space-x-2 bg-gray-100 px-3 py-2 rounded-2xl max-w-fit items-center"
                      key={index}
                    >
                      <Image
                        src={chain.src}
                        alt="token"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <p className="text-xs font-semibold">{chain.name}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <hr className="border-[#CDCDCD]/40 w-full my-8" />
      </div>
    </>
  );
}
export default Leftpart;
