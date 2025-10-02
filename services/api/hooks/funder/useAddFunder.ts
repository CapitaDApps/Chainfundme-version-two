import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFunder, FundDataType } from "../../funder";

export function useAddFunder() {
  const { mutate: syncFund } = useMutation({
    mutationFn: async (data: FundDataType) => {
      return await addFunder(data);
    },
  });

  return { syncFund };
}
