import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSchema } from "@/lib/schemas";
import React from "react";

import { Control, FieldPath } from "react-hook-form";

import z from "zod";
interface FormInput {
  control: Control<z.infer<typeof FormSchema>>;
  name: FieldPath<z.infer<typeof FormSchema>>;
  label: string;
  placeholder: string;
  array: { [key: string]: string }[];
  required: boolean;
}
export default function CampaignSelect({
  control,
  name,
  label,
  placeholder,
  array,
  required,
}: FormInput) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="lg:w-[80%] w-full min-w-[2px]">
          <FormLabel className="text-xs text-sidebar-content gap-1 font-normal">
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <div className="w-full flex justify-center items-center min-w-[2px]">
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-[] cursor-pointer  w-full  bg-primary/5 outline-primary/30 outline focus-visible:outline-primary rounded-[8px] p-3 text-xs  focus:ring text-black ring-primary/40  data-[placeholder]:text-gray-500 ">
                  <SelectValue placeholder={placeholder} className="" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[160px] bg-[#fff] border border-primary/30 text-[var(--sidebar-content)]">
                {array.map((select) => (
                  <SelectItem
                    className="cursor-pointer text-xs hover:bg-primary hover:text-white"
                    key={select.name}
                    value={select.value}
                  >
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
