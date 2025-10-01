import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import ClientShell from "@/app/(explore)/ClientShell";
import NextTopLoader from "nextjs-toploader";
import "../globals.css";

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
        <NextTopLoader color="#003DEF" height={4} showSpinner={false} />
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
