"use client";

import { Control } from "react-hook-form";
import { z } from "zod";

import CampaignCoverImage from "./CampaignCoverImage";
// import CampaignAvatar from "./CampaignAvatar";
import { FormSchema } from "@/lib/schemas";

interface FormInput {
  control: Control<z.infer<typeof FormSchema>>;
}

export default function CampaignPhotos({ control }: FormInput) {
  return (
    <div>
      <CampaignCoverImage control={control} />
      {/* <CampaignAvatar control={control} /> */}
    </div>
  );
}
