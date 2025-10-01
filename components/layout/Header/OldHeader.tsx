"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { Button } from "../../ui/button";
import ToggleNotificationbar from "./ToggleNotificationbar";
import Navdropdown from "./Navdropdown";

function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Explore" },
    { href: "/how-it-works", label: "How it works" },
  ];

  return (
    <div className="fixed top-0 right- z-40 w-full bg-white/90 backdrop-blur-sm shadow-sm">
      <div className=" flex flex-row items-center justify-between px-6">
        <div className=" pb-2">
          <Link href="/" className="">
            <div className="flex">
              <Image
                src="/layout/Logo.png"
                alt="capita_logo"
                width={200}
                height={60}
                className=" cursor-pointer"
              />
            </div>
          </Link>
        </div>
        <div className="flex gap-x-6 ">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname.startsWith("/explore")
                : pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative inline-block pt-2 text-[16px] font-medium ${
                  isActive
                    ? "text-[#2379bc]"
                    : "text-[#2379bc] hover:text-[#2379bc]/90"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute left-0 -bottom-4 h-0.5 w-full bg-[#003DEF] rounded"></span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-row  items-center">
          <div>
            <ToggleNotificationbar />
          </div>
          <div>
            <Navdropdown />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Header;
