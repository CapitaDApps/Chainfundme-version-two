import { GoPlus } from "react-icons/go";
import Link from "next/link";

function CreateCamBtn() {
  return (
    <div>
      <Link
        href="/create-campaign"
        style={{ boxShadow: "0 0 15px rgba(0,0,0,0.15)" }}
        className="px-8 inline-flex py-3 bg-[#FFFFFF] shadow-lg text-[#2379BC] text-[14px] rounded-2xl text-center cursor-pointer items-center justify-center"
      >
        <GoPlus className="mr-2 text-[#2379BC]" />
        <span className="text-[#2379BC]">Create Campaign</span>
      </Link>
    </div>
  );
}
export default CreateCamBtn;
