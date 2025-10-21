import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "../../user";
import { toast } from "sonner";

export function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      console.log("useFollowUser: Attempting to follow user:", userId);
      return await followUser(userId);
    },
    onSuccess: (data, userId) => {
      console.log("useFollowUser: Successfully followed user:", userId, data);
      // Invalidate user profile queries to refresh follower counts
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      
      toast.success("Successfully followed user!");
    },
    onError: (error: any) => {
      console.error("useFollowUser: Follow user error:", error);
      console.error("useFollowUser: Error response:", error?.response?.data);
      toast.error(error?.response?.data?.message || "Failed to follow user");
    },
  });
}
