import { UserDocument } from "./user.types";
import { CommentDocument } from "./comment.types";

export type ReplyCommentDocument = {
  _id: string;
  user: UserDocument;
  comment: CommentDocument;
  reply: string;
  likes: number;
  createdAt: string;
};
export type Reply = {
  _id?: string;
  id: number;
  name: string;
  date: string;
  text: string;
  likes: number;
};
