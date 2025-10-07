import React from "react";
import { CampaignTokens } from "./CampignTokens";
import z from "zod";
import {
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import SelectNetwork from "./SelectNetwork";
import Image from "next/image";
import { FormSchema } from "@/lib/schemas";
import { useChains } from "@/services/api/hooks/chain/useChains";
import { useNetworkTokens } from "@/services/api/hooks/token/useNetworkTokens";
interface FormInput {
  control: Control<z.infer<typeof FormSchema>>;
  getValues: UseFormGetValues<z.infer<typeof FormSchema>>;
  setValue: UseFormSetValue<z.infer<typeof FormSchema>>;
  watch: UseFormWatch<z.infer<typeof FormSchema>>;
}

const baseToks = [
  { label: "FRENCHIE", value: "frenchie", image: "/tokens/frenchie.svg" },
  { label: "ENB", value: "enb", image: "/tokens/enb.svg" },
  { label: "Bhusky", value: "bhusky", image: "/tokens/bhusky.svg" },
  { label: "Eth(base)", value: "eth(base)", image: "/tokens/eth.svg" },
  { label: "USDC", value: "usdc", image: "/tokens/usdc.svg" },
  { label: "CNGN", value: "cngn", image: "/tokens/cngn.svg" },
];
const solToks = [
  { label: "UNICOIN", value: "unicoin", image: "/tokens/unicorn.svg" },
  { label: "CNGN", value: "cngn", image: "/tokens/cngn.svg" },
  { label: "USDC", value: "usdc", image: "/tokens/usdc.svg" },
  { label: "USDT", value: "usdt", image: "/tokens/usdt.svg" },
];
const bnbToks = [
  { label: "BNB", value: "bnb", image: "/tokens/binance.svg" },
  { label: "ETH", value: "eth", image: "/tokens/eth.svg" },
  { label: "USDT", value: "usdt", image: "/tokens/usdt.svg" },
];
export default function ChainSelect({
  control,
  getValues,
  setValue,
  watch,
}: FormInput) {
  const { chains } = useChains();

  const network = watch("chain");
  const tokens = watch("tokens") || [];

  console.log({ tokens });

  const { defaultTokens } = useNetworkTokens();
  const defaultTokenAddresses = defaultTokens.map((token) => token.address);

  const { tokens: networkTokens } = useNetworkTokens();
  const allTokens = [...defaultTokenAddresses, ...tokens];
  const findToken = allTokens
    .map((token) => networkTokens.find((x) => x.address === token))
    .filter((token) => token !== undefined);

  return (
    <div className="space-y-1">
      <p className="text-xs text-[var(--form-label)] font-normal">
        Network & Chain
      </p>
      <div className="flex gap-2 w-full cursor-pointer  mx-auto">
        <SelectNetwork
          control={control}
          name="chain"
          label="Creator Type"
          placeholder="Select Chain"
          setValue={setValue}
          watch={watch}
          array={chains}
        />
        <CampaignTokens
          networkTokens={networkTokens}
          getValues={getValues}
          setValue={setValue}
          watch={watch}
          control={control}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {findToken.map((token) => (
          <div
            className="flex items-center gap-1 text-xs rounded-full bg-primary/10 border border-primary/50 font-medium px-2 py-1"
            key={token?.address}
          >
            <Image
              src={token.imagePath || ""}
              alt={`${token.symbol} icon`}
              width={20}
              height={20}
            />
            {token.name}
          </div>
        ))}
      </div>
    </div>
  );
}
