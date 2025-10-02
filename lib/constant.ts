import { z } from "zod";

export const creator = [
  {
    value: "individual",
    name: "Individual",
  },
  {
    value: "organization",
    name: "Organization",
  },
  {
    value: "start-up",
    name: "Start up",
  },
  {
    value: "dao",
    name: "DAO",
  },
];
export const category = [
  {
    value: "travel",
    name: "Travel",
  },
  {
    value: "health",
    name: "Health",
  },
  {
    value: "academics",
    name: "Academics",
  },
  {
    value: "crises-relief",
    name: "Crises Relief",
  },
  {
    value: "community-rescue",
    name: "Comunity Rescue",
  },
  {
    value: "creativies/community",
    name: "Creativies/Community",
  },

  {
    value: "religious-organization",
    name: "Religious Organization",
  },
  {
    value: "government-organization",
    name: "Government Organization",
  },
];

export const CampaignFormSchema = z.object({
  cover: z
    .instanceof(File, { message: "Please upload a cover image." })
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: "Cover must be smaller than 5MB.",
    }),

  avatar: z
    .instanceof(File, { message: "Please upload an avatar image." })
    .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
      message: "Only PNG or JPG images are allowed.",
    }),
  campaignName: z
    .string({ message: "Campaign name is required" })
    .min(2, { message: "Campaign must be at least 2 characters." }),
  fundingTarget: z
    .string({ message: "Funding target is required" })
    .min(2, { message: "" }),

  bio: z
    .string({ message: "Bio is required" })
    .min(100, { message: "Bio must be at least 100 characters." }),

  creator: z
    .string({ message: "Please select a creator type" })
    .min(1, "Please select a creator type"),
  chain: z
    .string({ message: "Please select a chain" })
    .min(1, "Please select a chain"),

  category: z
    .string({ message: "Please select campaign category" })
    .min(1, "Please select campaign category"),

  startDate: z
    .string({ message: "Start date is required" })
    .min(1, "Start date is required"),

  endDate: z
    .string({ message: "End date is required" })
    .min(1, "End date is required"),
  tokens: z
    .array(
      z.object({
        name: z.string(),
        src: z.string(),
        decimals: z.number(),
        type: z.string(),
        address: z.string(),
      }),
      {
        message: "Please select a token.",
      }
    )
    .min(1, { message: "Please select at least one token." })
    .max(5, { message: "You can select up to 5 tokens only." }),
  supportingImages: z
    .array(
      z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "Only image files are allowed",
      })
    )
    .min(1, "At least 1 image is required")
    .max(5, "Maximum 5 images allowed"),
});
