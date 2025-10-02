"use client";

import { FormSchema } from "@/lib/Profileschemas";
import { useFormContext } from "react-hook-form";
import z from "zod";
import CoverImage from "./CoverImage";
import AvatarImage from "./AvatarImage";
import { ProgressIndicator } from "./ProgressIndicator";
import ProfileInputs from "./ProfileInputs";
import { Button } from "@/components/ui/button";

interface ProfileformProps {
  onSave: () => void;
}

function Profileform({ onSave }: ProfileformProps) {
  type FormData = z.infer<typeof FormSchema>;
  const { control, handleSubmit } = useFormContext<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row justify-between items-center py-16 px-4 md:px-16">
        <div className="border border-[#E2E2E2] rounded-2xl bg-[#F4F9FC] md:p-6 w-full lg:w-[70%] space-y-6">
          <CoverImage control={control} />
          <AvatarImage control={control} />
          <ProfileInputs control={control} />

          <Button
            type="submit"
            className="w-full my-4 bg-[#003DEF] text-white rounded-lg py-2 hover:bg-sky-600 cursor-pointer max-w-[10rem] mx-auto block"
          >
            Save Profile
          </Button>
        </div>

        <div className="hidden lg:flex flex-col items-center space-y-4">
          <ProgressIndicator value={50} size={130} />
          <span>
            <p className="text-xs text-center max-w-[200px] text-gray-600">
              Complete your Profile to attain High Trust Score
            </p>
          </span>
        </div>
      </div>
    </form>
  );
}

export default Profileform;
