import { base, baseSepolia, bsc, bscTestnet } from "wagmi/chains";

export type NetworkId =
  | typeof base.id
  | typeof bsc.id
  | typeof baseSepolia.id
  | typeof bscTestnet.id;

export type NetworkName =
  | typeof base.name
  | typeof bsc.name
  | typeof baseSepolia.name
  | typeof bscTestnet.name;

export type ChainType = {
  value: NetworkName;
  image: string;
  symbol: string;
  networkId: NetworkId;
};
