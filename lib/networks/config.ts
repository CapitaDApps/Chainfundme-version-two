import { createConfig } from "@privy-io/wagmi";
import { base, baseSepolia, bsc, bscTestnet } from "wagmi/chains";
import { http } from "wagmi";
import { ChainType, NetworkMainnet, NetworkMainnetId } from "./types";

const mainnetConfig = createConfig({
  chains: [base, bsc],

  transports: {
    [base.id]: http(
      `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
    ),

    [bsc.id]: http(),
  },
});

const devConfig = createConfig({
  chains: [baseSepolia, bscTestnet],
  transports: {
    [baseSepolia.id]: http(
      `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
    ),

    [bscTestnet.id]: http(),
  },
});

export const config =
  process.env.NEXT_PUBLIC_PRODUCTION == "true" ? mainnetConfig : devConfig;

export const connectingChain: number[] =
  process.env.NEXT_PUBLIC_PRODUCTION == "true"
    ? [base.id, bsc.id]
    : [baseSepolia.id, bscTestnet.id];

export const getEnvChainId = (network: NetworkMainnet) => {
  switch (network) {
    case "Base":
      return process.env.NEXT_PUBLIC_PRODUCTION == "true"
        ? base.id
        : baseSepolia.id;
    case "BNB Smart Chain":
      return process.env.NEXT_PUBLIC_PRODUCTION == "true"
        ? bsc.id
        : bscTestnet.id;
    default:
      return process.env.NEXT_PUBLIC_PRODUCTION == "true"
        ? base.id
        : baseSepolia.id;
  }
};

export const chains: ChainType[] = [
  {
    value: "Base",
    symbol: "Base",
    image: "/tokens/base.svg",
  },
  {
    value: "BNB Smart Chain",
    symbol: "BSC",
    image: "/tokens/binance.svg",
  },
];
