import { TbMoneybag } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiFolderOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { CiBookmark } from "react-icons/ci";
export const menuItems = [
  {
    title: "Explore Campaigns",
    icon: CiSearch,
    route: "/explore-campaign",
    slug: "explore-campaign",
  },
  {
    title: "Donations",
    icon: TbMoneybag,
    route: "/my-donations",
    slug: "donations",
  },
  {
    title: "My Campaigns",
    icon: CiFolderOn,
    route: "/my-campaigns",
    slug: "my-campaigns",
  },
  {
    title: "Notifications",
    icon: IoMdNotificationsOutline,
    route: "/notifications",
    slug: "notifications",
  },
  {
    title: "Bookmarked",
    icon: CiBookmark,
    route: "/bookmarked",
    slug: "bookmarked",
  },
  {
    title: "Profile",
    icon: CgProfile,
    route: "/profile",
    slug: "profile",
  },
];