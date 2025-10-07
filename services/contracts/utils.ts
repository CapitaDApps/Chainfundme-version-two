import { getBalance, readContract } from "@wagmi/core";
import TokenABI from "./abi/Token.json";
import { config } from "@/lib/networks/config";
import { formatEther, formatUnits, zeroAddress } from "viem";
import { getTokenAddress, tokenNames } from "./tokensConfig";
import { TokenDocument } from "@/types/api";

async function getCoinBalance(
  token: TokenDocument,
  userAddress: string
): Promise<string> {
  if (token.address === zeroAddress) {
    const data = await getBalance(config, {
      address: userAddress as `0x${string}`,
    });
    console.log({ data });
    const numList = formatEther(data.value).split(".");
    return `${numList[0]}${numList[1] ? "." + numList[1].slice(0, 5) : ""}`;
  }

  // ERC 20
  const tokenAddress = token.address;
  const result = await readContract(config, {
    address: tokenAddress as `0x${string}`,
    abi: TokenABI,
    functionName: "balanceOf",
    args: [userAddress],
  });

  const numList = formatUnits(result as bigint, token.decimals).split(".");
  return `${numList[0]}${numList[1] ? "." + numList[1].slice(0, 5) : ""}`;
}

export { getCoinBalance };
