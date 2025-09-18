"use client";

import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Step Schemas
const Step1Schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
});

const Step2Schema = z.object({
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number too short"),
});

const Step3Schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Merge schemas
const FormSchema = Step1Schema.merge(Step2Schema).merge(Step3Schema);
type FormData = z.infer<typeof FormSchema>;

// Step 1
function Step1() {
  const { control } = useFormContext<FormData>();
  return (
    <div className="space-y-4">
      <FormField<FormData>
        control={control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter first name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField<FormData>
        control={control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter last name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

// Step 2
function Step2() {
  const { control } = useFormContext<FormData>();
  return (
    <div className="space-y-4">
      <FormField<FormData>
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Enter email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField<FormData>
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="Enter phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

// Step 3
function Step3() {
  const { control } = useFormContext<FormData>();
  return (
    <div className="space-y-4">
      <FormField<FormData>
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Enter password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField<FormData>
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Confirm password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default function MultiStepForm() {
  const methods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });
  const [step, setStep] = useState(0);

  const steps = [<Step1 key="s1" />, <Step2 key="s2" />, <Step3 key="s3" />];

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    if (step === 0) fieldsToValidate = ["firstName", "lastName"];
    if (step === 1) fieldsToValidate = ["email", "phone"];
    if (step === 2) fieldsToValidate = ["password", "confirmPassword"];

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
    <FormProvider {...methods}>
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-6 border rounded-lg shadow-md space-y-6"
        >
          {steps[step]}

          <div className="flex justify-between pt-4">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}
