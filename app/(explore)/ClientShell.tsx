"use client";

import { ReactNode } from "react";
// import AppSidebar from "@/components/layout/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout/Header/Header";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        {/* <AppSidebar /> */}

        {/* Main content area */}
        <div className="flex flex-1 flex-col w-full max-w-[1500px] mx-auto">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
