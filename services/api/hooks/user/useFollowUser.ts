import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser, followUserType } from "../../user";

export function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: followUserType) => followUser(data),
    onSuccess: () => {
      // Invalidate and refetch user profile data to update follower counts
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // Also invalidate any user-specific queries that might be affected
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error) => {
      console.error("Failed to follow user:", error);
    },
  });
}
