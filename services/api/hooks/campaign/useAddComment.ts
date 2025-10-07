import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../comment";

export function useAddComment() {
  const queryClient = useQueryClient();
  const { mutate, isPending: addingComment } = useMutation({
    mutationFn: async ({
      campaignId,
      comment,
    }: {
      campaignId: string;
      comment: string;
    }) => await addComment(campaignId, comment),

    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("Queries successfully invalidated");
    },
  });

  return {
    addCommentFunc: mutate,
    addingComment,
  };
}
