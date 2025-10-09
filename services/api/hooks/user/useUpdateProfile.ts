import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../user";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { mutate, isPending: updatingProfile, isSuccess, isError, error } = useMutation({
    mutationFn: async (data: {
      name?: string;
      bio?: string;
      email?: string;
      profileImage?: File;
      socialLinks?: {
        twitter?: string;
        facebook?: string;
        linkedin?: string;
        website?: string;
      };
    }) => await updateProfile(data),

    onSuccess: () => {
      // Invalidate the user profile query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ["user"] });
      console.log("Profile updated successfully, queries invalidated");
    },
  });

  return {
    updateProfileFunc: mutate,
    updatingProfile,
    isSuccess,
    isError,
    error,
  };
}
