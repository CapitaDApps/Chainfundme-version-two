import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFunder, FundDataType } from "../../funder";

export function useAddFunder() {
  const queryClient = useQueryClient();
  const { mutate: syncFund } = useMutation({
    mutationFn: async (data: FundDataType) => {
      return await addFunder(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { syncFund };
}
