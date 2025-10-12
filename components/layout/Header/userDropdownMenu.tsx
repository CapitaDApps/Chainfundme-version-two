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

  // Get first letter of name for fallback
  const getInitials = () => {
    if (!userProfile?.name) return "U";
    return userProfile.name.charAt(0).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center space-x-1 cursor-pointer">
          <Avatar className="h-8 w-8">
            {fetchingProfile ? (
              <AvatarFallback>...</AvatarFallback>
            ) : (
              <>
                <AvatarImage 
                  src={userProfile?.profilePicture || "/layout/img3.png"} 
                  alt="Profile" 
                />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </>
            )}
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
