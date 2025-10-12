"use client";

import StepOne from "@/components/create-campaign/StepOne";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import Bottom from "@/components/create-campaign/Bottom";
import Layout from "@/components/create-campaign/Layout";
import { Prog } from "@/components/create-campaign/Prog";
import StepFive from "@/components/create-campaign/StepFive";
import StepFour from "@/components/create-campaign/StepFour";
import StepThree from "@/components/create-campaign/StepThree";
import StepTwo from "@/components/create-campaign/StepTwo";
import { FormSchema } from "@/lib/schemas";
import { useCreateCampaign } from "@/services/api/hooks/campaign/useCreateCampaign";
import { usePublish } from "@/services/api/hooks/campaign/usePublish";
import { useNetworkTokens } from "@/services/api/hooks/token/useNetworkTokens";
import { useWriteCampaign } from "@/services/contracts/hooks/useWriteCampaign";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
  const { publish, publishing } = usePublish();
  const router = useRouter();

  const [fulfilledSteps, setFulFillSteps] = useState(0);

  const { tokens: networkTokens } = useNetworkTokens();

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
    if (step === 3) fieldsToValidate = ["amount", "chain"];
    if (step === 4) fieldsToValidate = ["agree", "read"];

    const isValid = await methods.trigger(fieldsToValidate);

    console.log("Step validation:", isValid);

    if (isValid) {
      setStep((s) => s + 1);
      if (step >= fulfilledSteps) {
        setFulFillSteps((curr) => curr + 1);
      }
    }
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = (data: FormData) => {
    console.log("Final Data:", data);

    // Get tokens from existing token configuration

    // Transform token strings to token objects using existing config
    // const transformedTokens = data.tokens
    //   .map((tokenValue) => {
    //     const tokenInfo = networkTokens.find(
    //       (token) => token.address === tokenValue
    //     );
    //     return tokenInfo || "";
    //   })
    //   .filter((token) => token !== "");

    // Transform FormData to match CampaignFormSchema (what the hook expects)
    const transformedData = {
      ...data,
      fundingTarget: data.amount, // Map amount to fundingTarget
      avatar: data.cover, // Use cover as avatar since FormSchema doesn't have avatar
      tokens: data.tokens || [],
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
            new Date(data.startDate).getTime() / 1000
          );
          const endTime = Math.floor(new Date(data.endDate).getTime() / 1000);
          const tokenAddresses = data.tokens || [];

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
                toast.error(`Couldn't create campaign, please try again`);
                return;
              }
              publish(
                {
                  campaignId,
                  tokens: tokenAddresses,
                  networkId: chainId,
                },
                {
                  onSuccess: () => {
                    console.log("Campaign created successfully");

                    const uri = localStorage.getItem("campaignId");
                    if (uri) {
                      localStorage.removeItem("campaignId");
                    }

                    router.push(`/campaign/${campaignId}`);

                    toast.success(
                      "Campaign created and deployed successfully! 🎉"
                    );
                  },
                  onError: (err) => {
                    console.log({ "Error publishing campaign": err });
                  },
                }
              );
            }
          );
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
              <div className="max-w-3xl mx-auto">{steps[step]}</div>
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
                    className="rounded-2xl cursor-pointer  px-6 py-3 bg-primary-accent"
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSaving || publishing}>
                    {isSaving || publishing ? "Creating Campaign..." : "Create"}
                  </Button>
                )}
              </div>
              <Bottom
                setStep={setStep}
                step={step}
                fulfilledSteps={fulfilledSteps}
              />
            </form>
          </Form>
        </FormProvider>
      </>
    </Layout>
  );
}
