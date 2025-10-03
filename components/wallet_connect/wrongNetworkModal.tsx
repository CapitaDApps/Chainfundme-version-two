"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSwitchChain } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";

import { config } from "@/lib/networks/config";
import { Dispatch, SetStateAction } from "react";

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

export default WrongNetworkModal;
