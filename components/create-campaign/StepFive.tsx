"use client";
import { FormSchema } from "@/lib/schemas";
import { ArrowUpRightFromSquare } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import z from "zod";
import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Progress } from "../ui/progress";
import UploadDocuments from "./UploadDocuments";
import UploadVideo from "./UploadVideo";
import UploadImages from "./UplodImages";
import Link from "next/link";

export default function StepFive() {
  type FormData = z.infer<typeof FormSchema>;
  const { getValues, control } = useFormContext<FormData>();
  const campaignData = getValues();

  const photos =
    campaignData.supportingImages?.map((file) =>
      file instanceof File ? { imgFile: file } : { imgUrl: String(file) }
    ) || [];

  const documents =
    campaignData.supportingDocuments?.map((file: File | string) =>
      file instanceof File ? { docFile: file } : { docUrl: String(file) }
    ) || [];

  const videos =
    campaignData.supportingVideos?.map((file) =>
      file instanceof File ? { videoFile: file } : { videoUrl: String(file) }
    ) || [];
  function remove(i: number) {
    console.log(i);
  }
  return (
    <div className="w-full relative">
      <div className="relative aspect-square w-full md:h-[200px] h-[150px] object-center object-contain">
        {campaignData.cover && (
          <Image
            src={
              typeof window !== "undefined"
                ? URL.createObjectURL(campaignData.cover as File)
                : ""
            }
            alt="cover-pic"
            className="rounded-[16px] object-center object-cover"
            quality={100}
            fill
          />
        )}
      </div>

      <div className="space-y-4 mt-2">
        {/* Campaign Status */}
        <div className="flex items-center text-xs font-normal gap-2 text-[#666666]">
          <div className="flex justify-between w-full items-center gap-2">
            <div className="flex items-center gap-1">
              <Image width={10} height={10} alt="dot" src="/dot.png" />
              <p>Live campaign 12:12:12:00</p>
            </div>
            <div className="ripple-dot" />
          </div>
        </div>

        {/* Campaign Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h5 className="text-lg font-semibold text-[#111111]">
                  {campaignData.campaignName}
                </h5>
                <Image
                  src="/layout/verify.png"
                  width={20}
                  height={20}
                  alt="verify"
                />
              </div>
              {/* {campaignData.website && (
                <div className="flex gap-1 text-text-gray text-sm">
                  <Link
                    href={campaignData.website}
                    className="text-[#111111]/80 text-center hover:text-blue-600   rounded-md p-[1px] border border-zinc-900 text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {campaignData.website}
                  </Link>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Campaign Description */}
        <p className="font-normal bg-gray-100 px-4 py-6 rounded-lg max-h-[200px] overflow-y-auto text-[#262626] text-xs md:text-sm leading-relaxed whitespace-pre-line overflow-clip mb-5">
          {campaignData.bio}
        </p>

        {/* {campaignData.supportingImages &&
          campaignData.supportingImages.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-normal text-[#111111]">
                Supporting Images
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {campaignData.supportingImages.map(
                  (imageUrl: string, index: number) => (
                    <div
                      key={index}
                      className="relative aspect-square w-full h-[100px]"
                    >
                      <Image
                        src={imageUrl}
                        alt={`Supporting image ${index + 1}`}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          )} */}

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-normal text-[#111111]">
            <p>Progress</p>
            <p>Target Amount: {campaignData.amount} USD</p>
          </div>

          <Progress value={20} />

          <div className="flex justify-between items-center gap-2">
            <p className="text-xs text-[#111111] font-normal">
              Amount raised: {0} USD
            </p>
          </div>
        </div>
        <div className="space-y-1 mt-3">
          <p className="text-xs">
            Other Campaign Media<span className="text-red-500">*</span>
          </p>

          <div>
            {photos.length ? (
              <UploadImages photos={photos} onRemove={(i) => remove(i)} />
            ) : (
              ""
            )}
            {videos?.length ? (
              <UploadVideo videos={videos} onRemove={(i) => remove(i)} />
            ) : (
              ""
            )}
            {documents?.length ? (
              <UploadDocuments
                documents={documents}
                onRemove={(i) => remove(i)}
              />
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Tokens Section */}
        {/* <div className="flex justify-between items-center gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-normal text-[#111111]">Accepted Tokens</p>
            <div className="flex items-center gap-2">
              {campaignData.tokens.map((token) => (
                <div
                  key={token.name}
                  className="bg-[#2A2A2A] p-1 rounded-[4px] text-xs text-[#111111] font-normal flex items-center gap-1"
                >
                  <Image width={10} height={10} alt="token" src={token.src} />
                  <p>{token.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Action Button */}
      </div>

      <FormField
        control={control}
        name="agree"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start cursor-pointer space-y-0 pt-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none text-xs">
              <FormLabel className="text-xs">
                I have reviewed Chainfundme{" "}
                <span className="text-primary-accent hover:underline cursor-pointer">
                  <Link href={"/"} target="_blank">
                    terms and conditions
                  </Link>
                </span>
                <span className="text-primary-accent cursor-pointer">
                  <Link href={"/"} target="_blank">
                    {" "}
                    <ArrowUpRightFromSquare className="w-4 h-4" />
                  </Link>
                </span>
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
