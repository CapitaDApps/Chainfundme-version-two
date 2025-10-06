"use client";

import { Button } from "@/components/ui/button";
import { FormSchema } from "@/lib/Profileschemas";
import { useFormContext } from "react-hook-form";
import { useUpdateProfile } from "@/services/api/hooks/user/useUpdateProfile";
import z from "zod";
import AvatarImage from "./AvatarImage";
import CoverImage from "./CoverImage";
import ProfileInputs from "./ProfileInputs";
import { toast } from "sonner";

function Profileform() {
  type FormData = z.infer<typeof FormSchema>;
  const { control, handleSubmit } = useFormContext<FormData>();
  const updateProfileMutation = useUpdateProfile();

  const onSubmit = async (data: FormData) => {
    try {
      // Extract only the fields that the backend API accepts
      const profileData = {
        name: data.name,
        bio: data.bio,
      };

      await updateProfileMutation.mutateAsync(profileData);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      
      // Handle specific error cases
      if (error?.response?.status === 401) {
        toast.error("Please log in to update your profile.");
      } else if (error?.response?.status === 400) {
        toast.error("Invalid profile data. Please check your inputs.");
      } else if (error?.response?.status === 404) {
        toast.error("Profile update endpoint not found. Please contact support.");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row justify-between items-center py-24 md:py-16 px-4 md:px-14 lg:px-20">
        <div className="border border-[#E2E2E2] rounded-2xl bg-[#F4F9FC] w-full space-y-6">
          <CoverImage control={control} />
          <AvatarImage control={control} />
          <ProfileInputs control={control} />

          <Button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="w-full my-4 bg-[#003DEF] text-white rounded-lg py-2 hover:bg-sky-600 cursor-pointer max-w-[10rem] mx-auto block disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateProfileMutation.isPending ? "Saving..." : "Save Profile"}
          </Button>
        </div>

        {/* <div className="hidden lg:flex flex-col items-center space-y-4">
          <ProgressIndicator value={50} size={130} />
          <span>
            <p className="text-xs text-center max-w-[200px] text-gray-600">
              Complete your Profile to attain High Trust Score
            </p>
          </span>
        </div> */}
      </div>
    </form>
  );
}

export default Profileform;
