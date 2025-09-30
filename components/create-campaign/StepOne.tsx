import React from "react";
import { useFormContext } from "react-hook-form";

import z from "zod";
import { FormSchema } from "@/lib/schemas";
import CampaignSelect from "./form/CampaignSelect";
import { category, creator } from "@/lib/constant";
import CampaignInput from "./form/form/CampaignInput";
import DateField from "./Date";

export default function StepOne() {
  type FormData = z.infer<typeof FormSchema>;
  const { control } = useFormContext<FormData>();
  return (
    <div className="space-y-6 sm:space-y-10 max-w-3xl mx-auto">
      <div className="flex lg:flex-row gap-6 flex-col justify-between items-center w-full">
        <div className="w-full">
          <CampaignInput
            required={true}
            label="Campaign Name"
            placeholder="Give your campaign a clear and memorable name"
            control={control}
            textType="text"
            name="campaignName"
            type="input"
          />
        </div>

        <div className="w-full">
          <CampaignSelect
            control={control}
            required={true}
            name="creator"
            label="Creator Type"
            placeholder="Are you an individual, organization, DAO or Startup?"
            array={creator}
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-6 lg:flex-row flex-col w-full">
        <div className="w-full ">
          <div className="gap-2 flex  items-center justify-between">
            <DateField
              control={control}
              required={true}
              label="Start Date"
              name="startDate"
            />
            <DateField
              control={control}
              required={true}
              label="End Date"
              name="endDate"
            />
          </div>
        </div>

        <div className="w-full  flex items-center lg:justify-end">
          <CampaignSelect
            required={true}
            control={control}
            name="category"
            label="Campaign Category"
            placeholder="Select your Campaign Category"
            array={category}
          />
        </div>
      </div>
    </div>
  );
}
