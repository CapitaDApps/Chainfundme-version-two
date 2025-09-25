"use client";

import { X } from "lucide-react";

type SupportingVideoType = {
  videoFile?: File;
  videoUrl?: string;
};

export default function UploadVideo({
  videos,
  onRemove,
}: {
  videos: SupportingVideoType[];
  onRemove(i: number): void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
      {videos.map((file, index) => {
        const previewUrl = file.videoFile
          ? URL.createObjectURL(file.videoFile)
          : file.videoUrl || "";

        return (
          <div
            key={index}
            className="relative group border rounded-md overflow-hidden w-full h-36 flex items-center justify-center bg-black"
          >
            <video
              src={previewUrl}
              className="w-full h-full object-cover"
              controls
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
