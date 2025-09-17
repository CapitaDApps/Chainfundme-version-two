import type { Metadata } from "next";
import { Sora } from "next/font/google";
import ClientShell from "@/app/ClientShell";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
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
      <body className={`${sora.variable} antialiased min-h-screen`}>
        <NextTopLoader color="#2379bc" height={4} showSpinner={false} />
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
