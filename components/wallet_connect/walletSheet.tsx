"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import { tokenNames } from "@/services/contracts/tokensConfig";
import { handleCopyAddress, truncateAddr } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import { Copy, WalletIcon } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import { MoonLoader } from "react-spinners";

import { useWalletBalance } from "./hooks/useWalletBalance";
import TransferDialog from "./transferDialog";
import FundWalletDialog from "./fundWalletDialog";
import { IToken } from "@/types/token.types";

function WalletSheet({ children }: { children: ReactNode }) {
  const { user } = usePrivy();

  const { tokenBalances } = useWalletBalance();

  const address = user?.wallet?.address;

  const connectorType = user?.wallet?.connectorType;

  const userETHBalance = tokenBalances.find(
    (token) => token.name === tokenNames.eth
  )?.balance;

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>

      <SheetContent className="hidden sm:block h-[95%] top-[3%] right-3 bg-sidebar border-[1px] border-white/20 rounded-2xl">
        <WalletSheetContent
          address={address}
          connectorType={connectorType}
          userETHBalance={userETHBalance}
          tokenBalances={tokenBalances}
        />
      </SheetContent>
    </Sheet>
  );
}

export default WalletSheet;

export function UserMobileSheet({ children }: { children: ReactNode }) {
  const { user } = usePrivy();

  const { tokenBalances } = useWalletBalance();

  const address = user?.wallet?.address;

  const connectorType = user?.wallet?.connectorType;

  const userETHBalance = tokenBalances.find(
    (token) => token.name === tokenNames.eth
  )?.balance;

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>

      <SheetContent
        side="bottom"
        className="bg-sidebar border-t-[1px] border-white/20 rounded-3xl block sm:hidden"
      >
        <WalletSheetContent
          address={address}
          connectorType={connectorType}
          userETHBalance={userETHBalance}
          tokenBalances={tokenBalances}
        />
      </SheetContent>
    </Sheet>
  );
}

type WalletSheetProps = {
  address: string | undefined;
  userETHBalance: string | undefined;
  connectorType: string | undefined;
  tokenBalances: IToken[];
};

function WalletSheetContent({
  address,
  userETHBalance,
  connectorType,
  tokenBalances,
}: WalletSheetProps) {
  return (
    <>
      <SheetHeader>
        <SheetTitle className="text-sidebar-content text-left">
          Wallet
        </SheetTitle>
      </SheetHeader>

      <div className="px-3">
        <div className="border-[1px] border-gray-300 rounded-3xl px-3 py-3 mt-3">
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <WalletIcon className="w-4 text-sidebar-content" />
              <p className="text-sidebar-content text-sm sm:text-base">
                {truncateAddr(address, 10)}
              </p>
            </div>
            <Copy
              className="w-4 text-sidebar-content"
              onClick={() => handleCopyAddress(address)}
            />
          </div>

          <p className="text-lg sm:text-2xl mt-6 text-sidebar-content">
            {userETHBalance?.slice(0, 8)} ETH
          </p>

          <div className="flex items-center gap-3 sm:gap-2 mt-6">
            {connectorType === "embedded" ? (
              <TransferDialog>
                <Button className="flex-1 border-[1px] border-gray-300 bg-white/5 text-sidebar-content hover:bg-gray-200 shadow-lg">
                  Transfer
                </Button>
              </TransferDialog>
            ) : (
              <Button
                className="flex-1 bg-gray-700/50 text-white/50 flex flex-col leading-[0px]"
                disabled
              >
                <span className="text-xs -mt-2">Transfer</span>
                <span className="block text-[10px]">Only embedded wallets</span>
              </Button>
            )}

            <FundWalletDialog />
          </div>
        </div>
      </div>

      <div className="mt-8 px-3">
        <div>
          <p className="text-gray-600 font-bold">Portfolio</p>
        </div>

        {tokenBalances.length == 0 ? (
          <MoonLoader className="mx-auto mt-5" color="#fff" size={20} />
        ) : (
          <div className="mt-3 space-y-6">
            {tokenBalances.map((tokenBalance) => (
              <div
                className="flex items-center justify-between"
                key={tokenBalance.name}
              >
                <div className="flex items-center gap-2">
                  <Image
                    width={50}
                    height={50}
                    alt={""}
                    src={tokenBalance.src}
                    quality={100}
                    className="w-6 h-6 rounded-full"
                  />
                  <p className="text-sidebar-content text-xs">
                    {tokenBalance.name}
                  </p>
                </div>

                <p className="text-xs text-sidebar-content">
                  {tokenBalance.balance}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
