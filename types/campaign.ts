//CampaignCard.tsx
export interface CampaignItem {
  id: number;
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

export interface DraftCardProps {
  campaign: CampaignItem;
  status: "draft" | "active" | "completed" | "explore";
}
