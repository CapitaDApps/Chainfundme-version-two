import { base, bsc } from "wagmi/chains";

export type NetworkMainnetId = typeof base.id | typeof bsc.id;

export type NetworkMainnet = typeof base.name | typeof bsc.name;

export type ChainType = {
  value: NetworkMainnet;
  image: string;
  symbol: string;
};
