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

  const steps = [
    <StepOne key="s1" />,
    // <StepTwo key="s2" />,
    // <StepThree key="s3" />,
    // <StepFour key="s4" />,
    // <StepFive key="s5" />,
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
    alert("Form submitted successfully!");
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
                    style={{
                      background:
                        "linear-gradient(180deg, #1E5AA8 0%, #2379BC 100%)",
                    }}
                    className="rounded-2xl cursor-pointer  px-6 py-3"
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </div>
              <Bottom step={step} />
            </form>
          </Form>
        </FormProvider>
      </>
    </Layout>
  );
}
