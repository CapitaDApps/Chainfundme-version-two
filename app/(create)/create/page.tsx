"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import StepOne from "@/components/create-campaign/StepOne";

import Layout from "@/components/create-campaign/Layout";
import { toast } from "sonner";
import { FormSchema } from "@/lib/schemas";
import { Prog } from "@/components/create-campaign/Prog";
import Bottom from "@/components/create-campaign/Bottom";
import StepTwo from "@/components/create-campaign/StepTwo";
import StepThree from "@/components/create-campaign/StepThree";
import StepFour from "@/components/create-campaign/StepFour";
import StepFive from "@/components/create-campaign/StepFive";
import { useCreateCampaign } from "@/services/api/hooks/campaign/useCreateCampaign";
import { getNetworkTokens } from "@/services/contracts/tokensConfig";
import { useWriteCampaign } from "@/services/contracts/hooks/useWriteCampaign";
import { useAccount } from "wagmi";

type FormData = z.infer<typeof FormSchema>;
const stepText = [
  { label: "Campaign basics" },
  { label: "Campaign media" },
  { label: "Campaign details" },
  { label: "Fundraising step" },
  { label: "Campaign review" },
];
export default function MultiStepForm() {
  const methods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });
  const [step, setStep] = useState(0);
  const { createCampaignFunc, isSaving } = useCreateCampaign();
  const { createChainFundMe } = useWriteCampaign();
  const { chainId, isConnected } = useAccount();

  const steps = [
    <StepOne key="s1" />,
    <StepTwo key="s2" />,
    <StepThree key="s3" />,
    <StepFour key="s4" />,
    <StepFive key="s5" />,
  ];

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    const x = methods.watch("twitter");
    if (!x && step === 1) toast("Social links is required");

    if (step === 0)
      fieldsToValidate = [
        "campaignName",
        "creator",
        "category",
        "startDate",
        "endDate",
      ];
    if (step === 1) fieldsToValidate = ["cover", "supportingImages", "twitter"];
    if (step === 2) fieldsToValidate = ["bio"];
    if (step === 3) fieldsToValidate = ["amount", "tokens", "chain"];
    if (step === 4) fieldsToValidate = ["agree"];

    const isValid = await methods.trigger(fieldsToValidate);

    console.log("Step validation:", isValid);

    if (isValid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = (data: FormData) => {
    console.log("Final Data:", data);

    // Get tokens from existing token configuration
    const chainTokens = getNetworkTokens();

    // Transform token strings to token objects using existing config
    const transformedTokens = data.tokens.map((tokenValue) => {
      const tokenInfo = chainTokens.find(
        (token) =>
          token.name.toLowerCase().includes(tokenValue.toLowerCase()) ||
          tokenValue.toLowerCase().includes(token.name.toLowerCase())
      );
      return (
        tokenInfo || {
          name: tokenValue.toUpperCase(),
          src: "/tokens/default.svg",
          decimals: 18,
          type: "Unknown",
          address: "0x...",
        }
      );
    });

    // Transform FormData to match CampaignFormSchema (what the hook expects)
    const transformedData = {
      ...data,
      fundingTarget: data.amount, // Map amount to fundingTarget
      avatar: data.cover, // Use cover as avatar since FormSchema doesn't have avatar
      tokens: transformedTokens, // Transform tokens to objects
    };

    console.log({ transformedData });

    createCampaignFunc(transformedData, {
      onSuccess: async (campaignId) => {
        console.log("Campaign created successfully with ID:", campaignId);

        try {
          // Check if wallet is connected and on correct chain
          if (!isConnected) {
            toast.error("Please connect your wallet first");
            return;
          }

          if (!chainId) {
            toast.error(
              "Unable to detect network. Please check your wallet connection"
            );
            return;
          }

          console.log("Deploying smart contract with chainId:", chainId);
          console.log("Is connected:", isConnected);

          // Deploy smart contract after backend campaign creation
          const startTime = Math.floor(
            (new Date(data.startDate).getTime() + 3 * 60 * 1000) / 1000
          );
          const endTime = Math.floor(new Date(data.endDate).getTime() / 1000);
          const tokenAddresses = transformedTokens.map(
            (token) => token.address
          );

          console.log("Smart contract deployment params:", {
            uri: campaignId,
            startTime,
            endTime,
            otherTokens: tokenAddresses,
          });

          await createChainFundMe(
            {
              uri: campaignId,
              startTime,
              endTime,
              otherTokens: tokenAddresses,
            },
            (error) => {
              if (error) {
                console.error("Smart contract deployment failed:", error);
                toast.error(`Smart contract deployment failed: ${error}`);
                throw new Error(`Smart contract deployment failed: ${error}`);
              }
            }
          );

          toast.success("Campaign created and deployed successfully! 🎉");
        } catch (error) {
          console.error("Blockchain deployment failed:", error);
          toast.error("Transaction Failed. Please try again.");
        }
      },
      onError: (error) => {
        console.error("Campaign creation failed:", error);
        toast.error("Failed to create campaign. Please try again.");
      },
    });
  };

  return (
    <Layout step={step}>
      <>
        <Prog steps={stepText} currentStep={step} />

        <FormProvider {...methods}>
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="">
              {steps[step]}
              {/* <StepTwo key="s2" /> */}

              <div className="flex items-center mt-4 justify-center gap-4 pt-4">
                {step > 0 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                )}
                {step < steps.length - 1 ? (
                  <Button
                    type="reset"
                    onClick={nextStep}
                    disabled={isSaving}
                    style={{
                      background:
                        "linear-gradient(180deg, #1E5AA8 0%, #2379BC 100%)",
                    }}
                    className="rounded-2xl cursor-pointer  px-6 py-3"
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Creating Campaign..." : "Submit"}
                  </Button>
                )}
              </div>
              <Bottom setStep={setStep} step={step} />
            </form>
          </Form>
        </FormProvider>
      </>
    </Layout>
  );
}
