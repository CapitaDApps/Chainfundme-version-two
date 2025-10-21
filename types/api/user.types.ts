import { FunderDocument } from ".";
import { ReturnCampaignDocument } from "./campaign.types";
import { NotificationDocument } from "./notification.types";

export type UserDocument = {
  _id: string;
  privyId: string;
  name: string;
  email?: string;
  walletAddress: string;
  profilePicture: string;
  bio: string;
  createdCampaigns: ReturnCampaignDocument[];
  supportedCampaigns: FunderDocument[];
  role: string;
  isVerified: boolean;
  socialLinks: Map<string, string>;
  followers: number;
  usersFollowing: string[]; // Array of user IDs that the current user is following
  notifications: NotificationDocument[];
};
