import z from "zod";
const Schema = z.object({
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
  name: z
    .string({ message: "Campaign name is required" })
    .min(2, { message: "Campaign must be at least 2 characters." }),
  twitter: z.string({ message: "Twitter link is required" }),
  facebook: z.string({ message: "Facebook link is required" }),
  linkedin: z.string({ message: "LinkedIn link is required" }),
  website: z.string({ message: "Website link is required" }),
  bio: z
    .string({ message: "Bio is required" })
    .min(100, { message: "Bio must be at least 100 characters." }),
});
export const FormSchema = Schema;
