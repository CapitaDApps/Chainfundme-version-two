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
  const chain = [
    {
      value: "base",
      name: "Base",
      image: "/tokens/base.svg",
    },
    {
      value: "solana",
      name: "Solana",
      image: "/tokens/solana.svg",
    },
    {
      value: "bnb",
      name: "BNB",
      image: "/tokens/binance.svg",
    },
  ];

  const network = watch("chain");
  const tokens = watch("tokens");

  const chains = !network
    ? []
    : network === "base"
    ? baseToks
    : network === "solana"
    ? solToks
    : bnbToks;

  const findToken = tokens?.map((token) =>
    chains.find((x) => x.value === token)
  );
  return (
    <div className="space-y-1">
      <p className="text-xs text-[var(--form-label)] font-normal">
        Network & Chain
      </p>
      <div className="flex w-ful cursor-pointer w-[98%]  mx-auto">
        <SelectNetwork
          control={control}
          name="chain"
          label="Creator Type"
          placeholder="Select Chain"
          setValue={setValue}
          watch={watch}
          array={chain}
        />
        <CampaignTokens
          chains={chains}
          getValues={getValues}
          setValue={setValue}
          watch={watch}
          control={control}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {findToken?.map((token) => (
          <div
            className="flex items-center gap-1 text-xs rounded-full bg-primary/10 border border-primary/50 font-medium px-2 py-1"
            key={token?.label}
          >
            <Image
              src={token?.image || ""}
              alt={`${token?.label} icon`}
              width={20}
              height={20}
            />
            {token?.label}
          </div>
        ))}
      </div>
    </div>
  );
}
