import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LuPhone } from "react-icons/lu";
import { steps, why } from "@/lib/why";
import React from "react";

export default function Getapi() {
  return (
    <div>
      <div>
        <div className="flex flex-col md:flex-row items-center justify-between pl-0 md:pl-23 pt-25 md:pt-0 text-center md:text-left">
          <div className="">
            <h1 className="text-[#1038A2] text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold pb-6 max-w-[40rem] px-3 md:px-0">
              Maximize Your Funds, Minimize Fees
            </h1>
            <p className="max-w-md mx-auto md:mx-0 pb-8 text-sm md:text-base md:px-0 px-4">
              Raise funds on your own platform with <br /> ChainFundMe’s
              white-label crowdfunding APIs — <br /> no middlemen, no hidden
              fees.
            </p>
            <Button className="bg-[#FFFFFF] text-[#0037B0] shadow-[0_0_15px_rgba(0,0,0,0.3)]  space-x-3 !px-6 !py-3 cursor-pointer hover:bg-[#FFFFFF]/20 hover:shadow-xl rounded-xl">
              <LuPhone /> Book a call
            </Button>
          </div>

          <div className="hidden md:block ">
            <Image
              src="/layout/plug.png"
              alt="plug"
              width={700}
              height={700}
              className="translate-x-[-40]"
            />
          </div>
          <div className="block md:hidden ">
            <Image
              src="/layout/Mobileplug.png"
              alt="plug"
              width={400}
              height={400}
            />
          </div>
        </div>
        <section className="py-1 md:py-16">
          <div className="text-center mb-10 px-4">
            <h1 className="text-[#1E1E1E] text-2xl md:text-3xl font-bold mb-4">
              WHY CHOOSE WHITE LABEL
            </h1>
            <p className="text-[#666666] text-sm md:text-lg font-semibold">
              Everything you need to take control of your fundraising
            </p>
          </div>

          <div className="grid min-[560px]:grid-cols-2 grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:gap-x-15  max-w-4xl mx-auto px-6">
            {why.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl shadow-md flex flex-col items-center text-center p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={70}
                  height={70}
                  className="mb-4"
                />
                <h2 className="font-semibold text-base md:text-lg text-[#1E1E1E] mb-2">
                  {item.title}
                </h2>
                <p className="text-[#666666] text-sm md:text-base max-w-xs">
                  {item.des}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="py-16 ">
          <div className="text-center mb-10 px-4">
            <h1 className="text-[#1E1E1E] text-2xl md:text-3xl font-bold mb-4">
              HOW IT WORKS
            </h1>
            <p className="text-[#666666] text-sm md:text-lg font-semibold">
              Get started in four simple steps
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="flex flex-col gap-10 md:gap-24">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="relative flex items-center justify-between w-full"
                >
                  {index < steps.length && (
                    <div className="absolute left-1/2 top- transform -translate-x-1/2 w-[3px] h-16 bg-[#D9D9D9]   hidden md:block" />
                  )}

                  <div className="w-full md:w-1/2  justify-end md:pr-6 px-4 md:px-0  md:flex hidden">
                    {index % 2 === 0 && (
                      <div className="flex flex-row md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center justify-end w-full max-w-4xl">
                        <div className="flex flex-row md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
                          <span className="bg-[#F2F2F2] text-[#666666] font-semibold px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                            {step.id}
                          </span>
                          <p className="text-[#1E1E1E] text-sm md:text-base text-center md:text-right max-w-xs md:max-w-sm">
                            {step.text}
                          </p>
                        </div>
                        <div className="w-[3px] h-16 bg-[#D9D9D9] md:hidden block" />
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-1/2 justify-start md:pl-6 text-left px-4 md:px-0  md:flex hidden">
                    {index % 2 !== 0 && (
                      <div className="flex flex-row md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center justify-center w-full">
                        <div className="flex flex-row md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2 w-full">
                          <span className="bg-[#F2F2F2] text-[#666666] font-semibold px-3 py-1 rounded-lg text-sm">
                            {step.id}
                          </span>
                          <p className="text-[#1E1E1E] text-sm md:text-base text-center md:text-left max-w-xs">
                            {step.text}
                          </p>
                        </div>
                        <div className="w-[3px] h-16 bg-[#D9D9D9] md:hidden block" />
                      </div>
                    )}
                  </div>
                  <div className="md:hidden">
                    {index % 2 !== 0 && (
                      <div className="flex items-center justify-between gap-x-15 px-4">
                        <div className="flex items-center justify-center">
                          <span className="bg-[#F2F2F2] text-[#666666] font-semibold px-3 py-1 rounded-lg text-sm">
                            {step.id}
                          </span>
                          <p className="text-[#1E1E1E] text-sm md:text-base text-center md:text-left max-w-[12rem]">
                            {step.text}
                          </p>
                        </div>
                        <div className="w-[3px] h-16 bg-[#D9D9D9]" />
                      </div>
                    )}
                  </div>
                  <div className="md:hidden">
                    {index % 2 === 0 && (
                      <div className="flex items-center justify-between gap-x-15 px-4">
                        <div className="w-[3px] h-16 bg-[#D9D9D9]" />
                        <div className="flex items-center justify-center">
                          <span className="bg-[#F2F2F2] text-[#666666] font-semibold px-3 py-1 rounded-lg text-sm">
                            {step.id}
                          </span>
                          <p className="text-[#1E1E1E] text-sm md:text-base text-center md:text-left max-w-[12rem]">
                            {step.text}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#F9FAFB] pb-6">
          <div className="flex flex-col items-center justify-center py-6 md:py-8 lg:py-12 space-y-4 md:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-[#1038A2] font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
              Get Started Today
            </h1>
            <p className="text-[#383838] text-base sm:text-[18px] lg:text-xl leading-relaxed max-w-full sm:max-w-2xl lg:max-w-[53rem] text-center px-2 sm:px-0">
              Ready to maximize your funds and minimize fees? Book a Call to get
              started with ChainFundMe White Label Crowdfunding and unlock a
              borderless way to raise funds.
            </p>
            <Button className="bg-[#FFFFFF] text-[#0037B0] shadow-[0_0_15px_rgba(0,0,0,0.3)] space-x-3 !px-4 !py-3 sm:!px-6 sm:!py-3 cursor-pointer hover:bg-[#FFFFFF]/20 hover:shadow-xl rounded-xl text-sm sm:text-base">
              <LuPhone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Book a call</span>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
