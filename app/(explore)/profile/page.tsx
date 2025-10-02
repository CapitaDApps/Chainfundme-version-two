"use client";

import { Suspense, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/lib/Profileschemas";
import Profileform from "@/components/layout/profile/Profileform";
import ProfilePrivateClient from "@/components/layout/profile/ProfilePrivate";

export default function ProfilePage() {
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (data: any) => {
    console.log("Profile submitted:", data);
    setIsProfileSaved(true);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormProvider {...methods}>
        {!isProfileSaved ? (
          <Profileform onSave={methods.handleSubmit(handleSave)} />
        ) : (
          <ProfilePrivateClient />
        )}
      </FormProvider>
    </Suspense>
  );
}
