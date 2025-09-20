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
