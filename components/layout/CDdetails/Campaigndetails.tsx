import Leftpart from "./Leftpart";
import Rightpart from "./Rightpart";
function Campaigndetails() {
  return (
    <div className="px-6 ">
      <h1 className="text-[#2C2C2C] font-bold text-4xl pt-6">
        Help Bob Nagamallaiah’s Family Rebuild and Find Strength
      </h1>
      <div className="pt-8">
        <div className="flex flex-row justify-between">
          <Leftpart />
          <Rightpart />
        </div>
      </div>
    </div>
  );
}
export default Campaigndetails;
