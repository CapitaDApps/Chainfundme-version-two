"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import { handleCopyAddress, truncateAddr } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import { Copy, WalletIcon } from "lucide-react";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { ClipLoader, FadeLoader, MoonLoader } from "react-spinners";

import { IToken } from "@/types/token.types";
import { zeroAddress } from "viem";
import FundWalletDialog from "./fundWalletDialog";
import { useWalletBalance } from "./hooks/useWalletBalance";
import TransferDialog from "./transferDialog";
import ChangeNetwork from "./changeNetwork";
import { useChains } from "@/services/api/hooks/chain/useChains";
import { useSwitchChain } from "wagmi";

function WalletSheet({ children }: { children: ReactNode }) {
  const { user } = usePrivy();

  const { tokenBalances, isFetching } = useWalletBalance();

  const address = user?.wallet?.address;

  const connectorType = user?.wallet?.connectorType;

  return (
    <Sheet>
      <SheetTrigger className="w-full text-left">{children}</SheetTrigger>

      <SheetContent className="hidden sm:block h-[95%] top-[3%] right-3 bg-sidebar border-[1px] border-white/20 rounded-2xl">
        <WalletSheetContent
          address={address}
          connectorType={connectorType}
          tokenBalances={tokenBalances}
          isFetchingBalances={isFetching}
        />
      </SheetContent>
    </Sheet>
  );
}

export default WalletSheet;

export function UserMobileSheet({ children }: { children: ReactNode }) {
  const { user } = usePrivy();

  const { tokenBalances, isFetching } = useWalletBalance();

  const address = user?.wallet?.address;
  console.log({ tokenBalances });

  const connectorType = user?.wallet?.connectorType;

  return (
    <Sheet>
      <SheetTrigger className="w-full text-left">{children}</SheetTrigger>

      <SheetContent
        side="bottom"
        className="bg-sidebar border-t-[1px] border-white/20 rounded-3xl block sm:hidden pb-10"
      >
        <WalletSheetContent
          address={address}
          connectorType={connectorType}
          tokenBalances={tokenBalances}
          isFetchingBalances={isFetching}
        />
      </SheetContent>
    </Sheet>
  );
}

type WalletSheetProps = {
  address: string | undefined;
  connectorType: string | undefined;
  tokenBalances: IToken[];
  isFetchingBalances: boolean;
};

function WalletSheetContent({
  address,
  connectorType,
  tokenBalances,
  isFetchingBalances,
}: WalletSheetProps) {
  const token = tokenBalances.find((token) => token.address === zeroAddress);
  const { chains } = useChains();
  const { switchChain } = useSwitchChain();
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const handleSwitchChain = (networkId: string) => {
    switchChain({ chainId: +networkId });
    setSelectedNetwork(networkId);
  };
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
            {token?.balance?.slice(0, 8)} {token?.symbol}
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

      {isFetchingBalances ? (
        <div className="mt-8 flex justify-center">
          <FadeLoader color="#364153" height={10} width={3} />
        </div>
      ) : (
        <div className="mt-5 px-3">
          <ChangeNetwork
            chains={chains}
            handleSwitchChain={handleSwitchChain}
            selectedNetwork={selectedNetwork}
            className="border-gray-200 mb-5"
          />
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
      )}
    </>
  );
}
