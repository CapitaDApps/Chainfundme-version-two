"use client";

import { usePrivy } from "@privy-io/react-auth";

export function usePrivyAccount() {
  const { user } = usePrivy();
  const address = user?.wallet?.address;
  return {
    address,
  };
}
