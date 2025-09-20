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
    <div>
      <div className="flex flex-row items-center justify-between px-4">
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
                className={`relative inline-block pb-2 text-[16px] font-medium ${
                  isActive
                    ? "text-[#2379bc]"
                    : "text-[#2379bc] hover:text-[#2379bc]/90"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute left-0 -bottom-2 h-0.5 w-full bg-[#2379bc] rounded"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* <div className="flex flex-row items-center">
          <Button
            style={{
              background: "linear-gradient(180deg, #1E5AA8 0%, #2379BC 100%)",
            }}
            className="rounded-2xl cursor-pointer shadow-xl px-6 py-3"
          >
            Connect Wallet
          </Button>
        </div> */}

        <div className="flex flex-row  items-center">
          <div>
            <ToggleNotificationbar />
          </div>
          <div>
            <Navdropdown />
          </div>
        </div>
      </div>

      <hr className="border-[#CDCDCD]/30 w-full -mt-2 pb-2" />
    </div>
  );
}

export default Header;
