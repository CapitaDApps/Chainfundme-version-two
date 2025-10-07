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
import { TokenDocument } from "@/types/api";
import { useNetworkTokens } from "@/services/api/hooks/token/useNetworkTokens";

interface FormInput {
  control: Control<z.infer<typeof FormSchema>>;
  getValues: UseFormGetValues<z.infer<typeof FormSchema>>;
  setValue: UseFormSetValue<z.infer<typeof FormSchema>>;
  watch: UseFormWatch<z.infer<typeof FormSchema>>;
  networkTokens: TokenDocument[];
}
export function CampaignTokens({
  control,
  watch,
  getValues,
  setValue,
  networkTokens,
}: FormInput) {
  const value = watch("tokens");
  const { defaultTokens } = useNetworkTokens();
  console.log({ networkTokens, defaultTokens });
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
                    {networkTokens.map((token) => (
                      <CommandItem
                        disabled={defaultTokens.some(
                          (defaultToken) =>
                            token.address === defaultToken.address
                        )}
                        value={token.address}
                        key={token.address}
                        className="hover:bg-primary hover:text-white cursor-pointer text-xs"
                        onSelect={() => {
                          const current = getValues("tokens") || [];
                          if (current.includes(token.address)) {
                            setValue(
                              "tokens",
                              current.filter((val) => val !== token.address)
                            );
                          } else {
                            setValue("tokens", [...current, token.address]);
                          }
                        }}
                      >
                        <Image
                          src={token.imagePath}
                          alt={`${token.symbol} icon`}
                          width={20}
                          height={20}
                        />
                        {token.name}
                        <Check
                          className={
                            watch("tokens")?.includes(token.address)
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
