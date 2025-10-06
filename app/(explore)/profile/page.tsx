"use client";

import Loader from "@/components/layout/Loader";
import ProfilePrivateClient from "@/components/layout/profile/ProfilePrivate";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense fallback={<Loader />}>
      <ProfilePrivateClient />
    </Suspense>
  );
}
