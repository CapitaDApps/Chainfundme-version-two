"use client";
import React from "react";
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
import { useOustsideClick } from "@/hooks/useOutsideClick";
import { Label } from "@/components/ui/label";
import { BiCategory } from "react-icons/bi";

export default function DropdownCategory() {
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
      title: "Travel",
      value: "travel",
    },

    {
      title: "Health",
      value: "health",
    },
    {
      title: "Academics",
      value: "academics",
    },
    {
      title: "Crisis Relief",
      value: "crises",
    },
    {
      title: "Community Rescue",
      value: "rescue",
    },
    {
      title: "Personal",
      value: "personal",
    },
    {
      title: "Creatives / Community",
      value: "creative",
    },
    {
      title: "Organizations",
      value: "organization",
    },
  ];

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger
        onClick={() => setIsOpen(true)}
        className="cursor-pointer border-none "
      >
        <div className="flex items-center gap-1 cursor-pointer text-[#666666] text-sm">
          <BiCategory />
          <p>Categories</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          ref={ref}
          className="mr-2 mt-2 shadow-sm shadow-zinc-950 bg-sidebar-content text-background w-[180px] border-none flex flex-col gap-1 p-3.5 py-2.5 rounded-sm"
        >
          <DropdownMenuLabel className="text-xs text-[#2a2a2a] font-normal ">
            SORT BY
          </DropdownMenuLabel>
          <div className="space-y-1">
            {sort.map((sot) => {
              const isChecked = Boolean(searchParams.get(sot?.value ?? ""));
              return (
                <DropdownMenuItem
                  key={sot.value}
                  className={`flex items-center text-[#666666] text-xs cursor-pointer rounded-sm px-2 py-1 transition-colors duration-150 ${
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
            {/* 
            <DropdownMenuItem className="flex items-center text-primary-text text-sm  hover:bg-transparent cursor-pointe">
              <Checkbox
                id="most_funded"
                checked={Boolean(searchParams.get("most_funded"))}
                onCheckedChange={(checked) =>
                  handleQuerySave("most_funded", checked)
                }
              />
              <Label
                htmlFor="most_funded"
                className="text-xs font-normal leading-none peer-disabled:cursor-not-allowed cursor-pointer peer-disabled:opacity-70"
              >
                Most Funded
              </Label>
            </DropdownMenuItem> */}
          </div>
          {/* <Button
            onClick={() => setIsOpen(false)}
            className="bg-primary-text hover:bg-white rounded-[8px] text-primary-bg text-sm font-normal mt-3"
          >
            Save
          </Button> */}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
