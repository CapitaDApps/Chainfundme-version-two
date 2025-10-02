import React from "react";
import { Camera } from "lucide-react";
import z from "zod";
import { Control } from "react-hook-form";
import Image from "next/image";
import { FormSchema } from "@/lib/schemas";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormInput {
  control: Control<z.infer<typeof FormSchema>>;
}

export default function CampaignCoverImage({ control }: FormInput) {
  return (
    <FormField
      control={control}
      name="cover"
      render={({ field }) => (
        <FormItem className="flex w-full items-center  flex-col">
          <div className="w-full space-y-1">
            <div className="flex justify-between items-center">
              <FormLabel className="text-xs  text-sidebar-content font-normal">
                Main Campaign Image<span className="text-red-500">*</span>
              </FormLabel>
              <FormMessage />
            </div>
            <div className="relative border border-primary/30 w-full  h-[150px] lg:h-[200px] rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              {field.value ? (
                <Image
                  fill
                  src={URL.createObjectURL(field.value)}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`relative w-full h-full`}>
                  <div className="absolute w-full z-[1] h-full   rounded-[16px] flex items-center justify-center gap-2" />
                </div>
              )}
              <div className="absolute z-[3]">
                <label className=" rounded-full z-20 cursor-pointer">
                  <div className="bg-black/50 p-2 rounded-full">
                    <Camera className="w-5 h-5   text-white" />
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
        </FormItem>
      )}
    />
  );
}
