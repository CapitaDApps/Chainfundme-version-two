import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../user";

export function useUserProfile() {
  const { data: userProfile, isLoading: fetchingProfile } = useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
  });

  return { userProfile, fetchingProfile };
}
