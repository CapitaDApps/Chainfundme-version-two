"use client";

import React from "react";
import { Camera } from "lucide-react";
import z from "zod";
import { Control } from "react-hook-form";
import Image from "next/image";
import { FormSchema } from "@/lib/Profileschemas";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

interface FormInput {
  control: Control<z.infer<typeof FormSchema>>;
}

export default function AvatarImage({ control }: FormInput) {
  return (
    <FormField
      control={control}
      name="avatar"
      render={({ field }) => (
        <FormItem className="flex w-full items-center flex-col relative">
          <div className="w-[100px] h-[100px] lg:w-[130px] lg:h-[130px] space-y-1 absolute -top-15 md:-top-17 ">
            {/* <div className="ml-3 text-red-500 text-xs md:text-sm">
              <FormMessage />
            </div> */}
            <div className="relative border border-primary/30 w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
              {field.value ? (
                <Image
                  fill
                  src={URL.createObjectURL(field.value)}
                  alt="Avatar"
                  className="object-cover"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-muted" />
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition">
                <label className="cursor-pointer flex items-center justify-center">
                  <div className="bg-black/60 p-2 rounded-full">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files?.[0] && field.onChange(e.target.files[0])
                    }
                  />
                </label>
              </div>
            </div>
          </div>
          <FormMessage className="mt-12 text-red-500 text-xs md:text-sm" />
        </FormItem>
      )}
    />
  );
}
