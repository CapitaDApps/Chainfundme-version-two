"use client";

import CampaignPhotos from "../../create-campaign/form/form/CampaignPhotos";
import { FormSchema } from "@/lib/schemas";
import { useFormContext } from "react-hook-form";
import z from "zod";

function Profileform() {
  type FormData = z.infer<typeof FormSchema>;
  const { control } = useFormContext<FormData>();
  return (
    <div>
      <div>
        <div className="border border-[#E2E2E2] rounded-2xl bg-[#F4F9FC]">
          <CampaignPhotos control={control} />
        </div>
      </div>
    </div>
  );
}
export default Profileform;
