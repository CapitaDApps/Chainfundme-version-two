import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/features/accountManagement/accountSchema";
import toast from "react-hot-toast";
import { Account } from "@/services/type";
import { format } from "date-fns";
import { useCreateAccount, useCreateInvitedAccount } from "../useAccountMutation";

type FormValues = z.infer<typeof formSchema>;

interface UseAccountFormOptions {
  initialValues?: Partial<Account>;
  isInvitationMode?: boolean;
  invitationToken?: string;
}

export const useAccountForm = ({
  initialValues = {},
  isInvitationMode = false,
  invitationToken,
}: UseAccountFormOptions = {}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  
  // Use different mutations based on invitation mode
  const { mutate: createAccount, isPending: isCreatingDirect } = useCreateAccount();
  const { mutate: createInvitedAccount, isPending: isCreatingInvited } = useCreateInvitedAccount();
  
  const isCreating = isInvitationMode ? isCreatingInvited : isCreatingDirect;

  const parsedInitialValues = {
    ...initialValues,
    startDate: initialValues.startDate
      ? typeof initialValues.startDate === "string"
        ? new Date(initialValues.startDate)
        : initialValues.startDate
      : undefined,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      telephone: "",
      emergencyContact: "",
      email: "",
      address: "",
      password: "",
      image: undefined,
      role: "",
      ...parsedInitialValues,
    },
  });

  const handleImageUpload = (file: File) => {
    setImage(file);
    form.setValue("image", file);
  };

  const removeImg = () => {
    setImage(null);
    form.setValue("image", undefined);
    form.trigger("image");
  };

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    const formData = new FormData();

    try {
      Object.entries(data).forEach(([key, value]) => {
        if (key === "startDate" && value) {
          formData.append(key, format(value, "yyyy-MM-dd"));
        } else if (key !== "image" && value) {
          formData.append(key, value.toString());
        }
      });

      if (image) {
        formData.append("image", image);
      }

      // Add invitation token if in invitation mode
      if (isInvitationMode && invitationToken) {
        formData.append("invitationToken", invitationToken);
      }

      const mutationFn = isInvitationMode ? createInvitedAccount : createAccount;
      
      mutationFn(formData, {
        onSuccess: () => {
          form.reset();
          setImage(null);
          toast.success(
            isInvitationMode 
              ? "Account created successfully! You can now log in." 
              : "Account created successfully!"
          );
        },
        onError: (error) => {
          console.error("Error submitting form:", error);
          toast.error("There was a problem submitting your information.");
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was a problem submitting your information.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    onSubmit,
    handleImageUpload,
    isSubmitting,
    isCreating,
    image,
    setImage,
    removeImg,
  };
};
