import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, updateProfileType } from "../../user";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: updateProfileType) => updateProfile(data),
    onSuccess: () => {
      // Invalidate and refetch user profile data
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
    },
  });
}
