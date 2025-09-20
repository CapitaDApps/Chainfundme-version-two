import NotificationPageClient from "@/components/layout/Notification/NotificationPageClient";
import { Suspense } from "react";

function NotificationsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotificationPageClient />
    </Suspense>
  );
}
export default NotificationsPage;
