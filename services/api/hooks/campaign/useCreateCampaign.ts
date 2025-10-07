import { CampaignFormSchema } from "@/lib/constant";
import { config } from "@/lib/networks/config";
import { useMutation } from "@tanstack/react-query";
import { getChainId } from "wagmi/actions";
import z from "zod";
import { createCampaignDraft } from "../../campaign";

export function useCreateCampaign() {
  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: async (data: z.infer<typeof CampaignFormSchema>) => {
      const chainId = getChainId(config);
      // console.log({ sd: data.startDate });
      // const startDateTime = new Date(data.startDate).getTime() + 3 * 60 * 1000;
      // console.log({ sdt: new Date(startDateTime).toISOString() });
      return await createCampaignDraft({
        title: data.campaignName,
        description: data.bio,
        image: data.avatar,
        coverImage: data.cover,
        category: data.category,
        targetAmount: +data.fundingTarget,
        startDate: data.startDate,
        endDate: data.endDate,
        chain: chainId.toString(),
        otherImages: data.supportingImages,
        creator: data.creator,
        tokenAddresses: data.tokens,
      });
    },
  });

  return { createCampaignFunc: mutate, isSaving };
}
