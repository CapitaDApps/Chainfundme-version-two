import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/services/api/hooks/user/useUserProfile";
import { Verified } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ProfilePrivateClient() {
  const { userProfile, fetchingProfile } = useUserProfile();
  const campaigns = userProfile?.createdCampaigns;
  
  // Calculate following count from supported campaigns
  const followingCount = userProfile?.supportedCampaigns?.length || 0;
  
  if (fetchingProfile) {
    return (
      <div className="mt-24 md:mt-12 px-4 sm:px-10 md:px-14 lg:px-20 mb-14 max-w-5xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading profile...</div>
        </div>
      </div>
    );
  }

  // Use fallback values when userProfile is not available
  const displayName = userProfile?.name || "Anonymous User";
  const displayBio = userProfile?.bio || "No bio available";
  const displayFollowers = userProfile?.followers || 0;
  const displayFollowing = followingCount;
  const displayIsVerified = userProfile?.isVerified || false;
  const displayProfilePicture = userProfile?.profilePicture;

  return (
    <div className="mt-24 md:mt-12 px-4 sm:px-10 md:px-14 lg:px-20 mb-14 max-w-5xl mx-auto">
      <div className="relative w-full h-[180px] md:h-[250px] mt-2 md:-mt-2">
        <Image
          src="/layout/sol.png"
          alt="banner"
          fill
          className="object-cover rounded-3xl"
          priority
        />

        {displayProfilePicture ? (
          <Image
            src={displayProfilePicture}
            alt="profile"
            width={120}
            height={120}
            className="absolute z-20 left-2 w-[90px] h-[90px] -bottom-12 md:w-[120px] md:h-[120px] md:-bottom-14  md:left-5 rounded-full object-cover"
          />
        ) : (
          <div className="absolute z-20 left-2 w-[90px] h-[90px] -bottom-12 md:w-[120px] md:h-[120px] md:-bottom-14 md:left-5 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">
              {displayName.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        
        <Link href={"/profile/edit"}>
          <Button
            variant={"outline"}
            className="absolute right-0 -bottom-9 md:-bottom-10 text-xs h-7 md:text-sm md:h-8"
          >
            Edit profile
          </Button>
        </Link>
      </div>

      <div className="mt-18">
        <h3 className="font-bold text-xl sm:text-2xl text-secondary-text">
          {displayName}
        </h3>
        <p className="-mt-1 text-secondary-text-muted text-sm sm:text-base">
          @{displayName.toLowerCase().replace(/\s+/g, '')}
        </p>
        <p className="mt-4 text-sm sm:text-base">
          {displayBio}
        </p>

        <div className="flex gap-2 mt-3 text-sm sm:text-base">
          <p className="font-bold text-primary-accent italic">
            {displayFollowing}{" "}
            <span className="font-normal text-secondary-text">Following</span>
          </p>
          <p className="font-bold text-primary-accent italic">
            {displayFollowers}{" "}
            <span className="font-normal text-secondary-text">Followers</span>
          </p>
        </div>
      </div>

      <div className="bg-gray-100 px-5 py-5 rounded-xl mt-5 space-y-4">
        <div className="font-bold text-xl sm:text-2xl text-secondary-text flex items-center gap-2">
          <p>{displayIsVerified ? "You are verified" : "You aren't verified yet"}</p>
          <Verified className={`${displayIsVerified ? "text-green-500" : "text-primary-accent"}`} />
        </div>

        {!displayIsVerified && (
          <>
            <div className="text-sm sm:text-base">
              <p>
                Get verified to feature your campaigns on our explore page, more
                trust, visibility, and more.
              </p>
              <p>Upgrade your profile now.</p>
            </div>

            <Button className="rounded-2xl">Get Verified</Button>
          </>
        )}
      </div>

      {/* <div className="pt-6 px-10">
          <h1 className="text-2xl md:text-3xl font-bold">Metrics</h1>
          <Matrics />
        </div> */}
    </div>
  );
}

export default ProfilePrivateClient;
