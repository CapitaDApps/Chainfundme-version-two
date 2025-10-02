import { CampaignDocument, TokenDocument, UserDocument } from ".";

export type FunderDocument = {
  funder: UserDocument;
  campaign: CampaignDocument;
  amount: string;
  amountInUsd: number;
  token: TokenDocument;
};
