"use client";

import { ArrowLeft, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const images = [
  "/step/step_1.svg",
  "/step/step_2.svg",
  "/step/step_3.svg",
  "/step/step_4.svg",
  "/step/step_5.svg",
  "/step/step_6.svg",
  "/step/step_7.svg",
  "/step/step_8.svg",
];
export default function FormUpdate({ step }: { step: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const arr = [
    {
      title: "Start with the essentials",
      content:
        "Give your campaign a name, choose your type, and set the right category easily.",
      img: "/step/step_1.svg",
    },
    {
      title: "Bring your campaign to life",
      content:
        "Add photos or videos that help people connect with your story and trust your cause.",
      img: "/step/step_2.svg",
    },
    {
      title: "Tell your story",
      content:
        "Explain why you're raising funds, who it helps, and why it matters.",
      img: "/step/step_3.svg",
    },
    {
      title: "Set your fundraising goal",
      content:
        "Choose how much you want to raise, how long your campaign will run, and where you'd like to accept donations.",
      img: "/step/step_4.svg",
    },
    {
      title: "Review your campaign",
      content:
        "Make sure your details, media, and fundraising goal look perfect before going live.",
      img: "/step/step_1.svg",
    },
  ];
  return (
    <div className="lg:flex w-[20rem] flex-col justify-center relative hidden bg-gray-100">
      <div
        className="absolute top-5 left-4 bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeft className="w-5 h-5" />
      </div>
      <div className="space-y-1 px-4 relative">
        <p className="text-[#6B7280] text-xs font-semibold">
          Step {step + 1} of 5
        </p>
        <h6 className="text-[#111827] text-sm font-semibold">
          {arr[step].title}
        </h6>
        <p className="text-[#4B5563] text-xs">{arr[step].content}</p>

        <Image
          width={80}
          height={80}
          src="/layout/bars.svg"
          alt="bar"
          className="object-center absolute -top-8 right-[30%]"
        />
      </div>

      <div className="absolute bottom-5 w-full h-[250px]  overflow-hidden">
        {images.map((src, index) => (
          <Image
            key={index}
            fill
            src={src}
            alt="bar"
            className={`object-center object-contain bottom-0 left-0 absolute transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
