/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MoonLoader } from "react-spinners";
import { Button } from "../ui/button";
import { usePrivy } from "@privy-io/react-auth";

function CustomConnectButton({
  text,
  func,
  asTrigger,
}: {
  text: string;
  func?: any;
  asTrigger?: boolean;
}) {
  const { ready } = usePrivy();

  const buttonContent = (
    <>{!ready ? <MoonLoader size={15} color="#fff" /> : text}</>
  );

  if (asTrigger) {
    return (
      <div
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white min-w-24 px-4 py-2 cursor-pointer"
        onClick={func}
        style={{
          background:
            "linear-gradient(270.05deg, #003def 68.33%, #001f7a 114.25%)",
        }}
      >
        {buttonContent}
      </div>
    );
  }

  return (
    <Button
      className="text-white min-w-24 rounded-full"
      onClick={func}
      disabled={!ready}
      style={{
        background:
          "linear-gradient(270.05deg, #003def 68.33%, #001f7a 114.25%)",
      }}
    >
      {buttonContent}
    </Button>
  );
}
export default CustomConnectButton;
