"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { menuItems } from "@/lib/sidebarContent";
import { usePathname } from "next/navigation";
import { useState } from "react";

function MobileHeader() {
  const pathname = usePathname();
  const slug = pathname.split("/").at(pathname.split("/").length >= 2 ? 1 : 1);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
   <div className="fixed top-0 right- z-40 w-full bg-white/90 backdrop-blur-sm shadow-sm">
     <div className="flex flex-row items-center justify-between px-4 py-2">
      <div className="flex flex-row space-x-4 items-center pb-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <RxHamburgerMenu className="cursor-pointer w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetDescription>
                <div className="flex flex-col gap-2 w-full pt-10">
                  {menuItems.map((item) => {
                    if (item.children && item.children.length > 0) {
                      return (
                        <Accordion key={item.slug} type="single" collapsible>
                          <AccordionItem value={item.slug}>
                            <AccordionTrigger
                              className={`
                                flex items-center gap-3 px-4 py-3 cursor-pointer rounded-md text-[12px]
                                hover:text-primary text-[#666666] transition-colors duration-200
                                data-[state=open]:bg-white/15 data-[state=open]:!text-primary
                                [&[data-state=open]>svg]:rotate-180
                                border-0 !justify-start
                                ${
                                  slug === item.slug
                                    ? "!bg-primary/15 border-r-[2px] !text-primary rounded-none border-primary"
                                    : "hover:bg-primary/10"
                                }
                              `}
                            >
                              <span className="text-lg">{<item.icon />}</span>
                              <span>{item.title}</span>
                            </AccordionTrigger>
                            <AccordionContent className="pl-10 flex flex-col gap-2">
                              {item.children.map((child) => (
                                <Link
                                  key={child.slug}
                                  href={child.route}
                                  onClick={handleClose}
                                  className={`
                                    flex items-center px-4 py-2 gap-3 rounded-md text-[12px]
                                    hover:text-primary text-[#666666]
                                    ${
                                      slug === child.slug
                                        ? "!bg-primary/15 border-r-[2px] !text-primary rounded-none border-primary"
                                        : "hover:bg-primary/10"
                                    }
                                  `}
                                >
                                  <span className="text-lg">
                                    {<child.icon />}
                                  </span>
                                  <span>{child.title}</span>
                                </Link>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      );
                    }

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
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Link href="/">
          <div className="flex">
            <Image
              src="/layout/Logo.png"
              alt="capita_logo"
              width={130}
              height={60}
              className="cursor-pointer"
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-row items-center gap-3">
        <Button
          className="rounded-2xl cursor-pointer shadow-xl px-3 py-1 text-xs bg-[#003DEF]"
        >
          Connect Wallet
        </Button>
      </div>
    </div>
   </div>
  );
}
export default MobileHeader;
