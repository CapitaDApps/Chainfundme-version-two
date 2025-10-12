import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Status } from "@/types/campaign";
import { EllipsisVertical } from "lucide-react";

import { ReturnCampaignDocument } from "@/types/api";
import DeployToOtherChainsDialog from "./deployToOtherChainsDialog";
import EndCampaignDialog from "./endCampaignDialog";
import WithdrawDialog from "./withdrawDialog";

type CampaignMenuProps = {
  campaign: ReturnCampaignDocument;
  status: Status;
  className?: string;
  size?: number;
  handleReDeploy: (networkId: string, tokens: string[]) => void;
  handleEndCampaign: (
    campaignAddress: string,
    id: string,
    networkId: string,
    cb: () => void
  ) => void;
  handleWithdrawCampaignFunds: (campaignAddress: string) => void;
};

function CampaignMenu({
  campaign,
  status,
  className = "",
  size,
  handleReDeploy,
  handleEndCampaign,
  handleWithdrawCampaignFunds,
}: CampaignMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn("absolute z-20 bg-white px-3 py-2 rounded", className)}
        >
          <EllipsisVertical size={size} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4">
        <DropdownMenuLabel className="line-clamp-1 font-semibold">
          {campaign.title}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {status == "pending" && (
          <DropdownMenuItem>
            <DeployToOtherChainsDialog
              campaign={campaign}
              handleReDeploy={handleReDeploy}
            />
          </DropdownMenuItem>
        )}
        {status == "active" && (
          <DropdownMenuItem>
            <EndCampaignDialog
              campaign={campaign}
              handleEndCampaign={handleEndCampaign}
            />
          </DropdownMenuItem>
        )}
        {status == "completed" && (
          <DropdownMenuItem>
            <WithdrawDialog
              campaign={campaign}
              handleWithdrawCampaignFunds={handleWithdrawCampaignFunds}
            />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default CampaignMenu;
