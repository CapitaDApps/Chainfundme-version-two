import { ReturnCampaignDocument } from "./api";

//CampaignCard.tsx
export interface CampaignItem {
  id: string;
  image: string;
  timeleft: string;
  title: string;
  creatorimage: string;
  creatorname: string;
  story: string;
  fundrasied: string;
  fundtarget: string;
  category: string;
}

export interface FundraisingCardProps {
  campaign: CampaignItem;
}

//DraftCard.tsx
export type FundedCampaignType = {
  campaign: ReturnCampaignDocument;
  amount?: number;
};

export type Status = "draft" | "active" | "completed" | "pending";

export interface DraftCardProps {
  campaignData: FundedCampaignType;
  status: Status;
}
