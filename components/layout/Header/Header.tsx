"use client";

import { menuItems } from "@/lib/sidebarContent";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ToggleNotificationbar from "./ToggleNotificationbar";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function Header() {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-center pt-8">
      <div className="flex items-center justify-between px-6 py-4 border-b border-none bg-[#F5F7FA] rounded-4xl w-full max-w-7xl">
        <div>
          <Image
            src="/layout/appicon.png"
            alt="App Icon"
            width={32}
            height={32}
          />
        </div>
        <div
          className={`flex items-center justify-center gap-x-8 ${plusJakartaSans.className}`}
        >
          {menuItems.slice(0, -2).map((link) => {
            const isActive =
              link.route === "/"
                ? pathname.startsWith("/explore")
                : pathname === link.route;

            return (
              <Link
                key={link.route}
                href={link.route}
                className={`relative inline-block pt-2 text-[16px] font-medium ${
                  isActive
                    ? "text-[#2379bc]"
                    : "text-[#2379bc] hover:text-[#2379bc]/90"
                }`}
              >
                {link.title}
                {isActive && (
                  <span className="absolute left-0 -bottom-4 h-0.5 w-full bg-[#003DEF] rounded"></span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-x-4 text-gray-600">
          <span>
            <ToggleNotificationbar />
          </span>
          <span className="flex items-center space-x-1 cursor-pointer">
            <Avatar>
              <AvatarImage src="/layout/img3.png" />
              <AvatarFallback>TK</AvatarFallback>
            </Avatar>
            <ChevronDown className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
