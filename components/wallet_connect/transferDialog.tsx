"use client";

import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { tokenNames } from "@/services/contracts/tokensConfig";

import { usePrivy } from "@privy-io/react-auth";
import { Wallet } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTransfer } from "./hooks/useTransfer";
import SelectCoin from "./selectCoin";
import { useWalletBalance } from "./hooks/useWalletBalance";

export default function TransferDialog({ children }: { children: ReactNode }) {
  const [selectedToken, setSelectedToken] = useState(tokenNames.eth);
  const [transferAmount, setTransferAmount] = useState("0");
  const [recipientAddress, setRecipientAddress] = useState("");

  const { user } = usePrivy();

  const { transfer } = useTransfer();
  const { tokenBalances } = useWalletBalance();

  const address = user?.wallet?.address;

  const balance =
    tokenBalances.find((token) => token.name === selectedToken)?.balance || "0";

  const handleConfirmation = async () => {
    if (!address) return console.log("No address");
    if (!recipientAddress) return console.log("No recipient address");
    if (+transferAmount > +balance) {
      return console.log("Insufficient balance");
    }
    if (+transferAmount <= 0) {
      return console.log("Transfer amount must be greater than 0");
    }

    await transfer({
      selectedToken,
      recipientAddress,
      transferAmount,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-sidebar max-w-[90%] sm:max-w-[400px]  md:max-w-[400px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-sidebar-content text-left">
            Transfer
          </DialogTitle>
        </DialogHeader>

        <div className="border-[1px] border-gray-400 py-4 px-5 rounded-2xl">
          <p className="text-left text-sidebar-content">Amount</p>

          <div className="mt-2 flex items-center gap-3">
            <Input
              className="flex-1 px-0 border-0 rounded-2xl focus:outline-none text-xl text-sidebar-content placeholder:text-sidebar-content w-full"
              type="number"
              placeholder="0"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
            {/* Select coin */}
            <SelectCoin
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
            />
          </div>
        </div>
        <div className="border-[1px] border-gray-400 px-5 mt-3 rounded-2xl py-1.5 flex justify-between items-center  text-sidebar-content">
          <p>Balance</p>

          <div className="flex items-center gap-3 text-xs">
            {+transferAmount == +balance && (
              <>
                <p>Maxed</p> <p>|</p>
              </>
            )}
            <div className="flex items-center text-gray-600 gap-1">
              <p>{balance}</p>
              <p className="">{selectedToken.toUpperCase()}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 border-[1px] border-gray-400 px-5 mt-3 rounded-2xl py-1.5">
          <Wallet className="w-4 text-sidebar-content" />

          <Input
            className="flex-1 border-0 rounded-2xl focus:outline-none text-sm placeholder:text-xs text-sidebar-content placeholder:text-gray-400 px-3"
            name="wallet"
            placeholder="Recipient wallet address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </div>

        <Button
          className="mt-3 w-full border-none bg-primary text-gray-200"
          onClick={handleConfirmation}
          style={{
            background:
              "linear-gradient(270.05deg, #003def 68.33%, #001f7a 114.25%)",
          }}
        >
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
}
