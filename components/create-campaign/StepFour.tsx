import React from "react";
import { useFormContext } from "react-hook-form";

import z from "zod";
import { FormSchema } from "@/lib/schemas";
import CampaignInput from "./form/form/CampaignInput";
import ChainSelect from "./form/form/ChainSelect";

export default function StepFour() {
  type FormData = z.infer<typeof FormSchema>;
  const { control, getValues, setValue, watch } = useFormContext<FormData>();
  return (
    <div className="space-y-10 px-">
      <div className="flex lg:flex-row flex-col justify-between items-center w-full">
        <div className="w-full">
          <CampaignInput
            required={true}
            label="Set Funding Goal"
            placeholder="$"
            control={control}
            textType="number"
            name="amount"
            type="input"
          />
        </div>
        <div className="w-full  flex items-center lg:justify-end"></div>
      </div>
      <ChainSelect
        control={control}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
    </div>
  );
}
