import { ReturnCampaignDocument } from "./campaign.types";

export type UserDocument = {
  privyId: string;
  name: string;
  email?: string;
  walletAddress: string;
  profilePicture: string;
  bio: string;
  createdCampaigns: ReturnCampaignDocument[];
  supportedCampaigns: string[];
  role: string;
  isVerified: boolean;
  socialLinks: Map<string, string>;
  followers: number;
};
