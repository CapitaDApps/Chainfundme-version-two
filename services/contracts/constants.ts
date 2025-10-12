import { base, baseSepolia, bsc, bscTestnet } from "wagmi/chains";

type NetworkContractType = {
  [key: string]: {
    fundingFactoryAddress: string;
  };
};

export const networkContractAddresses: NetworkContractType = {
  [base.id.toString()]: {
    fundingFactoryAddress: "0x172Eb2E64b7B8fB085e615Bb249D354455138BBF",
  },
  [baseSepolia.id.toString()]: {
    fundingFactoryAddress: "0xB6D80DafEe61a8E05c05E539Df1a1910392ddA9B",
  },
  [bsc.id.toString()]: {
    fundingFactoryAddress: "0x172Eb2E64b7B8fB085e615Bb249D354455138BBF",
  },
  [bscTestnet.id.toString()]: {
    fundingFactoryAddress: "0xDA132466373e3dF28d61419fCc045A6f10f7cCD8",
  },
};

export const contractEvents = {
  FundingFactory: {
    ChainFundMeCreated: "ChainFundMeCreated",
    CampaignFunded: "ChainFundMeFunded",
  },

  ChainFundMe: {
    Deposited: "Deposited",
    WithdrawnToken: "WithdrawnToken",
    FailedOtherTokensWithdrawal: "FailedOtherTokensWithdrawal",
    EndedCampaign: "EndedCampaign",
  },

  token: {
    Approval: "Approval",
  },
};

export const newEvents = {
  FundingFactory: {
    ChainFundMeCreated: "ChainFundMeCreated",
    CampaignFunded: "ChainFundMeFunded",
    CampaignEnded: "ChainFundMeEnded",
    ChainFundMeAllFundsWithdrawn: "ChainFundMeAllFundsWithdrawn",
  },
};
