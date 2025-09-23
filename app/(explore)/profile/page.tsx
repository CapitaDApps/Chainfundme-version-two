// import Profileform from "@/components/layout/profile/Profileform";
import ProfilePrivateClient from "@/components/layout/profile/ProfilePrivate";
import { Suspense } from "react";

function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfilePrivateClient />
      {/* <Profileform /> */}
    </Suspense>
  );
}

export default ProfilePage;
