import React, { Dispatch, SetStateAction } from "react";
import { GiCheckMark } from "react-icons/gi";

export default function Bottom({
  step,
  setStep,
}: {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const bottomSteps = [
    {
      name: "Basics",
      list: ["Campaign name", "Creator type", "Category"],
      rout: 1,
      step: 1,
      butName: "Edit Basics",
    },
    {
      name: "Media",
      list: ["Main image", "Other Photos", "Videos(optional)"],
      rout: 2,
      step: 2,
      butName: "Update Media",
    },
    {
      name: "Story",
      list: ["Short description", "Full story", "Attach proof"],
      rout: 3,
      step: 3,
      butName: "Edit Details",
    },
    {
      name: "Funding",
      list: ["Goal amount", "Accepted chains", "Wallet address"],
      rout: 4,
      step: 4,
      butName: "Edit Funding",
    },
    {
      name: "Preview",
      list: ["Preview Campaign"],
      rout: 5,
      step: 5,
      butName: "Edit",
    },
  ];
  return (
    <div className="mt-12">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full bg-[#DFDFDF]/35 rounded-xl">
        {bottomSteps.map((bot, i) => (
          <div
            key={i}
            className={` w-full h-[150px] scale-[0.9] space-y-2 relative p-2.5 sm:p-4  rounded-lg border max-w-[250px] mx-auto border-dashed border-[#ADADAD] bg-white`}
          >
            {step >= i ? (
              <>
                <h6 className="text-sm font-semibold">{bot.name}</h6>
                <div className="flex flex-col gap-0.5 sm:gap-1.5">
                  {bot.list.map((li) => (
                    <div
                      key={li}
                      className="text-[#6B7280] flex items-center text-xs gap-3"
                    >
                      <GiCheckMark /> <p className="text-xs">{li}</p>
                    </div>
                  ))}
                </div>
                <div
                  onClick={() => setStep(bot.step - 1)}
                  className="border bottom-2 absolute w-[90%] cursor-pointer right-2 left- border-[#D1D5DB] rounded-full p-1 text-xs text-center text-[#6B7280]"
                >
                  {bot.butName}
                </div>
              </>
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
