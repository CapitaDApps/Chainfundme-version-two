"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OtherList } from "@/lib/Categories";
import { BiSolidDashboard } from "react-icons/bi";
import { useRouter, useSearchParams } from "next/navigation";

function OtherCampaign() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategorySelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-row rounded-2xl items-center cursor-pointer border border-[#666666]/50 gap-2 px-3 py-1">
            <span className="text-lg">
              <BiSolidDashboard />
            </span>
            <span className="truncate hidden md:block">other Campaign</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {OtherList.map((list) => (
            <DropdownMenuItem
              key={list.value}
              onClick={() => handleCategorySelect(list.value)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="text-lg flex-shrink-0">{<list.icon />}</span>
              <span className="truncate">{list.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export default OtherCampaign;
