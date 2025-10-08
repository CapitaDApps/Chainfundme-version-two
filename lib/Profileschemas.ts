import z from "zod";
const Schema = z.object({
  cover: z
    .instanceof(File, { message: "Please upload a cover image." })
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: "Cover must be smaller than 5MB.",
    })
    .optional(),
  avatar: z
    .instanceof(File, { message: "Please upload an avatar image." })
    .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
      message: "Only PNG or JPG images are allowed.",
    })
    .optional(),
  name: z
    .string({ message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters." }),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.string().optional(),
  bio: z
    .string({ message: "Bio is required" })
    .min(10, { message: "Bio must be at least 10 characters." }),
});
export const FormSchema = Schema;
