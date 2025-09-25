import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath } from "react-hook-form";
import z from "zod";
import { FormSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
interface FormInput {
  control: Control<z.infer<typeof FormSchema>>;
  name: FieldPath<z.infer<typeof FormSchema>>;
  placeholder: string;
  icon: React.ReactElement;
}

export default function SocialsInput({ control, name, icon }: FormInput) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="w-full flex justify-center items-center">
            <FormControl>
              <div
                className="flex items-center gap-1.5 text-zinc-600 transition-all duration-500
  bg-[#1E5AA8]/5 
  focus-within:border-[#1E5AA8] focus-within:border w-full
  rounded-md px-3 py-2 "
              >
                <div>{icon}</div>
                <Input
                  className="w-full placeholder:text-xs placeholder:text-zinc-500 rounded-none
      outline-none  text-xs text-sidebar-content p-0"
                  {...field}
                  type="text"
                />
              </div>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
