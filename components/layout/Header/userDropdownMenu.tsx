import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateWalletButton from "@/components/wallet_connect/CreateWalletButton";
import { useUserProfile } from "@/services/api/hooks/user/useUserProfile";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

function UserDropdownMenu() {
  const { userProfile, fetchingProfile } = useUserProfile();

  // Generate initials from user name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center space-x-1 cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={userProfile?.profilePicture || "/layout/img3.png"} 
              alt="Profile" 
            />
            <AvatarFallback>
              {userProfile?.name ? getInitials(userProfile.name) : "U"}
            </AvatarFallback>
          </Avatar>

          <ChevronDown className="w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mr-2 pointer-events-auto">
        <DropdownMenuLabel className="w-full rounded-md hover:bg-gray-100 hover:py-2 transition-all duration-200">
          <CreateWalletButton>
            <div className="cursor-pointer">My wallet</div>
          </CreateWalletButton>
        </DropdownMenuLabel>

        <DropdownMenuItem>
          <Link href={"/profile"} className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserDropdownMenu;
