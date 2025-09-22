import ProfileClent from "@/components/layout/profile/ProfileClient";
import { Suspense } from "react";

function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileClent />
    </Suspense>
  );
}

export default ProfilePage;
