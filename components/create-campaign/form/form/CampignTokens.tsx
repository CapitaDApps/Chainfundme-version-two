"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import Image from "next/image";
import { FormSchema } from "@/lib/schemas";

interface FormInput {
  control: Control<z.infer<typeof FormSchema>>;
  getValues: UseFormGetValues<z.infer<typeof FormSchema>>;
  setValue: UseFormSetValue<z.infer<typeof FormSchema>>;
  watch: UseFormWatch<z.infer<typeof FormSchema>>;
  chains: { [keys: string]: string }[];
}
export function CampaignTokens({
  control,
  watch,
  getValues,
  setValue,
  chains,
}: FormInput) {
  const value = watch("tokens");
  const dis = ["usdc", "usdt", "cngn", "eth(base)"];
  return (
    <FormField
      control={control}
      name="tokens"
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl className="flex justify-between">
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "!w-full  !py-5 bg-primary/5 border-none outline-primary/30 outline focus-visible:outline-primary  cursor-pointer  rounded-[8px text-xs",
                    !field.value && "text-gray-500 font-normal"
                  )}
                >
                  Select Token
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-[180px] md:w-72 !bg-[#fff] border-primary/50 focus:ring-primary/50 p-0">
              <Command>
                <CommandInput placeholder="Search tokens..." className="h-9 " />
                <CommandList>
                  <CommandEmpty>No token found.</CommandEmpty>

                  <CommandGroup className="cursor-pointer max-h-[120px] overflow-y-auto no-scroll">
                    {chains.map((chain) => (
                      <CommandItem
                        disabled={dis.includes(chain.value)}
                        value={chain.label}
                        key={chain.value}
                        className="hover:bg-primary hover:text-white cursor-pointer text-xs"
                        onSelect={() => {
                          const current = getValues("tokens") || [];
                          if (current.includes(chain.value)) {
                            setValue(
                              "tokens",
                              current.filter((val) => val !== chain.value)
                            );
                          } else {
                            setValue("tokens", [...current, chain.value]);
                          }
                        }}
                      >
                        <Image
                          src={chain.image}
                          alt={`${chain.label} icon`}
                          width={20}
                          height={20}
                        />
                        {chain.label}
                        <Check
                          className={
                            watch("tokens")?.includes(chain.value)
                              ? "opacity-100"
                              : "opacity-0"
                          }
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {!value?.length && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
