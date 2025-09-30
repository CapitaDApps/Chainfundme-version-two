import ClientShell from "@/app/(explore)/ClientShell";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NextTopLoader color="#2379bc" height={4} showSpinner={false} />
      <ClientShell>{children}</ClientShell>
    </div>
  );
}
