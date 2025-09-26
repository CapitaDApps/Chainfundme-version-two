import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { Mail, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative">
      <div
        className="w-full pt-8 pb-4 px-4 md:px-8 lg:px-16"
        style={{
          background: "linear-gradient(180deg, #2379BC 0%, #103756 100%)",
        }}
      >
        <div className="flex justify-end pr-4 md:pr-8 z-10 absolute top-0 right-0">
          <Image
            src="/layout/Cir.png"
            alt="cir"
            width={270}
            height={290}
            className="w-48 md:w-64 lg:w-72"
          />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left z-20">
            <h2 className="text-white text-xl md:text-2xl font-bold mb-3 md:mb-4">
              ChainFundMe
            </h2>
            <p className="text-gray-200 mb-4 md:mb-6 text-sm md:text-base">
              Empowering communities through blockchain-based fundraising
              solutions.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
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

          <div className="text-left z-30">
            <h3 className="text-white font-semibold text-base md:text-lg mb-3 md:mb-4">
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
                    <ChevronRight
                      size={14}
                      className="mr-1 md:mr-1 flex-shrink-0 text-white"
                    />
                    <span className="text-gray-200 hover:text-white ">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left">
            <h3 className="text-white font-semibold text-base md:text-lg mb-3 md:mb-4">
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
                    <ChevronRight
                      size={14}
                      className="mr-1 md:mr-1 flex-shrink-0 text-white"
                    />
                    <span className="text-gray-200 hover:text-white">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left z-20">
            <h3 className="text-white font-semibold text-base md:text-lg mb-3 md:mb-4">
              Subscribe
            </h3>
            <p className="text-gray-200 mb-3 text-xs md:text-sm">
              Stay updated with our latest news and announcements
            </p>
            <div className="flex flex-col space-y-2 md:space-y-3 max-w-xs sm:mx-0 ">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 pl-9 md:pl-10 bg-white/20 border border-white/30 rounded-lg text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                />
                <Mail
                  className="absolute left-3 top-2.5 text-gray-300"
                  size={14}
                />
              </div>
              <button className="bg-white text-blue-900 hover:bg-blue-100 transition-colors px-4 py-2 rounded-lg font-medium text-sm md:text-base">
                Subscribe
              </button>
              <p className="text-xs text-gray-300">
                By subscribing you agree to our privacy policy
              </p>
            </div>
          </div>
        </div>

        <div className=" absolute z-0 left-[-2rem] top-[10rem] ">
          <Image
            src="/layout/Cone.png"
            alt="cone"
            width={150}
            height={100}
            className="w-24 md:w-32 lg:w-36 z-20"
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <hr className="border-gray-400/30" />
        </div>

        <div className="max-w-7xl mx-auto mt-4 md:mt-6 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              { href: "/terms", label: "Terms of Service" },
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/cookies", label: "Cookie Policy" },
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
            © ChainFundMe, Inc. {new Date().getFullYear()}
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