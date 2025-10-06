"use client";
import Profileform from "@/components/layout/profile/Profileform";
import { FormSchema } from "@/lib/Profileschemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

function Page() {
  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  return (
    <FormProvider {...methods}>
      <Profileform />
    </FormProvider>
  );
}
export default Page;
