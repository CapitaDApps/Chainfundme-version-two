import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChainDocument } from "@/types/api";
import { Avatar, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

function ChangeNetwork({
  chains,
  selectedNetwork,
  handleSwitchChain,
  className = "",
}: {
  chains: ChainDocument[];
  selectedNetwork: string;
  handleSwitchChain: (networkId: string) => void;
  className?: string;
}) {
  return (
    <Select
      onValueChange={(val) => handleSwitchChain(val)}
      value={selectedNetwork}
    >
      <SelectTrigger
        className={cn("border-[1px] border-primary-accent flex-1", className)}
      >
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
