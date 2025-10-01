import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="relative">
      <div className="w-full pt-8 pb-4 px-4 md:px-8 lg:px-16 bg-[#00111F]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left z-20 flex flex-col space-y-3">
            <Link href="/">
              <div className="flex space-x-2">
                <Image
                  src="/layout/appicon.png"
                  alt="capita_logo"
                  width={32}
                  height={32}
                  className="cursor-pointer relative"
                />
                <p className="font-bold text-3xl text-[#FFFFFF]">ChainFundMe</p>
              </div>
            </Link>
            <p className="text-[#FFFFFF] text-xs max-w-[15rem]">
              ChainFundMe is a new way to make a bigger impact on the causes you
              care about.
            </p>
          </div>

          <div className="text-left z-30">
            <h3 className="text-white font-medium  text-base md:text-lg mb-3 md:mb-4">
              Main Links
            </h3>
            <ul className="space-y-1 md:space-y-2">
              {[
                { href: "/explore", label: "Explore" },
                { href: "/how-it-works", label: "How it works" },
                { href: "/why-us", label: "Why choose us" },
                { href: "/my-donations", label: "Donations" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-white flex items-center text-sm md:text-base"
                  >
                    <span className="text-gray-200 hover:text-white font-thin">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left">
            <h3 className="text-white font-medium text-base md:text-lg mb-3 md:mb-4">
              Support
            </h3>
            <ul className="space-y-1 md:space-y-2">
              {[
                { href: "/help", label: "Help Center" },
                { href: "/faq", label: "FAQs" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-white flex items-center text-sm md:text-base"
                  >
                    <span className="text-gray-200 hover:text-white font-thin">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left z-20">
            <h3 className="text-white font-semibold text-base md:text-lg mb-3 md:mb-4">
              Subscribe to join our community
            </h3>
            <p className="text-gray-200 mb-3 text-xs md:text-sm">
              Stay Informed: Subscribe to our Newsletter
            </p>

            <div className="flex flex-col items-center sm:items-start space-y-2 md:space-y-3 max-w-xs mx-auto sm:mx-0">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-2 pl-9 md:pl-10 bg-white border border-white/30 rounded-4xl text-[#AEB7C6] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                />

              </div>
              <Button className="bg-[#003DEF] text-white hover:bg-[#003DEF]/50 transition-colors px-4 py-2 rounded-4xl font-medium text-xs w-full sm:w-auto">
                Subscribe to our Newsletter
              </Button>
              <p className="text-xs text-gray-300 text-center sm:text-left">
                By subscribing you agree to our privacy policy
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <hr className="border-gray-400/30" />
        </div>
        <div className="max-w-7xl mx-auto mt-4 md:mt-6 flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              { href: "/terms", label: "Terms of Service" },
              { href: "/privacy", label: "Privacy Policy" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white text-xs md:text-sm"
              >
                <p className="text-gray-300">{link.label}</p>
              </Link>
            ))}
          </div>
          <div className="text-gray-300 text-xs md:text-sm text-center md:text-left">
            © ChainFundMe, Inc. {new Date().getFullYear()} | All Rights Reserved
          </div>
          <div className="flex justify-start space-x-4 pl-3">
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

      <div className="absolute top-0 left-0 right-0 h-6 md:h-8 overflow-hidden">
        <div className="w-full h-12 md:h-16 bg-white/5 rounded-[100%] transform translate-y-[-80%]"></div>
      </div>
    </footer>
  );
};

export default Footer;
