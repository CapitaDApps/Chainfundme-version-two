"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckedState } from "@radix-ui/react-checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoFilterOutline } from "react-icons/io5";
import { useOustsideClick } from "@/hooks/useOutsideClick";
import { Label } from "@/components/ui/label";

export default function DropdownFilter() {
  const { isOpen, setIsOpen, ref } = useOustsideClick();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleQuerySave = (query: string, checked: CheckedState) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked == true) {
      params.set(query, "true");
    } else {
      params.delete(query);
    }

    router.push(`${pathname}?${params}`);
  };
  const sort = [
    {
      title: "Most Recent",
      value: "most_recent",
    },
    {
      title: "Most Funded",
      value: "most_funded",
    },
  ];

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger
        onClick={() => setIsOpen(true)}
        className="cursor-pointer border-none"
      >
        <div className="flex items-center gap-1 cursor-pointer text-[#666666] text-sm">
          <IoFilterOutline />
          <p>Filters</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          ref={ref}
          className="mr-2 mt-2 shadow-sm shadow-zinc-950 bg-white text-background w-[180px] border-none flex flex-col gap-1 p-6 py-4 rounded-sm"
        >
          <DropdownMenuLabel className="text-sm text-[#2a2a2a] font-normal ">
            SORT BY
          </DropdownMenuLabel>
          <div className="space-y-2">
            {sort.map((sot) => {
              const isChecked = Boolean(searchParams.get(sot?.value ?? ""));
              return (
                <DropdownMenuItem
                  key={sot.value}
                  className={`flex items-center text-[#666666] text-sm cursor-pointer rounded-sm px-2 py-1 transition-colors duration-150 ${
                    isChecked
                      ? "bg-[var(--sidebar-content)] text-white"
                      : "hover:bg-[rgba(255,255,255,0.04)]"
                  }`}
                >
                  <Checkbox
                    id={sot.value}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      handleQuerySave(sot?.value ?? "", checked)
                    }
                  />
                  <Label
                    htmlFor={sot.value}
                    className="text-xs font-normal leading-none peer-disabled:cursor-not-allowed cursor-pointer peer-disabled:opacity-70 ml-2"
                  >
                    {sot.title}
                  </Label>
                </DropdownMenuItem>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
