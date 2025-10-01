"use client";

import React from "react";
import z from "zod";
import { Control } from "react-hook-form";
import { FormSchema } from "@/lib/Profileschemas";
import {
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { FaTwitter, FaFacebook, FaLinkedin, FaGlobe } from "react-icons/fa";

interface FormInput {
  control: Control<z.infer<typeof FormSchema>>;
}

function ProfileInputs({ control }: FormInput) {
  return (
    <div className="md:pt-16 pt-6 flex w-full items-center flex-col space-y-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="w-[90%] md:w-4/5">
            <FormLabel>Full name</FormLabel>
            <input
              className="w-full bg-white border border-primary/30 rounded-lg px-4 py-2 placeholder:text-xs focus:border-sky-400 focus:outline-none"
              placeholder="Enter your Campaign’s Name"
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="bio"
        render={({ field }) => (
          <FormItem className="w-[90%] md:w-4/5">
            <FormLabel>Short bio</FormLabel>
            <input
              className="w-full bg-white border border-primary/30 rounded-lg px-4 py-2 placeholder:text-xs focus:border-sky-400 focus:outline-none"
              placeholder="Are you an individual, organization, DAO or Startup?"
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="twitter"
        render={({ field }) => (
          <FormItem className="w-[90%] md:w-4/5">
            <FormLabel>Twitter</FormLabel>
            <div className="flex items-center border border-primary/30 rounded-lg bg-white px-3 focus-within:border-sky-400">
              <FaTwitter className="text-sky-500 mr-2" />
              <input
                className="w-full bg-white py-2 placeholder:text-xs focus:outline-none"
                placeholder="Connect your X (formerly Twitter)"
                {...field}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="facebook"
        render={({ field }) => (
          <FormItem className="w-[90%] md:w-4/5">
            <FormLabel>Facebook</FormLabel>
            <div className="flex items-center border border-primary/30 rounded-lg bg-white px-3 focus-within:border-sky-400">
              <FaFacebook className="text-blue-600 mr-2" />
              <input
                className="w-full bg-white py-2 placeholder:text-xs focus:outline-none"
                placeholder="Connect Your Facebook"
                {...field}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="linkedin"
        render={({ field }) => (
          <FormItem className="w-[90%] md:w-4/5">
            <FormLabel>LinkedIn</FormLabel>
            <div className="flex items-center border border-primary/30 rounded-lg bg-white px-3 focus-within:border-sky-400">
              <FaLinkedin className="text-sky-400 mr-2" />
              <input
                className="w-full bg-white py-2 placeholder:text-xs focus:outline-none"
                placeholder="Connect Your LinkedIn"
                {...field}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="website"
        render={({ field }) => (
          <FormItem className="w-[90%] md:w-4/5">
            <FormLabel>Website</FormLabel>
            <div className="flex items-center border border-primary/30 rounded-lg bg-white px-3 focus-within:border-sky-400">
              <FaGlobe className="text-gray-600 mr-2" />
              <input
                className="w-full bg-white py-2 placeholder:text-xs focus:outline-none"
                placeholder="eg www.websiteurl.com"
                {...field}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default ProfileInputs;
