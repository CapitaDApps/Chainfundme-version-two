import { NotificationDocument } from "@/types/api/notification.types";
import { compareDesc } from "date-fns";

export const notificationConf = {
  donation: {
    emoji: "💚",
    iconBg: "bg-emerald-500/50",
  },
  follow: {
    emoji: "👤",
    iconBg: "bg-violet-500/50",
  },

  liked: {
    emoji: "❤️",
    iconBg: "bg-violet-500/50",
  },

  new: {
    emoji: "🔔",
    iconBg: "bg-emerald-500/50",
  },
};

export const getNotifications = (
  userNotification: NotificationDocument[] | undefined
) => {
  const notifications = userNotification
    ?.map((notification) => {
      switch (notification.type) {
        case "donation":
          return { ...notification, ...notificationConf["donation"] };
        case "commentLiked":
          return { ...notification, ...notificationConf["liked"] };
        case "replyLiked":
          return { ...notification, ...notificationConf["liked"] };
        case "follow":
          return { ...notification, ...notificationConf["follow"] };
        case "newComment":
          return { ...notification, ...notificationConf["new"] };
        case "newReply":
          return { ...notification, ...notificationConf["new"] };

        default:
          return { ...notification, ...notificationConf["new"] };
      }
    })
    .sort((a, b) => compareDesc(new Date(b.createdAt), new Date(a.createdAt)));

  return notifications;
};
