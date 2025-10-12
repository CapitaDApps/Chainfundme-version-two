"use client";
import React, { useEffect } from "react";
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
import { ChainDocument } from "@/types/api";
import { useNetworkTokens } from "@/services/api/hooks/token/useNetworkTokens";
import { useSwitchChain } from "wagmi";

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
  array: ChainDocument[];
}

export default function SelectNetwork({
  control,
  name,
  placeholder,
  setValue,
  array,
}: FormInput) {
  const { switchChain } = useSwitchChain();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="w-full flex-1 flex justify-center items-center">
            <Select
              onValueChange={(val) => {
                setValue("tokens", []);
                switchChain({ chainId: +val });
                return field.onChange(val);
              }}
            >
              <FormControl>
                <SelectTrigger className=" !py-5 cursor-pointer  w-full lg:w-full bg-primary/5 outline-primary/30 outline focus-visible:outline-primary  p-3 text-xs text-black  data-[placeholder]:text-gray-500">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[160px] bg-[#fff] border border-primary/30">
                {array.map((select) => (
                  <SelectItem
                    className="cursor-pointer text-xs hover:bg-primary hover:text-white"
                    key={select.networkId}
                    value={select.networkId.toString()}
                  >
                    <Image
                      src={select.imagePath}
                      alt={select.symbol}
                      width={20}
                      height={20}
                      className="inline-block mr-2"
                    />
                    {select.chain}
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
