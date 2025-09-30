import { useFormContext } from "react-hook-form";

import { FormSchema } from "@/lib/schemas";
import z from "zod";
import CampaignPhotos from "./form/form/CampaignPhotos";
import UploadSection from "./UploadSection";

export default function StepTwo() {
  type FormData = z.infer<typeof FormSchema>;
  const { control } = useFormContext<FormData>();

  return (
    <div className="space-y-10  max-w-3xl mx-auto">
      <CampaignPhotos control={control} />
      <div className={`space-y-4`}>
        <UploadSection />
      </div>
    </div>
  );
}
