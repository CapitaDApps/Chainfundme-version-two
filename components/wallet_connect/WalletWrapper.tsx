"use client";

// import { Avatar, Name } from "@coinbase/onchainkit/identity";
// import {
//   ConnectWallet,
//   Wallet,
//   WalletAdvancedAddressDetails,
//   WalletAdvancedTransactionActions,
//   WalletAdvancedWalletActions,
//   WalletDropdown,
// } from "@coinbase/onchainkit/wallet";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { config, connectingChain } from "@/lib/networks/config";
import CustomConnectButton from "./CustomConnectButton";

import { useLinkAccount, usePrivy } from "@privy-io/react-auth";
import { handleCopyAddress, truncateAddr } from "@/lib/utils";
import WalletSheet, { UserMobileSheet } from "./walletSheet";
import { usePrivyAccount } from "../../hooks/usePrivyAccount";
import {
  ArrowRightToLine,
  Copy,
  Mail,
  Settings,
  Wallet,
  PhoneOutgoing,
} from "lucide-react";

export default function WalletWrapper() {
  const { chainId } = useAccount();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { login, authenticated } = usePrivy();
  useEffect(() => {
    if (chainId && !connectingChain.includes(chainId)) {
      setIsOpenModal(true);
    } else {
      setIsOpenModal(false);
    }
  }, [chainId]);

  const { address } = usePrivyAccount();
  return (
    <>
      {authenticated ? (
        <div className="flex items-center gap-5">
          <div className="hidden sm:block">
            <WalletSheet>
              <CustomConnectButton text={truncateAddr(address)} />
            </WalletSheet>
          </div>
          <div className="block sm:hidden">
            <UserMobileSheet>
              <CustomConnectButton text={truncateAddr(address)} />{" "}
            </UserMobileSheet>
          </div>
          <UserMenu>
            <Settings color="#000" />
          </UserMenu>
        </div>
      ) : (
        <CustomConnectButton text="Sign in" func={login} />
      )}
      <WrongNetworkModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </>
  );
}

function UserMenu({ children }: { children: ReactNode }) {
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
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
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

function WrongNetworkModal({
  isOpenModal,
  setIsOpenModal,
}: {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { switchChain } = useSwitchChain({ config: config });
  return (
    <AlertDialog open={isOpenModal}>
      <AlertDialogContent className="border-none flex flex-col items-center gap-3">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm text-center text-white font-normal">
            Wrong network
          </AlertDialogTitle>
          <AlertDialogDescription className="flex items-center text-silver flex-col text-xs">
            You&apos;ve connected to the wrong network
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="items-end">
          <AlertDialogAction
            className="text-white"
            style={{
              background:
                "linear-gradient(270.05deg, #003DEF 68.33%, #001F7A 114.25%)",
            }}
            onClick={() => {
              switchChain({
                chainId:
                  process.env.NEXT_PUBLIC_PRODUCTION == "true"
                    ? base.id
                    : baseSepolia.id,
              }); // switch by default to base / base Sepolia
              setIsOpenModal(false);
            }}
          >
            Switch
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
