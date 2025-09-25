"use client";

import { z } from "zod";
import { useFormContext } from "react-hook-form";

import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { FormSchema } from "@/lib/schemas";
import { IoIosDocument, IoMdImages } from "react-icons/io";
import UploadImages from "./UplodImages";
import { useState } from "react";
import { FaLink, FaVideo } from "react-icons/fa";
import UploadVideo from "./UploadVideo";
import UploadDocuments from "./UploadDocuments";
import AttachSocials from "./AttachSocials";

type SupportingImgType = {
  imgFile?: File;
  imgUrl?: string;
};
type SupportingVideoType = {
  videoFile?: File;
  videoUrl?: string;
};
type SupportingDocType = {
  docFile?: File;
  docUrl?: string;
};

export default function UploadSection() {
  type FormData = z.infer<typeof FormSchema>;
  const { control, getValues, setValue } = useFormContext<FormData>();
  const initialFiles = getValues("supportingImages") || [];
  const initialVideos = getValues("supportingVideos") || [];
  const initialDocs = getValues("supportingDocuments") || [];

  const [documents, setDocuments] = useState<SupportingDocType[]>(
    initialDocs.map((file: File | string) =>
      file instanceof File ? { docFile: file } : { docUrl: String(file) }
    )
  );

  const [photos, setPhotos] = useState<SupportingImgType[]>(
    initialFiles.map((file) =>
      file instanceof File ? { imgFile: file } : { imgUrl: String(file) }
    )
  );
  const [videos, setVideos] = useState<SupportingVideoType[]>(
    initialVideos.map((file) =>
      file instanceof File ? { videoFile: file } : { videoUrl: String(file) }
    )
  );

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File[]) => void
  ) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    const fileArray = Array.from(uploadedFiles);

    if (photos.length + fileArray.length > 5) {
      toast.info("Maximum upload limit reached");
      return;
    }

    setPhotos((prev) => [...prev, ...fileArray.map((f) => ({ imgFile: f }))]);

    onChange([...photos.map((f) => f.imgFile!).filter(Boolean), ...fileArray]);
  };

  const handleVideoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File[]) => void
  ) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    const fileArray = Array.from(uploadedFiles);

    if (videos.length + fileArray.length > 3) {
      toast.info("Maximum video upload limit reached (3)");
      return;
    }

    setVideos((prev) => [...prev, ...fileArray.map((f) => ({ videoFile: f }))]);

    onChange([
      ...videos.map((f) => f.videoFile!).filter(Boolean),
      ...fileArray,
    ]);
  };
  const handleDocChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (val: (File | string)[]) => void
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newDocs = [
      ...documents,
      ...Array.from(files).map((f) => ({ docFile: f })),
    ];
    setDocuments(newDocs);

    onChange(newDocs.map((d) => d.docFile || ""));
  };

  const handleRemoveDoc = (index: number) => {
    const updated = documents.filter((_, i) => i !== index);
    setDocuments(updated);

    setValue(
      "supportingDocuments",
      updated.map((f) => f.docFile!).filter(Boolean)
    );
  };

  const handleRemoveFile = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    setValue(
      "supportingImages",
      updated.map((f) => f.imgFile!).filter(Boolean)
    );
  };
  const handleRemoveVideo = (index: number) => {
    const updated = videos.filter((_, i) => i !== index);
    setVideos(updated);
    setValue(
      "supportingVideos",
      updated.map((f) => f.videoFile!).filter(Boolean)
    );
  };

  return (
    <div className="space-y-2">
      <div className="text-xs text-sidebar-content gap-1 font-normal">
        Other Campaign Media
        <span className="text-red-500">*</span>
      </div>
      <div className="flex items-center flex-wrap gap-3">
        <FormField
          control={control}
          name="supportingImages"
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <div className="w-fit bg-[#2170B6] text-white p-2 rounded-xl">
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <IoMdImages />
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, field.onChange)}
                  />
                  <span className="text-xs">Upload Images</span>
                </label>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="supportingVideos"
          render={({ field }) => (
            <FormItem>
              <div className="w-fit bg-[#2170B6] text-white p-2 rounded-xl">
                <label
                  htmlFor="video-upload"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <FaVideo />
                  <Input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    multiple
                    onChange={(e) => handleVideoChange(e, field.onChange)}
                  />
                  <span className="text-xs">Upload Videos</span>
                </label>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="supportingDocuments"
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <div className="w-fit bg-[#2170B6] text-white p-2 rounded-xl">
                <label
                  htmlFor="doc-upload"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <IoIosDocument />
                  <Input
                    id="doc-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    className="hidden"
                    multiple
                    onChange={(e) => handleDocChange(e, field.onChange)}
                  />
                  <span className="text-xs">Upload Files</span>
                </label>
              </div>
            </FormItem>
          )}
        />

        <AttachSocials />
      </div>

      <div>
        <UploadImages photos={photos} onRemove={(i) => handleRemoveFile(i)} />
        <UploadVideo videos={videos} onRemove={(i) => handleRemoveVideo(i)} />
        <UploadDocuments
          documents={documents}
          onRemove={(i) => handleRemoveDoc(i)}
        />
      </div>
    </div>
  );
}
