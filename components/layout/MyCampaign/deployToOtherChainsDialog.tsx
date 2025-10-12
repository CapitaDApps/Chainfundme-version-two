import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNetworkChange } from "@/components/wallet_connect/hooks/useNetworkChange";
import { usePublish } from "@/services/api/hooks/campaign/usePublish";
import { useChains } from "@/services/api/hooks/chain/useChains";
import { useNetworkTokens } from "@/services/api/hooks/token/useNetworkTokens";
import { useWriteCampaign } from "@/services/contracts/hooks/useWriteCampaign";
import { ReturnCampaignDocument, TokenDocument } from "@/types/api";
import { set } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeployToOtherChainsDialog({
  campaign,
  handleReDeploy,
}: {
  campaign: ReturnCampaignDocument;
  handleReDeploy: (networkId: string, tokens: string[]) => void;
}) {
  const [selectedTokens, setSelectedTokens] = useState<TokenDocument[]>([]);
  const [tokensMenuOpen, setTokensMenuOpen] = useState(false);
  const { selectedNetwork, handleSwitchChain } = useNetworkChange();
  const { chains } = useChains();
  const { tokens: networkTokens, defaultTokens } = useNetworkTokens();
  const { publish, publishing } = usePublish();
  const { createChainFundMe } = useWriteCampaign();
  const alreadyDeployedChains = campaign.chains.map((chain) => chain.networkId);

  const defaultTokensAddr = defaultTokens.map((token) => token.address);

  const handleSelectTokens = (token: TokenDocument) => {
    setSelectedTokens((curr) => {
      if (curr.some((t) => t.address === token.address)) {
        return curr.filter((t) => t.address !== token.address);
      }
      return [...curr, token];
    });
  };

  const handleNetworkSelect = (networkId: string) => {
    handleSwitchChain(networkId);
    setSelectedTokens([]);
  };

  const handleDeploy = () => {
    const tokens = selectedTokens.map((token) => token.address);
    handleReDeploy(selectedNetwork, tokens);
  };

  return (
    <Dialog>
      <DialogTrigger onClick={(e) => e.stopPropagation()}>
        Deploy to other chains
      </DialogTrigger>
      <DialogContent
        onClick={(e) => {
          e.stopPropagation();
          setTokensMenuOpen(false);
        }}
      >
        <DialogHeader>
          <DialogTitle>Deploy to other chains</DialogTitle>
          <DialogDescription>
            Deploy current pending campaign across other chains
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Select
            onValueChange={(val) => handleNetworkSelect(val)}
            value={selectedNetwork}
          >
            <SelectTrigger className="border-[1px] border-primary-accent flex-1 h-8">
              <SelectValue placeholder="Select Chain" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {chains.map((chain) => (
                <SelectItem
                  value={chain.networkId.toString()}
                  key={chain.networkId}
                  disabled={alreadyDeployedChains.includes(chain.networkId)}
                >
                  <Avatar className="w-4 h-4">
                    <AvatarImage src={chain.imagePath} />
                    <AvatarFallback>{chain.symbol}</AvatarFallback>
                  </Avatar>
                  {chain.symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div
            className={`border-[1px] border-primary-accent flex-1 h-8 rounded-md py-1 px-2 flex items-center justify-between text-gray-500 relative select-none ${
              tokensMenuOpen ? "rounded-b-none" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setTokensMenuOpen((curr) => !curr);
            }}
          >
            <p className="text-sm">Select tokens</p>
            <ChevronsUpDown size={15} />

            {tokensMenuOpen && (
              <div
                className="absolute rounded-b-md top-8 w-full bg-white shadow-md max-h-[100px] left-0 p-1 space-y-2 overflow-y-auto z-20"
                onClick={(e) => e.stopPropagation()}
              >
                {networkTokens.map((token) =>
                  defaultTokensAddr.includes(token.address) ? (
                    <div
                      key={token.address}
                      className="flex justify-between items-center px-2 py-1 rounded-md opacity-45"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={token.imagePath} />
                        </Avatar>
                        <p className="text-secondary-text">{token.name}</p>
                      </div>

                      <Check size={15} />
                    </div>
                  ) : (
                    <div
                      key={token.address}
                      onClick={() => handleSelectTokens(token)}
                      className="flex justify-between items-center hover:bg-gray-100 px-2 py-1 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={token.imagePath} />
                        </Avatar>
                        <p className="text-secondary-text">{token.name}</p>
                      </div>
                      {selectedTokens.some(
                        (t) => t.address === token.address
                      ) && <Check size={15} />}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {selectedNetwork && (
          <div className="flex items-center gap-2 flex-wrap">
            {[...defaultTokens, ...selectedTokens].map((token) => (
              <div
                className="bg-gray-100 px-2 py-1 flex items-center gap-2 rounded-xl"
                key={token.address}
              >
                <Avatar className="w-5 h-5">
                  <AvatarImage src={token.imagePath} />
                </Avatar>
                <p className="text-secondary-text">{token.name}</p>
              </div>
            ))}
          </div>
        )}

        <DialogFooter>
          <Button
            disabled={publishing}
            onClick={(e) => {
              e.stopPropagation();
              handleDeploy();
            }}
          >
            {publishing ? "Deploying" : "Deploy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
