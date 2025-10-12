import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatNumber, formatTimeLeft } from "@/lib/utils";
import { DraftCardProps } from "@/types/campaign";
import { Clock, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import MobileDraftCard from "./MobileCard";
import { useUserProfile } from "@/services/api/hooks/user/useUserProfile";
import CampaignMenu from "./MyCampaign/campaignMenu";
import { useWriteCampaign } from "@/services/contracts/hooks/useWriteCampaign";
import { usePublish } from "@/services/api/hooks/campaign/usePublish";
import { toast } from "sonner";
import { useChains } from "@/services/api/hooks/chain/useChains";
import { useWriteChainFundMeContract } from "@/services/contracts/hooks/useWriteChainFundMeContract";
import { useWriteFundingFactory } from "@/services/contracts/hooks/useWriteFundingFactory";
import { useEndCampaign } from "@/services/api/hooks/campaign/useEndCampaign";
import { useWatchFactoryEvents } from "@/services/contracts/hooks/events/useWatchFactoryEvents";
import { contractEvents } from "@/services/contracts/constants";

const Draftcard = ({ campaignData, status }: DraftCardProps) => {
  const router = useRouter();

  const { userProfile } = useUserProfile();
  const { createChainFundMe } = useWriteCampaign();
  const { publish, publishing } = usePublish();
  const { chains: allNetworks } = useChains();

  const writeToFactory = useWriteFundingFactory();
  const { endCampaignMutation, endingCampaign } = useEndCampaign();

  const isClickable = status !== "draft";
  const campaign = campaignData.campaign;
  const amountFunded = campaignData.amount;

  const chains = campaign.chains;

  const userId = userProfile ? userProfile._id : "";
  const owned = userId == String(campaign.owner);

  const handleClick = (campaignId: string) => {
    router.push(`/campaign/${campaignId}`);
  };

  const handleReDeploy = (networkId: string, tokens: string[]) => {
    const startTime = Math.floor(new Date(campaign.startDate).getTime() / 1000);
    const endTime = Math.floor(new Date(campaign.endDate).getTime() / 1000);
    if (startTime >= endTime || startTime <= Date.now() / 1000) return;
    const redeployedChain = allNetworks.find(
      (network) => network.networkId === +networkId
    );
    console.log("Publishing...");
    createChainFundMe(
      {
        uri: campaign.cmid,
        startTime,
        endTime,
        otherTokens: tokens,
      },
      (err) => {
        if (err) {
          toast.error(
            `Couldn't publish campaign to ${redeployedChain?.chain}, please try again`
          );
          return;
        }
        console.log("CB called??");
        publish(
          { campaignId: campaign.cmid, tokens, networkId: +networkId },
          {
            onSuccess: () => {
              toast.success(
                `Successfully published campaign ${redeployedChain?.chain}`
              );
            },
          }
        );
      }
    );
  };

  const handleEndCampaign = (
    campaignAddress: string,
    id: string,
    networkId: string,
    cb: () => void
  ) => {
    writeToFactory("chainFundMe_endCampaign", [campaignAddress], {
      onSuccess: async () => {
        endCampaignMutation(
          { campaignId: id, networkId },
          { onSettled: () => cb() }
        );
      },
      onError: (err: { message: string }) => {
        console.log({ err });
        toast.error("Failed on contract call");
      },

      onSettled: () => cb(),
    });
  };

  const handleWithdrawCampaignFunds = async (campaignAddress: string) => {
    try {
      await writeToFactory("chainFundMe_withdrawAllFunds", [campaignAddress]);
      toast.success("Withdrawal Tx sent successfully");
    } catch (error) {
      toast.error("Error withdrawing...");
      console.log(error);
    }
  };

  return (
    <>
      <article className="w-full h-full hidden md:block">
        {isClickable ? (
          <div className="w-full h-fit rounded-[16px] bg-blue-50/50 border-none transition-colors duration-500 overflow-hidden flex flex-col hover:shadow-md cursor-pointer">
            <div className="relative w-full h-60 rounded-[16px] overflow-hidden">
              <Image
                src={campaign.image}
                alt={campaign.title}
                fill
                className="object-cover w-full h-full"
                onClick={() => handleClick(campaign.cmid)}
              />

              {owned && (
                <CampaignMenu
                  status={status}
                  campaign={campaign}
                  handleReDeploy={handleReDeploy}
                  handleEndCampaign={handleEndCampaign}
                  handleWithdrawCampaignFunds={handleWithdrawCampaignFunds}
                />
              )}
            </div>

            <div
              className="py-2 px-4 flex-1 flex flex-col"
              onClick={() => handleClick(campaign.cmid)}
            >
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
                <div className="*:data-[slot=avatar]:ring-background flex gap-2 flex-wrap -space-x-2 *:data-[slot=avatar]:ring-2">
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
                  <span className="text-muted-foreground">
                    ${formatNumber(campaign.currentAmount)} raised
                  </span>
                  <span className="text-muted-foreground">
                    of ${formatNumber(campaign.targetAmount)}
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
        <MobileDraftCard
          campaignData={campaignData}
          status={status}
          handleEndCampaign={handleEndCampaign}
          handleReDeploy={handleReDeploy}
          handleWithdrawCampaignFunds={handleWithdrawCampaignFunds}
        />
      </div>
    </>
  );
};

export default Draftcard;
