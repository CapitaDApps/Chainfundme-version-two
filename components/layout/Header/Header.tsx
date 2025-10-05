"use client";

import { menuItems } from "@/lib/sidebarContent";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import CreateWalletButton from "@/components/wallet_connect/CreateWalletButton";
import { usePrivy } from "@privy-io/react-auth";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import ToggleNotificationbar from "./ToggleNotificationbar";
import UserDropdownMenu from "./userDropdownMenu";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function Header() {
  const pathname = usePathname();
  const { user } = usePrivy();
  const connected = !!user;

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setScroll(scrollY);
    });
  }, []);

  return (
    <div
      className={`${
        scroll > 100
          ? "fixed w-full z-50 bg-[#F5F7FA] py-5 shadow-xl"
          : "pt-8 px-14 lg:px-20"
      } flex items-center justify-center transition-all duration-500  px-14 lg:px-20 max-w-[1500px]`}
    >
      <div
        className={`flex items-center justify-between border-b border-none  w-full ${
          scroll > 100 ? "rounded-none" : "rounded-4xl px-8 py-4 bg-[#F5F7FA]"
        }`}
      >
        <div className="flex items-center gap-8 lg:gap-14">
          <Link href={"/explore"}>
            <Image
              src="/layout/Logo.png"
              alt="App Icon"
              width={200}
              height={30}
              className="w-24 lg:w-36"
            />
          </Link>
          <div
            className={`flex items-center justify-center gap-x-4 lg:gap-x-10 ${plusJakartaSans.className}  mt-1`}
          >
            {menuItems.slice(0, -2).map((link) => {
              const isActive = pathname == link.route;

              return (
                <Link
                  key={link.route}
                  href={link.route}
                  className={`relative text-xs lg:text-[16px] font-medium `}
                >
                  <p
                    className={` hover:text-blue-700 ${
                      isActive ? "text-blue-700" : "text-secondary-text"
                    }`}
                  >
                    {link.title}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-x-4 text-gray-600">
          {connected ? (
            <>
              <ToggleNotificationbar />

              <UserDropdownMenu />
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
