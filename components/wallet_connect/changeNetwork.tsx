import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { allowedChains, getEnvChainId } from "@/lib/networks/config";
import { NetworkName } from "@/lib/networks/types";
import { useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function ChangeNetwork() {
  const { chainId } = useAccount();
  console.log({ chainId });
  const [networkChange, setNetworkChange] = useState<NetworkName>("Base");
  const { switchChain } = useSwitchChain();
  const handleNetworkChange = (val: NetworkName) => {
    setNetworkChange(val);
    const chainId = getEnvChainId(val);
    switchChain({ chainId });
  };
  return (
    <Select
      value={networkChange}
      onValueChange={(val) => handleNetworkChange(val as NetworkName)}
    >
      <SelectTrigger className="w-fit border-[1px]">
        <SelectValue defaultValue={"Base"} />
      </SelectTrigger>
      <SelectContent>
        {allowedChains
          .filter((chain) => !chain.testnet)
          .map((chain) => (
            <SelectItem value={chain.value} key={chain.networkId}>
              <Avatar className="w-4 h-4">
                <AvatarImage src={chain.image} />
                <AvatarFallback>{chain.symbol}</AvatarFallback>
              </Avatar>
              <p>{chain.symbol}</p>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
export default ChangeNetwork;
