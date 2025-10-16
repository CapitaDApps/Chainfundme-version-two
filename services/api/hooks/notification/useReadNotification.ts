import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readAllNotifications } from "../../notification";

export function useReadNotification() {
  const queryClient = useQueryClient();

  const { mutate: readNotification, isPending: isReading } = useMutation({
    mutationFn: async (notificationId?: string) => {
      if (!notificationId) {
        await readAllNotifications();
      }
    },
    onSuccess() {
      queryClient.invalidateQueries();
    },
  });

  return { readNotification, isReading };
}
