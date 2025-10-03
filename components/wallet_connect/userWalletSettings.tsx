import { useDisconnect } from "wagmi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { handleCopyAddress, truncateAddr } from "@/lib/utils";
import { useLinkAccount, usePrivy } from "@privy-io/react-auth";
import {
  ArrowRightToLine,
  Copy,
  Mail,
  PhoneOutgoing,
  Wallet,
} from "lucide-react";

function UserWalletSettings({ children }: { children: React.ReactNode }) {
  const { user, logout } = usePrivy();
  const { disconnect } = useDisconnect();

  const { linkEmail } = useLinkAccount();
  const address = user?.wallet?.address;
  const email = user?.email?.address;
  const handleDisconnect = () => {
    logout();
    disconnect();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="bg-sidebar border-none text-sidebar-content px-3 py-5 mr-2 mt-1">
        <DropdownMenuItem
          className="hover:bg-white/20 focus:bg-white/20 cursor-pointer px-3"
          onClick={() => handleCopyAddress(address)}
        >
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Wallet className="w-4" />
              <p>{truncateAddr(address, 8)}</p>
            </div>
            <Copy className="w-4" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={linkEmail}
          className="flex items-center focus:bg-white/20 cursor-pointer px-3"
        >
          <Mail /> <p>Link email</p>
          <span className="text-xs text-gray-400">
            {email && email.length > 15 ? `${email.slice(0, 15)}...` : email}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 focus:bg-white/20 cursor-pointer px-3">
          <PhoneOutgoing />
          <p>Contact support</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 focus:bg-white/20 cursor-pointer px-3"
          onClick={handleDisconnect}
        >
          <ArrowRightToLine />
          <p>Sign out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserWalletSettings;
