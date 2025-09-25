import React from "react";
import { useFormContext } from "react-hook-form";

import z from "zod";
import { FormSchema } from "@/lib/schemas";
import CampaignInput from "./form/form/CampaignInput";

export default function StepThree() {
  type FormData = z.infer<typeof FormSchema>;
  const { control } = useFormContext<FormData>();
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center w-full">
        <div className="w-full">
          <CampaignInput
            required={true}
            label="Full Description"
            placeholder="Tell Us about your campaign..."
            control={control}
            textType="text"
            name="bio"
            type="textarea"
          />
        </div>
      </div>
    </div>
  );
}
