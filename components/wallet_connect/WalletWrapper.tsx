"use client";

import { useAccount } from "wagmi";

import { connectingChain } from "@/lib/networks/config";
import { useEffect, useState } from "react";
import CustomConnectButton from "./CustomConnectButton";

import { truncateAddr } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import { usePrivyAccount } from "../../hooks/usePrivyAccount";
import WalletSheet, { UserMobileSheet } from "./walletSheet";
import WrongNetworkModal from "./wrongNetworkModal";

export default function WalletWrapper({
  children,
}: {
  children?: React.ReactNode;
}) {
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
          <div className="hidden sm:block w-full">
            <WalletSheet>
              {children ? (
                children
              ) : (
                <CustomConnectButton
                  text={truncateAddr(address)}
                  asTrigger={true}
                />
              )}
            </WalletSheet>
          </div>
          <div className="block sm:hidden w-full">
            <UserMobileSheet>
              {children ? (
                children
              ) : (
                <CustomConnectButton
                  text={truncateAddr(address)}
                  asTrigger={true}
                />
              )}
            </UserMobileSheet>
          </div>
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
