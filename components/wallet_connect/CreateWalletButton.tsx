import WalletWrapper from "./WalletWrapper";

export default function CreateWalletButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="relative z-50">
      {children ? <WalletWrapper>{children}</WalletWrapper> : <WalletWrapper />}
    </div>
  );
}
