import Loader from "@/components/layout/Loader";
import NotificationPageClient from "@/components/layout/Notification/NotificationPageClient";
import { Suspense } from "react";

function NotificationsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <NotificationPageClient />
    </Suspense>
  );
}
export default NotificationsPage;
