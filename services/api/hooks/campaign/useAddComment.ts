import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../comment";

export function useAddComment() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async ({
      campaignId,
      comment,
    }: {
      campaignId: string;
      comment: string;
    }) => addComment(campaignId, comment),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return {
    addCommentFunc: mutate,
  };
}
