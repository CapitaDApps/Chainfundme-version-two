import { UserDocument } from "./user.types";

export type NotificationType =
  | "donation"
  | "follow"
  | "commentLiked"
  | "newComment"
  | "newReply"
  | "replyLiked";

export type NotificationDocument = {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  status: "read" | "unread";
  notifiedUser: UserDocument;
  type: NotificationType;
};
