import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { menuItems } from "@/lib/sidebarContent";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

function Navdropdown() {
  const pathname = usePathname();
  const slug = pathname.split("/").at(pathname.split("/").length >= 2 ? 1 : 1);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <div
            style={{
              background: "linear-gradient(180deg, #1E5AA8 0%, #2379BC 100%)",
            }}
            className="border border-[#2379bc]/40 px-5 py-1 rounded-2xl shadow-xl space-x-2 flex flex-row items-center justify-center text-sm text-white font-medium"
          >
            <Image
              src="/layout/avatarboy.svg"
              alt="profipicture"
              width={30}
              height={20}
            />
            <h2>Tarey Kasali</h2>
            <ChevronDown className="w-4 h-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <div className="flex flex-col gap-2 w-full ">
              {menuItems
                .filter(
                  (item) => !["explore", "how-it-works"].includes(item.slug)
                )
                .map((item, index) => (
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
                ))}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export default Navdropdown;
