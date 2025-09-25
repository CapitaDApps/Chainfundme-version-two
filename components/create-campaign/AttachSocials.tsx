import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "@/lib/schemas";
import z from "zod";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaLink, FaTelegramPlane } from "react-icons/fa";
import { IoIosGlobe } from "react-icons/io";
import SocialsInput from "./form/form/SocialsInput";

export default function AttachSocials() {
  type FormData = z.infer<typeof FormSchema>;
  const { control } = useFormContext<FormData>();
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-fit bg-[#2170B6] text-white p-2 rounded-xl">
        <label className="flex items-center gap-2 cursor-pointer">
          <FaLink />
          <span className="text-xs">Social Links</span>
        </label>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm">
            Attach Socials
          </AlertDialogTitle>
          <AlertDialogDescription className="w-full">
            <div className="w-full space-y-2">
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                <SocialsInput
                  control={control}
                  placeholder="Twitter"
                  icon={<FaXTwitter />}
                  name="twitter"
                />
                <SocialsInput
                  control={control}
                  placeholder="Facebook"
                  icon={<FaFacebookF />}
                  name="facebook"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                <SocialsInput
                  control={control}
                  placeholder="Telegram"
                  icon={<FaTelegramPlane />}
                  name="telegram"
                />
                <SocialsInput
                  control={control}
                  icon={<IoIosGlobe />}
                  placeholder="Other websites"
                  name="website"
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel>
          <AlertDialogAction className="text-xs">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
