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
      <div className="w-full  bg-[#00111F] pt-16 pb-8">
        <div className="flex flex-row justify-between px-12 ">
          <div className=" space-y-4">
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
                { href: "/why-us", label: "Why choose us" },
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
                { href: "/help", label: "Help Center" },
                { href: "/faq", label: "FAQs" },
                { href: "/contact", label: "Contact Us" },
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

            <div className="flex flex-col items-center sm:items-start space-y-2 md:space-y-2 max-w-xs mx-auto sm:mx-0">
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

        <div className="flex flex-col items-center justify-center pt-10 pb-6 text-[24px]">
          <p className="text-[#808080] font-bold">
            Our partners at ChainFundMe
          </p>
          <div className="space-x-10 mt-4 ">
            {[
              { src: "/layout/Group.png", alt: "Partner 1" },
              { src: "/layout/Conrad.png", alt: "Partner 2" },
              { src: "/layout/N.png", alt: "Partner 3" },
              { src: "/layout/Vector.png", alt: "Partner 4" },
              { src: "/layout/C.png", alt: "Partner 5" },
            ].map((partner, index) => (
              <Image
                key={index}
                src={partner.src}
                alt={partner.alt}
                width={130}
                height={40}
                className="mx-4 my-2 inline-block"
              />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <hr className="border-[#9AA1A6]" />
        </div>
        <div className="max-w-7xl mx-auto mt-4 md:mt-8 flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-8 text-center md:text-left">
          <div className="flex flex-wrap justify-center space-x-3 md:space-x-6">
            {[
              { href: "/terms", label: "Terms of Service" },
              { href: "/privacy", label: "Privacy" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white text-xs md:text-[18px]"
              >
                <p className="text-gray-300">{link.label}</p>
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-gray-300 text-xs md:text-[18px]">
            © ChainFundMe, Inc. {new Date().getFullYear()} | All Rights Reserved
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end space-x-4">
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
