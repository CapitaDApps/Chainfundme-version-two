import z from "zod";

const Step1Schema = z.object({
  campaignName: z
    .string({ message: "Campaign name is required" })
    .min(2, { message: "Campaign must be at least 2 characters." }),
  creator: z
    .string({ message: "Please select a creator type" })
    .min(1, "Please select a creator type"),
  category: z
    .string({ message: "Please select campaign category" })
    .min(1, "Please select campaign category"),
  startDate: z
    .string({ message: "Start date is required" })
    .min(1, "Start date is required"),

  endDate: z
    .string({ message: "End date is required" })
    .min(1, "End date is required"),
});

const Step2Schema = z.object({
  cover: z
    .instanceof(File, { message: "Please upload a cover image." })
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: "Cover must be smaller than 5MB.",
    }),
  // avatar: z
  //   .instanceof(File, { message: "Please upload an avatar image." })
  //   .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
  //     message: "Only PNG or JPG images are allowed.",
  //   }),
  supportingImages: z
    .array(
      z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "Only image files are allowed",
      })
    )
    .min(1, "At least 1 image is required")
    .max(5, "Maximum 5 images allowed"),
  supportingVideos: z
    .array(z.union([z.instanceof(File), z.string().url().or(z.literal(""))]))
    .max(3, { message: "You can upload up to 3 videos only" })
    .optional(),
  supportingDocuments: z
    .array(z.union([z.instanceof(File), z.string().url().or(z.literal(""))]))
    .max(5, { message: "You can upload up to 5 documents only" })
    .optional(),
  twitter: z.string({ message: "Twitter link is required" }),
  facebook: z.string({ message: "Twitter link is required" }).optional(),
  telegram: z.string({ message: "Twitter link is required" }).optional(),
  website: z.string({ message: "Twitter link is required" }).optional(),
});

const Step3Schema = z.object({
  bio: z
    .string({ message: "Bio is required" })
    .min(100, { message: "Bio must be at least 100 characters." }),
});
const Step4Schema = z.object({
  amount: z
    .string({ message: "Amount is required" })
    .min(3, { message: "Amount must be at least 3 numbers." }),
  chain: z
    .string({ message: "Please select a chain" })
    .min(1, "Please select a chain"),

  tokens: z
    .array(z.string(), {
      message: "Please select a token.",
    })
    .min(1, { message: "Please select at least one token." })
    .max(5, { message: "You can select up to 5 tokens only." }),
});
const Step5Schema = z.object({
  agree: z.boolean().refine((val) => val === true, {
    message: "You must accept terms",
  }),
});

export const FormSchema = Step1Schema.merge(Step2Schema)
  .merge(Step3Schema)
  .merge(Step4Schema)
  .merge(Step5Schema);
