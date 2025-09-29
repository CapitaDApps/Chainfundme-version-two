import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReply } from "../../comment";

export function useAddReply() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ({
      commentId,
      reply,
    }: {
      commentId: string;
      reply: string;
    }) => addReply(commentId, reply),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { addReplyFunc: mutate };
}
