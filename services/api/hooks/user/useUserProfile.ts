import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../user";
import { useEffect } from "react";

export function useUserProfile() {
  const { data: userProfile, isLoading: fetchingProfile, error } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
    staleTime: 0, // Always fetch fresh data
    refetchOnMount: true, // Refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });

  useEffect(() => {
    if (userProfile) {
      console.log("User Profile Data:", userProfile);
      console.log("Profile Picture:", userProfile.profilePicture);
    }
    if (error) {
      console.error("Error fetching user profile:", error);
    }
  }, [userProfile, error]);

  return { userProfile, fetchingProfile, error };
}
