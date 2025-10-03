import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const partners = [
  { src: "/partners/spc.jpg", alt: "Partner 1", name: "SPC" },
  {
    src: "/partners/cloudplexo.jpg",
    alt: "Partner 2",
    name: "Cloudplexo",
  },
  { src: "/partners/base.jpg", alt: "Partner 3", name: "Base" },
  {
    src: "/partners/frenchie.jpg",
    alt: "Partner 4",
    name: "Frenchie",
  },
  {
    src: "/partners/jawgular.jpg",
    alt: "Partner 5",
    name: "Jawgular",
  },
];

const Footer = () => {
  return (
    <footer className="relative">
      <div className="w-full bg-[#00111F] pt-16 pb-8 px-4 md:px-14 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[300px_1fr_1fr_300px] w-full gap-10">
          <div className=" space-y-4">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <Image
                  src="/layout/appicon.png"
                  alt="capita_logo"
                  width={32}
                  height={32}
                  className="cursor-pointer relative w-8"
                />
                <p className="font-bold text-xl lg:text-3xl text-[#FFFFFF]">
                  ChainFundMe
                </p>
              </div>
            </Link>
            <p className="text-[#FFFFFF] text-xs max-w-[15rem] pt-4">
              ChainFundMe is a new way to make a bigger impact on the causes you
              care about.
            </p>
          </div>

          <div className="">
            <h3 className="text-white font-medium  text-base md:text-lg mb-3 md:mb-4">
              Main Links
            </h3>
            <ul className="space-y-1 md:space-y-2">
              {[
                { href: "/explore", label: "Explore" },
                { href: "/how-it-works", label: "How it works" },
                // { href: "/why-us", label: "Why choose us" },
                { href: "/my-donations", label: "Donations" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-white flex items-center text-sm md:text-base"
                  >
                    <span className="text-[#808080] hover:text-white font-thin">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <h3 className="text-white font-medium text-base md:text-lg mb-3 md:mb-4">
              Support
            </h3>
            <ul className="space-y-1 md:space-y-2">
              {[
                { href: "", label: "Help Center" },
                { href: "", label: "FAQs" },
                { href: "", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-white flex items-center text-sm md:text-base"
                  >
                    <span className="text-[#808080] hover:text-white font-thin">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <h3 className="text-white font-medium  text-base md:text-lg mb-3 md:mb-4">
              Subscribe to join our community
            </h3>
            <p className="text-[#808080] font-thin max-w-xs mb-3 text-xs md:text-[18px]">
              Stay Informed: Subscribe to our Newsletter
            </p>

            <div className="flex flex-col items-center sm:items-start space-y-2 md:space-y-2 max-w-xs sm:mx-0">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-2 pl-9 md:pl-10 bg-white border border-white/30 rounded-4xl text-gray-500 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                />
              </div>
              <Button className="bg-[#003DEF] text-white hover:bg-[#003DEF]/50 transition-colors px-4 !py-6 rounded-4xl font-medium text-xs w-full">
                Subscribe to our Newsletter
              </Button>
              {/* <p className="text-xs text-gray-300 text-center sm:text-left">
                By subscribing you agree to our privacy policy
              </p> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col  mt-16 mb-12 w-full">
          <p className="text-[#808080] font-bold text-lg md:text-[24px] md:text-center">
            Our partners at ChainFundMe
          </p>
          <div className="mt-4 md:mt-8 flex flex-wrap gap-8 lg:gap-10 md:max-w-[655px] lg:max-w-fit mx-auto md:justify-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center gap-2">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={500}
                  height={500}
                  className="rounded-full min-w-12 min-h-12 max-w-12 max-h-12 sm:min-w-16 sm:min-h-16 sm:max-w-16 sm:max-h-16 grayscale"
                />
                <p className="text-white text-base sm:text-xl font-bold">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <hr className="border-[#9AA1A6]" />
        </div>
        <div className="flex md:items-center flex-col md:flex-row mt-5 sm:mt-10 gap-4 lg:gap-8 text-xs sm:text-sm lg:text-base w-full md:w-fit md:mx-auto">
          <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-center gap-4 lg:gap-8">
            <div className="flex flex-col md:flex-row md:justify-center gap-4 lg:gap-8">
              {[
                { href: "", label: "Terms of Service" },
                { href: "", label: "Privacy" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white"
                >
                  <p className="text-gray-300">{link.label}</p>
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-gray-300">
              © ChainFundMe, Inc. {new Date().getFullYear()} | All Rights
              Reserved
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-white hover:text-blue-300 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook size={18} className="md:w-5 md:h-5 text-white" />
            </a>
            <a
              href="#"
              className="text-white hover:text-pink-300 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={18} className="md:w-5 md:h-5 text-white" />
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Twitter"
            >
              <BsTwitterX size={18} className="md:w-5 md:h-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
