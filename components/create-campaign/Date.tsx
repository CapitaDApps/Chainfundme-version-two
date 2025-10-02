"use client";

import { format, isBefore, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control, FieldPath } from "react-hook-form";
import z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { cn } from "@/lib/utils";
import { FormSchema } from "@/lib/schemas";
import { useState } from "react";

interface FormInput {
  control: Control<z.infer<typeof FormSchema>>;
  name: FieldPath<z.infer<typeof FormSchema>>;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export default function DateField({
  control,
  label,
  name,
  placeholder = "dd/mm/yyyy",
  required,
}: FormInput) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col flex-1">
          <FormLabel className="text-xs text-sidebar-content gap-1 font-normal">
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "pl-3 text-left font-normal   text-xs",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value && typeof field.value === "string" ? (
                    format(new Date(field.value), "MMM dd yyyy")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={
                  field.value ? new Date(field.value as string) : undefined
                }
                onSelect={(date) => {
                  field.onChange(date ? date.toISOString() : "");
                  setIsOpen(false);
                }}
                disabled={(date) => {
                  const today = startOfDay(new Date());
                  return isBefore(date, today);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
