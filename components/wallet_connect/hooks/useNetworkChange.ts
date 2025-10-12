import { useState } from "react";
import { useSwitchChain } from "wagmi";

function useNetworkChange() {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const { switchChain } = useSwitchChain();

  const handleSwitchChain = (networkId: string) => {
    setSelectedNetwork(networkId);
    switchChain({ chainId: +networkId });
  };

  return { selectedNetwork, handleSwitchChain };
}
export { useNetworkChange };
