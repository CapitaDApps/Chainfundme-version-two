import Image from "next/image";
import CreateCamBtn from "../CreateCamBtn";
import Link from "next/link";

function Raisefund() {
  return (
    <div className="block md:hidden pt-6">
      <div className="relative bg-[#F3F3F3] flex flex-col items-center justify-center mx-[-1rem]">
        <div className="absolute top-0 right-0">
          <Image src="/layout/rol2.png" alt="rol" width={30} height={30} />
        </div>

        <div className="px-4 py-6 flex flex-col items-center space-y-3">
          <p className="text-[14px] text-center">Want to raise some funds?</p>
          <div className="flex flex-row space-x-3">
            <CreateCamBtn />
            <Link
              href="/how-it-works"
              style={{ boxShadow: "0 0 15px rgba(0,0,0,0.15)" }}
              className=" px-3 md:px-6 inline-flex py-3 bg-[#FFFFFF] shadow-lg text-[#2379BC] text-[14px] rounded-2xl text-center cursor-pointer items-center justify-center"
            >
              <span className="text-[#2379BC] text-xs md:text-sm">
                How it works
              </span>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0">
          <Image src="/layout/cone2.png" alt="cone" width={30} height={30} />
        </div>
      </div>
    </div>
  );
}
export default Raisefund;
