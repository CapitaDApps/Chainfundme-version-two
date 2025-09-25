import React from "react";
import FormUpdate from "./FormUpdate";
import Header from "./Header";

export default function Layout({
  children,
  step,
}: {
  children: React.ReactNode;
  step: number;
}) {
  return (
    <div className="flex h-full lg:h-screen w-full max-w-[1500px]  mx-auto">
      <FormUpdate step={step} />
      <div className="bg-white  flex-1 lg:rounded-tl-[150px] ">
        <div className="lg:pt-8 lg:px-16">
          <Header step={step} />
          <div className="  lg:overflow-y-scroll no-scrollbar  pb-8 pt-24 lg:pt-0 lg:h-[73vh]  px-4 ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
