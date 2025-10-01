import { TbMoneybag } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiFolderOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaNetworkWired } from "react-icons/fa";
// import { CiBookmark } from "react-icons/ci";
export const menuItems = [
  {
    title: "Explore",
    icon: CiSearch,
    route: "/explore",
    slug: "explore",
  },
  {
    title: "How it works",
    icon: FaNetworkWired,
    route: "/how-it-works",
    slug: "how-it-works",
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
  // {
  //   title: "Bookmarked",
  //   icon: CiBookmark,
  //   route: "/bookmarked",
  //   slug: "bookmarked",
  // },
  {
    title: "Profile",
    icon: CgProfile,
    route: "/profile",
    slug: "profile",
  },
];

// {
//   title: "Explore Campaigns",
//   icon: CiSearch,
//   route: "/Explore Campaigns",
//   slug: "Explore-Campaigns",
//   children: [
//     {
//       title: "Explore",
//       icon: CiSearch,
//       route: "/explore",
//       slug: "explore",
//     },
//     {
//       title: "How it works",
//       icon: FaNetworkWired,
//       route: "/how-it-works",
//       slug: "how-it-works",
//     },
//   ],
// },
