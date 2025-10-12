import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../comment";

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const { mutate, isPending: deletingComment } = useMutation({
    mutationFn: async ({ commentId }: { commentId: string }) =>
      await deleteComment(commentId),

    onSuccess: () => {
      queryClient.invalidateQueries();
      console.log("Comment deleted successfully, queries invalidated");
    },
  });

  return {
    deleteCommentFunc: mutate,
    deletingComment,
  };
}
