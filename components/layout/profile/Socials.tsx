import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { UserDocument } from "@/types/api";

interface SocialsProps {
  owner: UserDocument;
}

function Socials({ owner }: SocialsProps) {
  // Handle both Map and object types for socialLinks
  const socialLinks = owner.socialLinks ? 
    (owner.socialLinks instanceof Map ? 
      Object.fromEntries(owner.socialLinks) : 
      owner.socialLinks) : 
    {};

  const handleSocialClick = (url: string) => {
    if (url) {
      // Add https:// if the URL doesn't start with http
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-row gap-x-4 items-center justify-center mt-4 text-sidebar-content md:text-xl text-lg">
      {socialLinks.twitter && (
        <span 
          className="cursor-pointer hover:text-blue-500 transition-colors"
          onClick={() => handleSocialClick(socialLinks.twitter)}
          title="Twitter"
        >
          <FaXTwitter />
        </span>
      )}
      {socialLinks.facebook && (
        <span 
          className="cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => handleSocialClick(socialLinks.facebook)}
          title="Facebook"
        >
          <FaFacebookF />
        </span>
      )}
      {socialLinks.linkedin && (
        <span 
          className="cursor-pointer hover:text-blue-700 transition-colors"
          onClick={() => handleSocialClick(socialLinks.linkedin)}
          title="LinkedIn"
        >
          <FaLinkedinIn />
        </span>
      )}
      {socialLinks.instagram && (
        <span 
          className="cursor-pointer hover:text-pink-500 transition-colors"
          onClick={() => handleSocialClick(socialLinks.instagram)}
          title="Instagram"
        >
          <FaInstagram />
        </span>
      )}
      {socialLinks.website && (
        <span 
          className="cursor-pointer hover:text-green-600 transition-colors"
          onClick={() => handleSocialClick(socialLinks.website)}
          title="Website"
        >
          <FaGlobe />
        </span>
      )}
      {/* Show placeholder icons for missing social links */}
      {!socialLinks.twitter && !socialLinks.facebook && !socialLinks.linkedin && !socialLinks.instagram && !socialLinks.website && (
        <>
          <span className="text-gray-400">
            <FaXTwitter />
          </span>
          <span className="text-gray-400">
            <FaFacebookF />
          </span>
          <span className="text-gray-400">
            <FaLinkedinIn />
          </span>
          <span className="text-gray-400">
            <FaInstagram />
          </span>
          <span className="text-gray-400">
            <FaGlobe />
          </span>
        </>
      )}
    </div>
  );
}
export default Socials;
