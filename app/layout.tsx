import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Web3Provider from "./web3Provider";
import { Toaster } from "sonner";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  fallback: ["system-ui", "arial"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "ChainFundMe",
  description: "A decentralized platform for funding campaigns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} antialiased min-h-screen`}>
        <Web3Provider>{children}</Web3Provider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
