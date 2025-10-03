import { getBalance, readContract } from "@wagmi/core";
import TokenABI from "./abi/Token.json";
import { config } from "@/lib/networks/config";
import { formatEther } from "viem";
import { getTokenAddress, tokenNames } from "./tokensConfig";

async function getCoinBalance(
  coin: string,
  address: string | undefined
): Promise<string> {
  if (
    coin.toLowerCase() == tokenNames.eth.toLowerCase() ||
    coin.toLowerCase() == tokenNames.bsc.toLowerCase()
  ) {
    const data = await getBalance(config, {
      address: address as `0x${string}`,
    });
    console.log({ data });
    const numList = formatEther(data.value).split(".");
    return `${numList[0]}${numList[1] ? "." + numList[1].slice(0, 5) : ""}`;
  }
  // ERC 20
  const tokenAddress = getTokenAddress(coin);
  if (tokenAddress) {
    const result = await readContract(config, {
      address: tokenAddress as `0x${string}`,
      abi: TokenABI,
      functionName: "balanceOf",
      args: [address],
    });

    const numList = formatEther(result as bigint).split(".");
    return `${numList[0]}${numList[1] ? "." + numList[1].slice(0, 5) : ""}`;
  }

  return "0";
}

export { getCoinBalance };
