import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";

function Footer() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #2379BC 0%, #103756 100%)",
      }}
    >
      <div className="flex justify-end pr-8">
        <Image src="/layout/Cir.png" alt="cir" width={270} height={290} />
      </div>
      <div className="flex flex-row items-center justify-between -mt-4 px-12">
        <div className="flex items-center space-x-4">
          <h1 className="text-white font-semibold text-lg">Main Links</h1>
          <span className="text-[#E3E3E3] font-thin ">
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="hover:underline">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:underline">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/why-us" className="hover:underline">
                  Why choose us
                </Link>
              </li>
              <li>
                <Link href="/my-donations" className="hover:underline">
                  Donations
                </Link>
              </li>
            </ul>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <h1 className="text-white font-semibold text-lg">Categories</h1>
          <span className="text-[#E3E3E3] font-thin ">
            <ul className="space-y-2">
              <li>
                <Link href="/education" className="hover:underline">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/crisis-reliefs" className="hover:underline">
                  Crisis reliefs
                </Link>
              </li>
              <li>
                <Link href="/health" className="hover:underline">
                  Health
                </Link>
              </li>
              <li>
                <Link href="/community-reliefs" className="hover:underline">
                  Community reliefs
                </Link>
              </li>
            </ul>
          </span>
        </div>
        <div className="space-y-3">
          <h1 className="text-white font-semibold text-xl">Subscribe</h1>
          <span>
            <p className="text-[#E3E3E3] font-thin text-[15px] pb-3">
              Provide tour mail to stay posted
            </p>
            <div className="flex space-x-2 pb-1">
              <Input
                type="text"
                placeholder="Enter your mail"
                className="rounded-xl border-none bg-[#FFFFFF4D]/50 
             placeholder:text-[#585858] placeholder:text-sm 
             [&::placeholder]:text-[#585858] [&::placeholder]:text-sm"
              />
              <Button
                variant="outline"
                className="border-none text-[#585858] px-4 py-3 rounded-2xl"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-[#D2CCCCA6]">
              By subscribing you agree to our privacy policy
            </p>
          </span>
        </div>
      </div>
      <div className="-mt-10">
        <Image src="/layout/Cone.png" alt="cone" width={150} height={100} />
      </div>
      <div className=" max-w-[75rem] mx-auto">
        <hr className="border-[#CDCDCD] w-full" />
        <div className="flex items-center justify-between text-white py-6">
          <h1 className="text-2xl font-bold">ChainFundMe</h1>
          <span className="flex flex-row space-x-6 text-xl">
            <FaFacebook />
            <FaInstagram />
            <BsTwitterX />
          </span>
        </div>
        <hr className="border-[#CDCDCD] w-full" />
      </div>
      <div className="flex items-center justify-between py-4 px-18 text-xs text-[#E3E3E3]">
        <span>
          <ul className="flex space-x-3">
            <li>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:underline">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </span>
        <span>@ChainFundMe,Inc.2025</span>
      </div>
    </div>
  );
}
export default Footer;
