"use client";

import Image from "next/image";
import { X } from "lucide-react";

type SupportingImgType = {
  imgFile?: File;
  imgUrl?: string;
};

export default function UploadImages({
  photos,
  onRemove,
}: {
  photos: SupportingImgType[];
  onRemove(i: number): void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
      {photos.map((file, index) => {
        const previewUrl = file.imgFile
          ? URL.createObjectURL(file.imgFile)
          : file.imgUrl || "/placeholder.png";

        return (
          <div
            key={index}
            className="relative group border rounded-md overflow-hidden w-full h-28"
          >
            <Image
              src={previewUrl}
              alt={file.imgFile?.name || "uploaded"}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 cursor-pointer bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
