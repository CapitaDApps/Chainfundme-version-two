"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Explore" },
    { href: "/how-it-works", label: "How it works" },
  ];

  return (
    <div>
      <div className="flex flex-row items-center justify-end !px-6 !py-2">
        <div className="flex gap-x-6 transform -translate-x-82">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/" || pathname.startsWith("/explore-campaign")
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
                  <span className="absolute left-0 -bottom-3 h-0.5 w-full bg-[#2379bc] rounded"></span>
                )}
              </Link>
            );
          })}
        </div>

        <Button
          style={{
            background: "linear-gradient(180deg, #1E5AA8 0%, #2379BC 100%)",
          }}
          className="rounded-2xl cursor-pointer shadow-xl/20 !px-6 !py-3"
        >
          Connect Wallet
        </Button>
      </div>

      <hr className="border-[#CDCDCD]/30 w-full" />
    </div>
  );
}

export default Header;
