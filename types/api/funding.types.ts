import { CampaignDocument, UserDocument } from "./";

export type FundingDocument = {
  amount: string;
  funder: UserDocument;
  campaign: CampaignDocument;
};
