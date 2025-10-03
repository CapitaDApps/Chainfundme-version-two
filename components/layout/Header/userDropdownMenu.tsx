import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateWalletButton from "@/components/wallet_connect/CreateWalletButton";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

function UserDropdownMenu() {
  return (
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
      <DropdownMenuContent className="w-48 mr-2">
        <DropdownMenuLabel className="w-full rounded-md hover:bg-gray-100 hover:py-1 transition-all duration-200">
          <CreateWalletButton>
            <div className="cursor-pointer">My wallet</div>
          </CreateWalletButton>
        </DropdownMenuLabel>

        <DropdownMenuItem className="rounded-md hover:bg-gray-100 hover:py-1 hover:px-2 transition-all duration-200">
          <Link href={"/profile"} className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserDropdownMenu;
