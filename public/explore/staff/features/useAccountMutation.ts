import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAccount, createInvitedAccount } from "@/services/api-account";

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useCreateInvitedAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createInvitedAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
