import CategoriesTab from "@/components/layout/ExploreCampaign/CategoriesTab";
import CreateCamBtn from "@/components/layout/CreateCamBtn";
import Filter from "@/components/layout/ExploreCampaign/Filter";
import SearchBar from "@/components/layout/SearchBar";

function ExploreCampaignPage() {
  return (
    <div>
      <p>
        Welcome back, <span className="text-[#2379bc]">Tarey Kasali</span>
      </p>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-sidebar-content flex flex-row font-semibold text-[32px] text-[#101828]">
          <span className="font-[1000]">Find&nbsp;</span>
          <span className="text-[#2379bc]">campaigns</span>.
          <span className="font-[1000]">&nbsp;Fund&nbsp;</span>
          what you care about.
        </h1>
        <SearchBar />
      </div>
      <div className="flex flex-row justify-between items-center mt-10 px-4">
        <CreateCamBtn />
        <Filter />
      </div>
      <hr className="border-[#CDCDCD]/40 w-full my-8" />
      <CategoriesTab />
    </div>
  );
}

export default ExploreCampaignPage;
