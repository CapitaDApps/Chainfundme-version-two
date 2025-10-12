import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editComment } from "../../comment";

export function useEditComment() {
  const queryClient = useQueryClient();
  const { mutate, isPending: editingComment } = useMutation({
    mutationFn: async ({
      commentId,
      comment,
    }: {
      commentId: string;
      comment: string;
    }) => await editComment(commentId, comment),

    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("Comment edited successfully, queries invalidated");
    },
  });

  return {
    editCommentFunc: mutate,
    editingComment,
  };
}
