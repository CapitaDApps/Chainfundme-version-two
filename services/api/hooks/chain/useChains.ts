import { useQuery } from "@tanstack/react-query";
import { getChains } from "../../chain";

export function useChains() {
  const { data, isLoading: fetchingChains } = useQuery({
    queryKey: ["chains"],
    queryFn: getChains,
  });

  const prod = process.env.NEXT_PUBLIC_PRODUCTION === "true";

  const chains =
    data?.filter((chain) => (prod ? !chain.testnet : chain.testnet)) || [];

  return {
    chains,
    fetchingChains,
  };
}
