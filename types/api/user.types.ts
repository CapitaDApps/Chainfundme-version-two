import { CampaignDocument } from "./campaign.types";

export type UserDocument = {
  privyId: string;
  name: string;
  email?: string;
  walletAddress: string;
  profilePicture: string;
  bio: string;
  createdCampaigns: CampaignDocument[];
  supportedCampaigns: string[];
  role: string;
  isVerified: boolean;
  socialLinks: string[];
  followers: number;
};
