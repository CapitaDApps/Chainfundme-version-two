import { CampaignDocument } from "./campaign.types";
import { UserDocument } from "./user.types";
import { Reply, ReplyCommentDocument } from "./ReplyComment.types";

export type CommentDocument = {
  _id: string;
  campaign: CampaignDocument;
  user: UserDocument;
  comment: string;
  likes: number;
  replies: ReplyCommentDocument[];
  createdAt: string;
};

export type Comment = {
  id: number;
  _id?: string;
  name: string;
  date: string;
  text: string;
  likes: number;
  replies: Reply[];
};
