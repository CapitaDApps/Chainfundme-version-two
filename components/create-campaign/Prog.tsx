"use client";

import { Check } from "lucide-react";
import clsx from "clsx";

type Step = {
  label: string;
};

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Prog({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full pb-10 lg:pb-16 space-y-3">
      <div className="flex items-center justify-between   ">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div
              key={step.label}
              className="flex-1 flex flex-col items-center w-full relative"
            >
              {index > 0 && (
                <div
                  className={clsx(
                    "absolute top-2.5 -left-[50%] right-[50%] h-1",
                    isCompleted ? "bg-blue-600" : "bg-gray-200"
                  )}
                />
              )}

              <div
                className={clsx(
                  "z-10 flex items-center justify-center size-6  text-[11px] rounded-full border-2 bg-white",
                  isCompleted
                    ? "border-blue-600 !bg-blue-600 text-white"
                    : isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-300"
                )}
              >
                {isCompleted ? <Check className="w-3 h-3" /> : index + 1}
              </div>

              <span
                className={clsx(
                  "mt-2 text-xs text-center hidden lg:block",
                  isCompleted || isActive
                    ? "text-blue-600 font-medium"
                    : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="underline text-[#878787] text-end text-xs  lg:hidden">
        Save to draft
      </p>
    </div>
  );
}
