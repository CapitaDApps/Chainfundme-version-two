import { useQuery } from "@tanstack/react-query";
import { getTokens } from "../../token";

export function useTokens() {
  const { data: tokens, isLoading: fetchingTokens } = useQuery({
    queryKey: ["tokens"],
    queryFn: getTokens,
  });

  return { tokens, fetchingTokens };
}
