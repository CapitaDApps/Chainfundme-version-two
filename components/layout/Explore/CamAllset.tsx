import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ConAllsetProps {
  onClose: () => void;
}

function ConAllset({ onClose }: ConAllsetProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 w-full h-screen bg-white/5 backdrop-blur-sm transition-all duration-500">
      <div className="w-full max-w-[35rem] min-h-[300px] bg-white rounded-xl p-6 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center text-center">
        <Image
          src="/layout/check.png"
          alt="capita_logo"
          width={70}
          height={70}
          className="cursor-pointer"
        />
        <p className="text-[#666666] text-sm mt-2 max-w-md">
          How would you like to start your journey?
        </p>
        <div className="flex flex-row space-x-4 mt-6">
          <Button
            style={{
              background: "linear-gradient(180deg, #1E5AA8 0%, #2379BC 100%)",
            }}
            className="rounded-xl shadow-xl !px-6 !py-3 cursor-pointer"
          >
            I am Donating
          </Button>
          <Button
            variant="outline"
            className="px-6 py-3 shadow-xl rounded-xl text-[#2379bc] cursor-pointer"
            onClick={onClose}
          >
            I am Creating a Campaign
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConAllset;
