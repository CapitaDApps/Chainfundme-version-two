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

function WithdrawDialog({
  campaign,
  handleWithdrawCampaignFunds,
}: {
  campaign: ReturnCampaignDocument;
  handleWithdrawCampaignFunds: (campaignAddress: string) => void;
}) {
  const { selectedNetwork, handleSwitchChain } = useNetworkChange();
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const chains = campaign.chains;

  const chain = chains.find((chain) => chain.networkId === +selectedNetwork);

  const ended = campaign.campaignAddresses?.[selectedNetwork]?.ended;

  const handleEnd = () => {
    if (!campaign.campaignAddresses)
      return toast.error("Error withdrawing funds from campaign");

    if (!campaign.campaignAddresses[selectedNetwork].ended)
      return toast.error(
        "Cannot withdraw donations from an ongoing campaign. Please end the campaign first"
      );

    if (!selectedNetwork)
      return toast.error(
        "Please select a deployed network to withdraw from the campaign"
      );
    setIsWithdrawing(true);
    handleWithdrawCampaignFunds(
      campaign.campaignAddresses[selectedNetwork].campaignAddress
    );
  };

  return (
    <Dialog>
      <DialogTrigger onClick={(e) => e.stopPropagation()}>
        Withdraw Donations
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="sm:max-w-sm"
      >
        <DialogHeader>
          <DialogTitle>Withdraw Donations</DialogTitle>
          <DialogDescription>
            You&apos;re about to withdraws donations to this campaign
          </DialogDescription>
        </DialogHeader>

        <div className="flex">
          <ChangeNetwork
            chains={chains}
            selectedNetwork={selectedNetwork}
            handleSwitchChain={handleSwitchChain}
          />
        </div>

        {selectedNetwork && <DialogFooter>
          <Button onClick={handleEnd} disabled={isWithdrawing || !ended}>
            {isWithdrawing
              ? "Withdrawing..."
              : ended
              ? "Withdraw"
              : `campaign on ${chain?.chain} not ended`}
          </Button>
        </DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
export default WithdrawDialog;
