import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
function Socials() {
  return (
    <div className="flex flex-row gap-x-4 items-center justify-center mt-4 text-sidebar-content md:text-xl text-lg cursor-pointer">
      <span>
        <FaFacebookF />
      </span>
      <span>
        <FaInstagram />
      </span>
      <span>
        <FaLinkedinIn />
      </span>
      <span>
        <FaXTwitter />
      </span>
      <span>
        <FaPlus />
      </span>
      <span>
        <FaHandHoldingUsd />
      </span>
    </div>
  );
}
export default Socials;
