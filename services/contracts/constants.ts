import { base, baseSepolia, bsc, bscTestnet } from "wagmi/chains";

type NetworkContractType = {
  [key: string]: {
    fundingFactoryAddress: string;
  };
};

export const networkContractAddresses: NetworkContractType = {
  [base.id.toString()]: {
    fundingFactoryAddress: "0x2ce04B8F4838581A3D8CCF3116FC74C75D4214E7",
  },
  [baseSepolia.id.toString()]: {
    fundingFactoryAddress: "0xB6D80DafEe61a8E05c05E539Df1a1910392ddA9B",
  },
  [bsc.id.toString()]: {
    fundingFactoryAddress: "0x65fE10C5620649A3A0E5d65A4B5DE43Bf922fc8C",
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
