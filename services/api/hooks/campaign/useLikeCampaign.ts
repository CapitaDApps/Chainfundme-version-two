import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeComment } from "../../comment";

export function useLikeCampaign() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (commentId: string) => await likeComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { likeCommentFunc: mutate };
}
