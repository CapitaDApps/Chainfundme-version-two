"use client";

import { Button } from "@/components/ui/button";
import { FormSchema } from "@/lib/Profileschemas";
import { useFormContext } from "react-hook-form";
import z from "zod";
import AvatarImage from "./AvatarImage";
import CoverImage from "./CoverImage";
import ProfileInputs from "./ProfileInputs";
import { useUpdateProfile } from "@/services/api/hooks/user/useUpdateProfile";
import { useUserProfile } from "@/services/api/hooks/user/useUserProfile";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Profileform() {
  type FormData = z.infer<typeof FormSchema>;
  const { control, handleSubmit, reset } = useFormContext<FormData>();
  const { updateProfileFunc, updatingProfile, isSuccess } = useUpdateProfile();
  const { userProfile, fetchingProfile } = useUserProfile();
  const router = useRouter();

  // Load existing profile data into form
  useEffect(() => {
    if (userProfile) {
      reset({
        name: userProfile.name || "",
        bio: userProfile.bio || "",
        twitter: "",
        facebook: "",
        linkedin: "",
        website: "",
      });
    }
  }, [userProfile, reset]);

  // Redirect to profile page after successful update
  useEffect(() => {
    if (isSuccess) {
      router.push("/profile");
    }
  }, [isSuccess, router]);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    
    // Prepare social links object
    const socialLinks: {
      twitter?: string;
      facebook?: string;
      linkedin?: string;
      website?: string;
    } = {};
    
    if (data.twitter) socialLinks.twitter = data.twitter;
    if (data.facebook) socialLinks.facebook = data.facebook;
    if (data.linkedin) socialLinks.linkedin = data.linkedin;
    if (data.website) socialLinks.website = data.website;

    // Update profile with all fields including profile picture
    updateProfileFunc({
      name: data.name,
      bio: data.bio,
      profilePicture: data.avatar,
      socialLinks: Object.keys(socialLinks).length > 0 ? socialLinks : undefined,
    });
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
            disabled={updatingProfile || fetchingProfile}
            className="w-full my-4 bg-[#003DEF] text-white rounded-lg py-2 hover:bg-sky-600 cursor-pointer max-w-[10rem] mx-auto block disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updatingProfile ? "Saving..." : "Save Profile"}
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
