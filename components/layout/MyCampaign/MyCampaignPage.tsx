import CreateCamBtn from "@/components/layout/CreateCamBtn";
import Filter from "@/components/layout/Explore/Filter";
import Campaignsdraft from "@/components/layout/MyCampaign/Campaignsdraft";
import SearchBar from "@/components/layout/SearchBar";
function MyCampaignsPage() {
  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-4 px-4">
        <CreateCamBtn />
        <Filter />
      </div>
      <div className="flex flex-col items-center justify-center pt-6">
        <h1 className="text-sidebar-content flex flex-row font-semibold text-[32px] text-[#101828]">
          <span className="font-semibold">Manage&nbsp;</span> Your&nbsp;{" "}
          <span className="text-[#2379bc] font-semibold">Campaigns&nbsp;</span>{" "}
        </h1>
        <SearchBar />
      </div>
      <div>
        <Campaignsdraft />
      </div>
    </div>
  );
}
export default MyCampaignsPage;
