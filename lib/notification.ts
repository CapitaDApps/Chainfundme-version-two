export type Notification = {
  id: string;
  title: string;
  time: string;
  description: string;
  amount?: string;
  currency?: string;
  destination?: string;
  type?: string;
  read?: boolean;
  iconEmoji?: string;
  iconBg?: string;
};

export const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New Contribution Received",
    time: "1 day ago",
    description:
      '"Medical Expenses Support campaign" received a 0.5 ETH contribution',
    amount: "0.5 ETH",
    currency: "ETH",
    destination: "Anonymous",
    iconEmoji: "💚",
    iconBg: "bg-emerald-500",
    read: false,
  },
  {
    id: "2",
    title: "Campaign Milestone Reached",
    time: "1 day ago",
    description:
      '"Medical Expenses Support campaign" has reached 100% of its funding goal',
    iconEmoji: "🏁",
    iconBg: "bg-violet-500",
    read: false,
  },
  {
    id: "3",
    title: "Awaiting approval",
    time: "1 day ago",
    description:
      '"Medical Expenses Support campaign" has been created and is awaiting approval',
    iconEmoji: "⏳",
    iconBg: "bg-amber-400",
    read: false,
  },
  {
    id: "4",
    title: "Campaign Approved",
    time: "1 day ago",
    description: '"Medical Expenses Support campaign" has been approved',
    iconEmoji: "✅",
    iconBg: "bg-emerald-400",
    read: false,
  },
  {
    id: "5",
    title: "Campaign Cancellation",
    time: "1 day ago",
    description: '"Medical Expenses Support campaign" has been cancelled',
    iconEmoji: "⚠️",
    iconBg: "bg-rose-400",
    read: false,
  },
  {
    id: "6",
    title: "Contribution Refunded",
    time: "1 day ago",
    description:
      "A contribution of 100 USDT was refunded due to campaign cancellation",
    amount: "100 USDT",
    iconEmoji: "💸",
    iconBg: "bg-rose-300",
    read: false,
  },
  {
    id: "7",
    title: "Campaign Ended",
    time: "1 day ago",
    description:
      '"Medical Expenses Support campaign" has reached its completion',
    iconEmoji: "🏁",
    iconBg: "bg-emerald-400",
    read: false,
  },
  {
    id: "8",
    title: "Weekly Summary",
    time: "1 day ago",
    description: "You received 15 contributions totaling $1,000 this week",
    amount: "0.5 ETH",
    currency: "ETH",
    destination: "Anonymous",
    iconEmoji: "📊",
    iconBg: "bg-indigo-500",
    read: false,
  },
];
