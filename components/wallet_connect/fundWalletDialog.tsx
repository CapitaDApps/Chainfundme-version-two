"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFundWallet, usePrivy } from "@privy-io/react-auth";

import { Button } from "../ui/button";

export default function FundWalletDialog() {
  const { user } = usePrivy();
  const { fundWallet } = useFundWallet();
  const address = user?.wallet?.address;
  const [amount, setAmount] = useState("0.01");
  const handleFund = () => {
    if (address) {
      fundWallet(address, { amount });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 border-[1px] border-gray-300 bg-white/5 text-sidebar-content hover:bg-gray-200 shadow-lg">
          Fund Wallet
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-sidebar">
        <DialogHeader>
          <DialogTitle className="text-sidebar-content text-left">
            Fund Wallet
          </DialogTitle>
        </DialogHeader>

        <div className="border-[1px] border-gray-300 py-4 px-5 rounded-2xl">
          <p className="text-left text-sidebar-content">Amount (ETH)</p>
          <Input
            className="mt-2 px-0 border-0 rounded-2xl focus:outline-none text-xl text-sidebar-content w-full"
            type="number"
            placeholder="0.01"
            value={amount}
            min={0}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <Button
          className="mt-1 w-full border-none bg-primary text-gray-200"
          onClick={handleFund}
          style={{
            background:
              "linear-gradient(270.05deg, #003def 68.33%, #001f7a 114.25%)",
          }}
        >
          Fund
        </Button>
      </DialogContent>
    </Dialog>
  );
}
