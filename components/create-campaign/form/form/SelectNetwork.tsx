"use client";
import React from "react";
import {
  Control,
  FieldPath,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { z } from "zod";
import Image from "next/image";
import { FormSchema } from "@/lib/schemas";
import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NetworkOption {
  name: string;
  value: string;
  image: string;
  label?: string;
}

interface FormInput {
  control: Control<z.infer<typeof FormSchema>>;
  name: FieldPath<z.infer<typeof FormSchema>>;
  setValue: UseFormSetValue<z.infer<typeof FormSchema>>;
  watch: UseFormWatch<z.infer<typeof FormSchema>>;
  label: string;
  placeholder: string;
  array: NetworkOption[];
}

export default function SelectNetwork({
  control,
  name,
  placeholder,
  setValue,
  array,
}: FormInput) {
  const solanaTokens: z.infer<typeof FormSchema>["tokens"] = ["usdc", "usdt"];
  const baseTokens: z.infer<typeof FormSchema>["tokens"] = [
    "usdc",
    "cngn",
    "eth(base)",
  ];
  const bnbTokens: z.infer<typeof FormSchema>["tokens"] = ["usdt"];

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="w-full flex-1 flex justify-center items-center">
            <Select
              onValueChange={(val) => {
                if (val === "solana") {
                  setValue("tokens", solanaTokens);
                }
                if (val === "base") {
                  setValue("tokens", baseTokens);
                }
                if (val === "bnb") {
                  setValue("tokens", bnbTokens);
                }
                return field.onChange(val);
              }}
            >
              <FormControl>
                <SelectTrigger className=" !py-5 rounded-l-[6px] rounded-r-none cursor-pointer   w-full lg:w-full bg-primary/5 outline-primary/30 outline focus-visible:outline-primary  p-3 text-xs text-black  data-[placeholder]:text-gray-500">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[160px] bg-[#fff] border border-primary/30">
                {array.map((select) => (
                  <SelectItem
                    className="cursor-pointer text-xs hover:bg-primary hover:text-white"
                    key={select.value}
                    value={select.value}
                  >
                    <Image
                      src={select.image}
                      alt={`${select.label ?? select.name} icon`}
                      width={20}
                      height={20}
                      className="inline-block mr-2"
                    />
                    {select.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
