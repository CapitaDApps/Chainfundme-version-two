"use client";

import React, { useState, useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Socials from "./Socials";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { UserDocument } from "@/types/api";
import { useFollowUser } from "@/services/api/hooks/user/useFollowUser";
import { useUnfollowUser } from "@/services/api/hooks/user/useUnfollowUser";
import { useUserProfile } from "@/services/api/hooks/user/useUserProfile";

function PopupProfile({ owner }: { owner: UserDocument }) {
  const { userProfile } = useUserProfile();
  const followUserMutation = useFollowUser();
  const unfollowUserMutation = useUnfollowUser();
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(owner.followers || 0);
  
  // Check if current user is following this profile owner
  useEffect(() => {
    if (userProfile?.usersFollowing && owner._id) {
      setIsFollowing(userProfile.usersFollowing.includes(owner._id));
    }
  }, [userProfile?.usersFollowing, owner._id]);

  // Update followers count when owner changes
  useEffect(() => {
    console.log("PopupProfile: Owner followers count:", owner.followers);
    setFollowersCount(owner.followers || 0);
  }, [owner.followers]);

  const handleFollow = async () => {
    if (!owner._id) return;
    
    const previousCount = followersCount;
    
    if (isFollowing) {
      // Optimistically update the followers count
      setFollowersCount(prev => Math.max(0, prev - 1));
      try {
        await unfollowUserMutation.mutateAsync(owner._id);
      } catch (error) {
        // Revert optimistic update on error
        setFollowersCount(previousCount);
        throw error;
      }
    } else {
      // Optimistically update the followers count
      setFollowersCount(prev => prev + 1);
      try {
        await followUserMutation.mutateAsync(owner._id);
      } catch (error) {
        // Revert optimistic update on error
        setFollowersCount(previousCount);
        throw error;
      }
    }
  };

  return (
    <div className="relative">
      {/* <button
        aria-label="Report profile"
        className="absolute top-4 right-4 cursor-pointer"
      >
        <FaExclamationTriangle className="md:text-xl text-lg text-red-500" />
      </button> */}

      <div className="flex flex-col items-center justify-center">
        {owner.profilePicture ? (
          <Image
            src={owner.profilePicture}
            alt="avatar"
            width={100}
            height={100}
            className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full shadow-sm"
          />
        ) : (
          <div className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full shadow-sm bg-gray-200 flex items-center justify-center">
            <p className="text-xl text-gray-800">
              {owner.name.slice(0, 2).toUpperCase()}
            </p>
          </div>
        )}
        <div className="text-center flex flex-row gap-x-2 items-center justify-center mt-2">
          <h3 className="text-xl font-semibold">{owner.name}</h3>
          <span className="flex flex-row items-center justify-center space-x-1">
            <Image src="/layout/bag.png" alt="bag" width={20} height={20} />
            <p className="text-xs">45% Trust score</p>
          </span>
        </div>

        {owner.bio && (
          <p className="text-sm text-[#6D6D6D] line-clamp-2 text-center">
            {owner.bio}
          </p>
        )}

        <div className="flex justify-center mt-5 space-x-8">
          <div className="text-center">
            <p className="font-bold text-sm">{followersCount || 0}</p>
            <p className="text-gray-500 text-xs">Followers</p>
          </div>
          {/* <div className="text-center">
            <p className="font-bold text-sm">284</p>
            <p className="text-gray-500 text-xs">Following</p>
          </div> */}
        </div>
        <Button
          className="flex items-center gap-1 mt-2 px-4 text-xs rounded-2xl cursor-pointer bg-[#003DEF] text-white hover:bg-sky-600 h-7 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleFollow}
          disabled={
            followUserMutation.isPending || 
            unfollowUserMutation.isPending ||
            userProfile?._id === owner._id
          }
        >
          {(followUserMutation.isPending || unfollowUserMutation.isPending) ? (
            isFollowing ? "Unfollowing..." : "Following..."
          ) : userProfile?._id === owner._id ? (
            "Your Profile"
          ) : isFollowing ? (
            "Unfollow"
          ) : (
            "Follow"
          )}
          {!(followUserMutation.isPending || unfollowUserMutation.isPending) && userProfile?._id !== owner._id && !isFollowing && (
            <GoPlus className="text-sm" />
          )}
        </Button>
        <div className="mt-4">
          <Socials owner={owner} />
        </div>
      </div>
    </div>
  );
}

export default PopupProfile;
