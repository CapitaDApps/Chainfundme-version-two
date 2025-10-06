import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getChainData } from "@/lib/networks/config";
import { ReturnCampaignDocument } from "@/types/api";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
function FundDialog({
  campaign,
  children,
}: {
  campaign: ReturnCampaignDocument;
  children: React.ReactNode;
}) {
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const tokens = campaign.tokens;
  const chains = campaign.chains.map((chain) => getChainData(chain.networkId));

  // const tokensToChain = campaign.chains.map((chain) => {
  //   const tokensForChain = tokens.filter(
  //     (token) => token.chainId === chain.networkId
  //   );

  //   return {
  //     tokens: tokensForChain,
  //     chain: getChainData(chain.networkId),
  //   };
  // });

  const token = tokens.find((token) => token.address === selectedToken);

  const tokenName = token?.symbol.split("(")[0];

  const tokensForChosenChain = tokens.filter(
    (token) => token.chainId === +selectedNetwork
  );

  const handleDonate = async () => {
    if (isNaN(Number(amount)) || !amount)
      return toast.error(`Enter valid ${tokenName} amount`);
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="text-left">
          <DialogTitle>Support cause - {campaign.title}</DialogTitle>
          <DialogDescription>
            Select your network and token to contribute to this campaign
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          {/* Networks */}
          <Select
            onValueChange={(val) => setSelectedNetwork(val)}
            value={selectedNetwork}
          >
            <SelectTrigger className="border-[1px] border-primary-accent flex-1">
              <SelectValue
                placeholder="Select Chain"
                defaultValue={chains[0].symbol}
              />
            </SelectTrigger>
            <SelectContent>
              {chains.map((chain) => (
                <SelectItem
                  value={chain.networkId.toString()}
                  key={chain.networkId}
                >
                  <Avatar className="w-4 h-4">
                    <AvatarImage src={chain.image} />
                  </Avatar>
                  {chain.symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tokens */}
          {tokensForChosenChain.length > 0 && (
            <Select
              onValueChange={(val) => setSelectedToken(val)}
              value={selectedToken}
            >
              <SelectTrigger className="border-[1px] border-primary-accent flex-1">
                <SelectValue placeholder="Select tokens" />
              </SelectTrigger>

              <SelectContent>
                {tokensForChosenChain.map((token) => (
                  <SelectItem value={token.address} key={token.address}>
                    <Avatar className="w-4 h-4">
                      <AvatarImage src={token.imagePath} />
                    </Avatar>
                    {token.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {token && (
          <>
            <Input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className="h-9 border-[1px] border-primary-accent focus:outline-0 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-primary-accent px-4 placeholder:text-xs"
              placeholder={`Enter ${tokenName} Amount`}
            />
            <div className="border-[1px] border-primary-accent h-8 rounded-xl px-4 text-xs flex items-center justify-between">
              <p> Balance - 1029902</p>
              <Button
                className="h-5 text-xs rounded-sm shadow-lg"
                variant={"outline"}
              >
                Max
              </Button>
            </div>
            <Button
              className="bg-primary-accent rounded-xl"
              onClick={handleDonate}
            >
              Donate
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
export default FundDialog;
