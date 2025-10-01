import { Button } from "@/components/ui/button";
import Image from "next/image";

interface DonationModelProps {
  onClose: () => void;
  text: string;
}

function DonationModel({ onClose, text }: DonationModelProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 w-full h-screen bg-white/5 backdrop-blur-sm transition-all duration-500">
      <div className="w-full max-w-[45rem] min-h-[250px] bg-white rounded-xl p-6 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center text-center">
        <Image
          src="/layout/don.png"
          alt="capita_logo"
          width={70}
          height={70}
          className="cursor-pointer"
        />
        <h1 className="font-bold text-lg mt-4">{text}</h1>
        <p className="text-[#666666] text-sm mt-2 max-w-md">
          Sign in or create an account to track your contributions and support
          campaigns you care about.
        </p>
        <div className="flex flex-row space-x-4 mt-6">
          <Button
            onClick={onClose}

            className="rounded-xl shadow-xl !px-6 !py-3 cursor-pointer bg-[#003DEF] text-xs md:text-sm hover:bg-[#003DEF] focus:bg-[#003DEF] text-white"
          >
            Join or Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DonationModel;
