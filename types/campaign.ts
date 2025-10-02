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
