import { Token } from "@/types/token.types";
import { zeroAddress } from "viem";
import { base, baseSepolia, bsc, bscTestnet } from "wagmi/chains";
import { getChainId } from "@wagmi/core";
import { config } from "@/lib/networks/config";

export const tokenNames = {
  usdc: "USDC(base)",
  eth: "Eth(base)",
  frenchie: "Frenchie",
  enb: "ENB",
  cngn: "CNGN",
  bhusky: "BHUSKY",
  bsc: "BSC",
  usdt: "USDT",
};

export type TokenType = "default" | "optional";

export type TokenObjectType = {
  name: string;
  src: string;
  type: TokenType;
  decimals: number;
  address: string;
};

const baseTokens: TokenObjectType[] = [
  {
    name: tokenNames.eth,
    src: "/tokens/eth.svg",
    type: "default",
    decimals: 18,
    address: zeroAddress,
  },
  {
    name: tokenNames.usdc,
    src: "/tokens/usdc.svg",
    type: "default",
    decimals: 6,
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
  {
    name: tokenNames.cngn,
    src: "/tokens/cngn.svg",
    type: "optional",
    decimals: 6,
    address: "0x46C85152bFe9f96829aA94755D9f915F9B10EF5F",
  },
  {
    name: tokenNames.frenchie,
    src: "/tokens/frenchie.svg",
    type: "optional",
    decimals: 18,
    address: "0xf42c45e5b79c9564c95a9b8641518a58b0d089de",
  },
  {
    name: tokenNames.enb,
    src: "/tokens/enb.svg",
    type: "optional",
    decimals: 18,
    address: "0xf73978b3a7d1d4974abae11f696c1b4408c027a0",
  },
  {
    name: tokenNames.bhusky,
    src: "/tokens/bhusky.svg",
    type: "optional",
    decimals: 18,
    address: "0x20895E16d5aE9D6e0Ca127ED093a7cBE65dCb018",
  },
];

const baseSepoliaTokens: TokenObjectType[] = [
  {
    name: tokenNames.eth,
    src: "/tokens/eth.svg",
    type: "default",
    decimals: 18,
    address: zeroAddress,
  },
  {
    name: tokenNames.usdc,
    src: "/tokens/usdc.svg",
    type: "default",
    decimals: 6,
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  },
  {
    name: tokenNames.frenchie,
    src: "/tokens/frenchie.svg",
    type: "optional",
    decimals: 18,
    address: "0xc3184FC54B029cfDF86D1Cc393EF9626Cbe270E5",
  },
];

const bscTokens: TokenObjectType[] = [
  {
    name: tokenNames.bsc,
    src: "/tokens/bnb.svg",
    type: "default",
    decimals: 18,
    address: zeroAddress,
  },
  {
    name: tokenNames.usdt,
    src: "/tokens/usdt.svg",
    type: "default",
    decimals: 6,
    address: "0x55d398326f99059ff775485246999027b3197955",
  },
];

const bscTestnetTokens: TokenObjectType[] = [
  {
    name: tokenNames.bsc,
    src: "/tokens/bnb.svg",
    type: "default",
    decimals: 18,
    address: zeroAddress,
  },
  {
    name: tokenNames.usdt,
    src: "/tokens/usdt.svg",
    type: "default",
    decimals: 6,
    address: "0x221c5b1a293aac1187ed3a7d7d2d9ad7fe1f3fb0",
  },
];
const networkTokenConfig = {
  [base.id.toString()]: baseTokens,
  [baseSepolia.id.toString()]: baseSepoliaTokens,
  [bsc.id.toString()]: bscTokens,
  [bscTestnet.id.toString()]: bscTestnetTokens,
};

export function getNetworkTokens(networkId?: number) {
  if (networkId) {
    return networkTokenConfig[networkId.toString()];
  } else {
    const chainId = getChainId(config);
    return networkTokenConfig[chainId.toString()];
  }
}

export function getTokenAddress(tokenName: string) {
  const tokens = getNetworkTokens();

  const tokenAddress = tokens.find(
    (token) => token.name.toLowerCase() == tokenName.toLowerCase()
  )?.address;

  if (!tokenAddress) throw new Error(`${tokenName} not found`);

  return tokenAddress;
}
