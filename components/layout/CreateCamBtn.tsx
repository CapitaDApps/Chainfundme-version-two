// import { GoPlus } from "react-icons/go";
import Link from "next/link";

function CreateCamBtn() {
  return (
    <div>
      <Link
        href="/create"
        style={{ boxShadow: "0 0 15px rgba(0,0,0,0.15)" }}
        className=" px-3 md:px-7 inline-flex py-3 bg-[#003DEF] shadow-lg text-[#FFFFFF] text-[14px] rounded-sm text-center cursor-pointer items-center justify-center"
      >
        {/* <GoPlus className="mr-2 text-[#FFFFFF]" /> */}
        <span className="text-[#FFFFFF] text-xs md:text-sm">
          Create Campaign
        </span>
      </Link>
    </div>
  );
}
export default CreateCamBtn;
