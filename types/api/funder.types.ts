import {
  ReturnCampaignDocument,
  TokenDocument,
  UserDocument
} from ".";

export type FunderDocument = {
  funder: UserDocument;
  campaign: ReturnCampaignDocument;
  amount: string;
  amountInUsd: number;
  token: TokenDocument;
};
