"use client";

import { menuItems } from "@/lib/sidebarContent";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateWalletButton from "@/components/wallet_connect/CreateWalletButton";
import { usePrivy } from "@privy-io/react-auth";
import { ChevronDown } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import ToggleNotificationbar from "./ToggleNotificationbar";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function Header() {
  const pathname = usePathname();
  const { user } = usePrivy();
  const connected = !!user;

  return (
    <div className="flex items-center justify-center pt-8 px-14 lg:px-28">
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
          className={`flex items-center justify-center gap-x-6 lg:gap-x-12 ${plusJakartaSans.className}`}
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
                className={`relative text-sm lg:text-[16px] font-medium ${
                  isActive
                    ? "text-[#2379bc]"
                    : "text-[#2379bc] hover:text-[#2379bc]/90"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-x-4 text-gray-600">
          {connected ? (
            <>
              <ToggleNotificationbar />
              <div className="flex items-center space-x-1 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/layout/img3.png" alt="Profile" />
                  <AvatarFallback>TK</AvatarFallback>
                </Avatar>

                <ChevronDown className="w-4 h-4" />
              </div>
            </>
          ) : (
            <CreateWalletButton />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
