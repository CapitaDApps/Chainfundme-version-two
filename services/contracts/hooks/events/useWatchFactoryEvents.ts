import { config } from "@/lib/networks/config";
import { getChainId } from "@wagmi/core";
import { useAccount, useWatchContractEvent } from "wagmi";
import FundingFactoryABI from "../../abi/CapitaFundingFactory.json";
import axios from "axios";
import { Log } from "viem";
import { usePrivy } from "@privy-io/react-auth";
import { contractEvents, networkContractAddresses } from "../../constants";

interface CreatedCampaignLog extends Log {
  args: {
    sender: string;
    fundMeAddress: string;
  };
}

export function useWatchFactoryEvents({
  eventName,
  cb,
}: {
  eventName: string;
  cb: () => Promise<void>;
}) {
  const { address: connectedAddress } = useAccount();

  const { getAccessToken } = usePrivy();

  const chainId = getChainId(config);
  const fundingFactoryAddress =
    networkContractAddresses[`${chainId}`].fundingFactoryAddress;

  useWatchContractEvent({
    abi: FundingFactoryABI,
    address: fundingFactoryAddress as `0x${string}`,
    eventName,
    onLogs: async (logs) => {
      console.log({ logs, connectedAddress });
      const accessToken = await getAccessToken();
      for (const log of logs) {
        if (eventName == contractEvents.FundingFactory.CampaignFunded) {
          if (
            (log as CreatedCampaignLog).args.sender.toLowerCase() ==
            connectedAddress?.toLowerCase()
          ) {
            console.log(`Event ${eventName} detected on funding factory`);
            await cb();
          }
        }
      }
    },
  });
}

// function useWatchFactoryEvents() {
//   const chainId = getChainId(config);

//   const fundingFactoryAddress =
//     networkContractAddresses[`${chainId}`].fundingFactoryAddress;

//   return {
//     watchFactoryEvent: (
//       eventName: string,
//       cb: (logs: Log[]) => Promise<void>
//     ) => {
//       const unWatch = watchContractEvent(config, {
//         abi: FundingFactoryABI,
//         address: fundingFactoryAddress as `0x${string}`,
//         eventName,

//         onLogs: async (logs) => {
//           await cb(logs);
//           unWatch();
//         },
//       });
//     },
//   };
// }
// export { useWatchFactoryEvents };
