import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ChangeNetwork from "@/components/wallet_connect/changeNetwork";
import { useNetworkChange } from "@/components/wallet_connect/hooks/useNetworkChange";
import { ReturnCampaignDocument } from "@/types/api";
import { useState } from "react";
import { toast } from "sonner";

function EndCampaignDialog({
  campaign,
  handleEndCampaign,
}: {
  campaign: ReturnCampaignDocument;
  handleEndCampaign: (
    campaignAddress: string,
    id: string,
    networkId: string,
    cb: () => void
  ) => void;
}) {
  const { selectedNetwork, handleSwitchChain } = useNetworkChange();
  const [ending, setIsEnding] = useState(false);

  const chains = campaign.chains;

  const handleEnd = () => {
    if (!campaign.campaignAddresses)
      return toast.error("Cannot end this campaign");

    if (!selectedNetwork)
      return toast.error(
        "Please select a deployed network to end the campaign"
      );
    setIsEnding(true);
    handleEndCampaign(
      campaign.campaignAddresses[selectedNetwork].campaignAddress,
      campaign.cmid,
      selectedNetwork,
      () => {
        setIsEnding(false);
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger onClick={(e) => e.stopPropagation()}>
        End campaign
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="sm:max-w-sm"
      >
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently end your
            campaign and prevent further donations.
          </DialogDescription>
        </DialogHeader>

        <div className="flex">
          <ChangeNetwork
            chains={chains}
            selectedNetwork={selectedNetwork}
            handleSwitchChain={handleSwitchChain}
          />
        </div>

        <DialogFooter>
          <Button onClick={handleEnd} variant={"destructive"} disabled={ending}>
            {ending ? "Ending campaign..." : "End"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default EndCampaignDialog;
