"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base, baseSepolia, bsc, bscTestnet } from "wagmi/chains";
import { WagmiProvider } from "@privy-io/wagmi";
import { config } from "@/lib/networks/config";


import { addRpcUrlOverrideToChain } from "@privy-io/chains";

const baseOverride = addRpcUrlOverrideToChain(
  base,
  `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
);

const baseSepoliaOverride = addRpcUrlOverrideToChain(
  baseSepolia,
  `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
);

const mainnetSupportingChains = [baseOverride, bsc];
const devSupportingChains = [baseSepoliaOverride, bscTestnet];

const queryClient = new QueryClient();

function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        appearance: {
          walletChainType: "ethereum-only",
          walletList: [
            "detected_ethereum_wallets",
            "metamask",
            "coinbase_wallet",
            "phantom",
            "solflare",
          ],
          theme: "light",
        },

        externalWallets: {
          coinbaseWallet: {
            config: {
              preference: {
                options: "eoaOnly",
              },
            },
          },
        },

        embeddedWallets: {
          ethereum: { createOnLogin: "users-without-wallets" },
          showWalletUIs: true,
        },
        loginMethods: ["wallet", "email"],
        defaultChain:
          process.env.NEXT_PUBLIC_PRODUCTION == "false"
            ? baseSepoliaOverride
            : baseOverride,
        supportedChains:
          process.env.NEXT_PUBLIC_PRODUCTION == "false"
            ? devSupportingChains
            : mainnetSupportingChains,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
export default Web3Provider;