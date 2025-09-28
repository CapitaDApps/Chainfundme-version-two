"use client";

import { MoonLoader } from "react-spinners";
import { Button } from "../ui/button";
import { usePrivy } from "@privy-io/react-auth";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomConnectButton({ text, func }: { text: string; func?: any }) {
  const { ready } = usePrivy();

  return (
    <Button
      className="text-white min-w-24"
      onClick={func}
      disabled={!ready}
      style={{
        background:
          "linear-gradient(270.05deg, #003def 68.33%, #001f7a 114.25%)",
      }}
    >
      {!ready ? <MoonLoader size={15} color="#fff" /> : text}
    </Button>
  );
}
export default CustomConnectButton;
