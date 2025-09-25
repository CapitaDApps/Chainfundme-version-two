import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSchema } from "@/lib/schemas";
import { Control, FieldPath } from "react-hook-form";
import z from "zod";

interface FormInput {
  control: Control<z.infer<typeof FormSchema>>;
  name: FieldPath<z.infer<typeof FormSchema>>;
  label: string;
  placeholder: string;
  type: "input" | "textarea";
  inputType?: string;
  textType?: string;
  required: boolean;
}

export default function CampaignInput({
  control,
  textType,
  name,
  label,
  placeholder,
  required,
  type,
}: FormInput) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${type === "input" && "lg:w-[80%]"}`}>
          <FormLabel className="text-xs text-sidebar-content gap-1 font-normal">
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <div className="w-full flex justify-center items-center">
            <FormControl>
              {type === "input" ? (
                <Input
                  className="w-full placeholder:text-xs   bg-[#1E5AA8]/5 outline-[#1E5AA8]/30 outline focus-visible:outline-[#1E5AA8] rounded-[8px] p-3 text-xs text-sidebar-content"
                  placeholder={placeholder}
                  {...field}
                  type={textType}
                />
              ) : (
                <div className="flex flex-col items-center w-full space-y-2">
                  <Textarea
                    placeholder={placeholder}
                    maxLength={2000}
                    className="resize-none h-[130px] text-black ring-[#1E5AA8]/40  placeholder:text-gray-500   lg:w-full border-[#1E5AA8] bg-[#1E5AA8]/5 outline-[#1E5AA8]/30 outline focus-visible:outline-[#1E5AA8] rounded-[8px] p-3 text-xs "
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    value={typeof field.value === "string" ? field.value : ""}
                  />
                  {/* </div> */}
                  <div className="w-[92%] lg:w-full text-left">
                    <p className="text-xs text-gray-500">
                      {typeof field.value === "string" ? field.value.length : 0}
                      /2000
                    </p>
                  </div>
                </div>
              )}
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
