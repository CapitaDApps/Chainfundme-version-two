import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChainDocument } from "@/types/api";
import { Avatar, AvatarImage } from "../ui/avatar";

function ChangeNetwork({
  chains,
  selectedNetwork,
  handleSwitchChain,
}: {
  chains: ChainDocument[];
  selectedNetwork: string;
  handleSwitchChain: (networkId: string) => void;
}) {
  return (
    <Select
      onValueChange={(val) => handleSwitchChain(val)}
      value={selectedNetwork}
    >
      <SelectTrigger className="border-[1px] border-primary-accent flex-1">
        <SelectValue placeholder="Select Chain" />
      </SelectTrigger>
      <SelectContent>
        {chains.map((chain) => (
          <SelectItem value={chain.networkId.toString()} key={chain.networkId}>
            <Avatar className="w-4 h-4">
              <AvatarImage src={chain.imagePath} />
            </Avatar>
            {chain.symbol}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
export default ChangeNetwork;
