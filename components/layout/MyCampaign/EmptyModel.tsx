import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface EmptyModelProps {
  src: string;
  alt: string;
  text1: string;
  text2: string;
  btnText?: string;
  btnLink?: string;
}

function EmptyModel({
  src,
  alt,
  text1,
  text2,
  btnText,
  btnLink,
}: EmptyModelProps) {
  return (
    <div className="w-full max-w-[45rem] min-h-[250px] bg-white rounded-xl p-6 mb-16 transition-all duration-500 shadow-2xl flex flex-col items-center justify-center text-center mx-auto">
      <Image
        src={src}
        alt={alt}
        width={70}
        height={70}
        className="cursor-pointer"
      />
      <h1 className="font-bold text-lg mt-4">{text2}</h1>
      <p className="text-[#666666] text-sm mt-2 max-w-md">{text1}</p>
      <div className="flex flex-row space-x-4 mt-6">
        {btnLink ? (
          <Link href={btnLink}>
            <Button className="px-6 py-3 shadow-xl rounded-xl text-white cursor-pointer text-xs md:text-sm bg-[#003DEF] hover:bg-[#003DEF] focus:bg-[#003DEF]">
              {btnText ? btnText : "Create now"}
            </Button>
          </Link>
        ) : (
          <Button className="px-6 py-3 shadow-xl rounded-xl text-white cursor-pointer text-xs md:text-sm bg-[#003DEF] hover:bg-[#003DEF] focus:bg-[#003DEF]">
            {btnText ? btnText : "Create now"}
          </Button>
        )}
      </div>
    </div>
  );
}
export default EmptyModel;
