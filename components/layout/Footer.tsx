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
      className="relative overflow-hidden "
    >
      <div className="flex justify-end pr-4 md:pr-8">
        <Image 
          src="/layout/Cir.png" 
          alt="cir" 
          width={270} 
          height={290} 
          className="w-48 md:w-64 lg:w-72"
        />
      </div>

      <div className="flex flex-col md:flex-row items-start md:justify-between justify-start -mt-8 md:-mt-4 px-4 md:px-8 lg:pl-7 lg:pr-18 gap-8 md:gap-0">
        
        {/* Main Links */}
        <div className="flex flex-col md:flex-row items-start text-left gap-6 md:gap-12">
          <div>
            <h1 className="text-white font-semibold text-lg mb-4 md:mb-0">Main Links</h1>
          </div>
          <div className="text-[#E3E3E3] font-thin">
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="hover:underline text-sm md:text-base">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:underline text-sm md:text-base">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/why-us" className="hover:underline text-sm md:text-base">
                  Why choose us
                </Link>
              </li>
              <li>
                <Link href="/my-donations" className="hover:underline text-sm md:text-base">
                  Donations
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col md:flex-row items-start text-left gap-6 md:gap-12">
          <div>
            <h1 className="text-white font-semibold text-lg mb-4 md:mb-0">Categories</h1>
          </div>
          <div className="text-[#E3E3E3] font-thin">
            <ul className="space-y-2">
              <li>
                <Link href="/education" className="hover:underline text-sm md:text-base">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/crisis-reliefs" className="hover:underline text-sm md:text-base">
                  Crisis reliefs
                </Link>
              </li>
              <li>
                <Link href="/health" className="hover:underline text-sm md:text-base">
                  Health
                </Link>
              </li>
              <li>
                <Link href="/community-reliefs" className="hover:underline text-sm md:text-base">
                  Community reliefs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-3 text-left w-full md:w-auto max-w-[17rem] ">
          <h1 className="text-white font-semibold text-xl">Subscribe</h1>
          <div>
            <p className="text-[#E3E3E3] font-thin text-sm md:text-[15px] pb-3">
              Provide your mail to stay posted
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pb-1">
              <Input
                type="text"
                placeholder="Enter your mail"
                className="rounded-xl border-none bg-[#FFFFFF4D]/50 
                 placeholder:text-[#E3E3E3] text-[#E3E3E3] px-4 py-2 text-sm"
              />
              <Button
                variant="outline"
                className="border-none text-[#585858] px-4 py-2 rounded-2xl text-sm whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-[#D2CCCCA6] mt-2 z-10">
              By subscribing you agree to our privacy policy
            </p>
          </div>
        </div>
      </div>

      <div className="-mt-6 md:-mt-10">
        <Image 
          src="/layout/Cone.png" 
          alt="cone" 
          width={150} 
          height={100} 
          className="w-24 md:w-32 lg:w-36 z-20"
        />
      </div>

      <div className="max-w-[75rem] mx-auto px-4 md:px-8">
        <hr className="border-[#CDCDCD] w-full" />
        <div className="flex flex-row items-center md:items-center justify-between text-white py-6 gap-4 md:gap-0">
          <h1 className="text-xl md:text-2xl font-bold">ChainFundMe</h1>
          <span className="flex flex-row space-x-6 text-lg md:text-xl">
            <FaFacebook className="hover:text-blue-300 cursor-pointer" />
            <FaInstagram className="hover:text-pink-300 cursor-pointer" />
            <BsTwitterX className="hover:text-gray-300 cursor-pointer" />
          </span>
        </div>
        <hr className="border-[#CDCDCD] w-full" />
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 px-4 md:px-8 lg:px-12 text-xs text-[#E3E3E3] gap-4 md:gap-0">
        <span>
          <ul className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
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
        <span className="text-left md:text-left">@ChainFundMe,Inc.2025</span>
      </div>
    </div>
  );
}

export default Footer;