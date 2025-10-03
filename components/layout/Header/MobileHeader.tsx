"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CreateWalletButton from "@/components/wallet_connect/CreateWalletButton";
import { menuItems } from "@/lib/sidebarContent";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";

function MobileHeader() {
  const pathname = usePathname();
  const slug = pathname.split("/").at(pathname.split("/").length >= 2 ? 1 : 1);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div className="fixed top-0 right- z-40 w-full bg-white/90 backdrop-blur-sm shadow-sm h-14">
      <div className="flex flex-row items-center justify-between px-4 py-3 w-full h-full">
        <div className="flex flex-row items-center gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <RxHamburgerMenu className="cursor-pointer w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-2 w-full mt-14">
                {menuItems.map((item) => {
                  return (
                    <Link
                      key={item.slug}
                      href={item.route}
                      onClick={handleClose}
                      className={`
                          flex items-center px-4 py-3 gap-3 cursor-pointer rounded-md text-[12px]
                          hover:text-primary text-[#666666] transition-colors duration-200
                          ${
                            slug === item.slug
                              ? "!bg-primary/15 border-r-[2px] !text-primary rounded-none border-primary"
                              : "hover:bg-primary/10"
                          }
                        `}
                    >
                      <span className="text-lg">{<item.icon />}</span>
                      <span className="truncate">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/">
            <div className="flex">
              <Image
                src="/layout/appicon.png"
                alt="capita_logo"
                width={130}
                height={60}
                className="cursor-pointer w-6 h-6"
              />
            </div>
          </Link>
        </div>

        <div className="flex flex-row items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center space-x-1 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/layout/img3.png" alt="Profile" />
                  <AvatarFallback>TK</AvatarFallback>
                </Avatar>

                <ChevronDown className="w-4 h-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <CreateWalletButton />
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
export default MobileHeader;
