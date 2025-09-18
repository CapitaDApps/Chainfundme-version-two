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
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;