"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { menuItems } from "@/lib/sidebarContent";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/button";

export function AppSidebar() {
  const pathname = usePathname();
  const slug = pathname.split("/").at(pathname.split("/").length >= 2 ? 1 : 1);

  return (
    <Sidebar className="z-100">
      <SidebarContent className="w-64 bg-[#F9FAFB] text-card flex flex-col">
        <div>
          <SidebarGroupLabel className="p-5">
            <div className="flex items-center justify-center w-full pt-4">
              <Link href="/" className="flex items-center">
                <div className="flex items-center gap-0">
                  <Image
                    src="/layout/Logo.png"
                    alt="capita_logo"
                    width={200}
                    height={60}
                    className="block cursor-pointer"
                  />
                </div>
              </Link>
            </div>
          </SidebarGroupLabel>
        </div>
        <SidebarMenu className="mt-4 px-2 pt-4">
          <div className="flex flex-col gap-2 w-full ">
            {menuItems.map((item, index) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    key={index}
                    href={item.route}
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
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </div>
          <SidebarMenuItem className="relative flex justify-center mt-20">
            <div
              style={{
                background: "linear-gradient(180deg, #2379BC 0%, #2DB6F5 100%)",
              }}
              className="rounded-2xl text-white border border-white w-full max-w-[240px] min-h-[207px] flex flex-col items-center justify-center p-4"
            >
              <Image
                src="/layout/Group.png"
                alt="premium"
                width={30}
                height={30}
              />
              <h1 className="font-medium mt-3">Boost Your Campaign</h1>
              <p className="text-xs text-center mt-2">
                Get more donors & stand out with <br /> extra visibility.
              </p>
              <Button className="mt-4 bg-white text-[#2379bc] hover:bg-white/80 hover:text-[#2379bc]/70 cursor-pointer font-medium text-sm rounded-2xl">
                upgrade now
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
