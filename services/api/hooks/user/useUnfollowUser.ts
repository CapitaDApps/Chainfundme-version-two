import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollowUser } from "../../user";
import { toast } from "sonner";

export function useUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      console.log("useUnfollowUser: Attempting to unfollow user:", userId);
      return await unfollowUser(userId);
    },
    onSuccess: (data, userId) => {
      console.log("useUnfollowUser: Successfully unfollowed user:", userId, data);
      // Invalidate user profile queries to refresh follower counts
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      
      toast.success("Successfully unfollowed user!");
    },
    onError: (error: any) => {
      console.error("useUnfollowUser: Unfollow user error:", error);
      console.error("useUnfollowUser: Error response:", error?.response?.data);
      toast.error(error?.response?.data?.message || "Failed to unfollow user");
    },
  });
}
