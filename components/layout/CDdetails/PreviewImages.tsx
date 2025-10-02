"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";

export default function PreviewImages({ images }: { images: string[] }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="space-y-2">
        <p className="font-normal text-xs text-white">Supporting Images</p>
        <div className="flex gap-2.5 items-center">
          {images.length > 0
            ? images.map((item, i) => (
                <div key={i} className="relative aspect-auto w-[60px] h-[60px]">
                  <Image
                    onClick={() => setShow(true)}
                    src={item}
                    alt="avatar"
                    fill
                    className="rounded-2xl w-full h-full object-center object-cover cursor-pointer"
                  />
                </div>
              ))
            : null}

          {images && images.length > 2 && (
            <div
              onClick={() => setShow(true)}
              className="bg-black/50 cursor-pointer rounded-[16px] flex items-center justify-center size-[60px] text-white text-sm"
            >
              +{images.length - 2}
            </div>
          )}
        </div>
      </div>

      <div
        className={`
          fixed inset-0 z-50 transition-all duration-300
          ${
            show
              ? "visible opacity-100"
              : "invisible opacity-0 pointer-events-none"
          }
        `}
      >
        <div
          onClick={() => setShow(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <div className="absolute left-1/2 top-1/2 z-50 w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 px-4">
          <Carousel>
            <CarouselContent>
              {images.map((item, index) => (
                <CarouselItem
                  className="flex flex-col gap-2 items-center"
                  key={index}
                >
                  <div className="relative w-full h-[400px] md:h-[500px]">
                    <Image
                      src={item}
                      className="rounded-2xl object-contain"
                      fill
                      alt={`Preview image ${index + 1}`}
                    />
                  </div>
                  <p className="text-white text-sm">
                    <span>{index + 1}</span> / {images.length}
                  </p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-primary-bg bg-white" />
            <CarouselNext className="text-primary-bg bg-white" />
          </Carousel>

          {/* Close button */}
          <button
            onClick={() => setShow(false)}
            className="text-[#111] p-2 cursor-pointer rounded-full z-[90] bg-white absolute top-2 right-2"
          >
            <FaXmark />
          </button>
        </div>
      </div>
    </div>
  );
}
