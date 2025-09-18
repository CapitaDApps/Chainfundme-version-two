import Campaigns from "@/components/layout/Donation/Campaigns";
import SearchBar from "@/components/layout/SearchBar";
function MyDonationsPage() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-sidebar-content flex flex-row font-semibold text-[32px] text-[#101828]">
          Track Your&nbsp;{" "}
          <span className="text-[#2379bc]">Contributions&nbsp;</span> & Impact
        </h1>
        <SearchBar />
        <Campaigns />
      </div>
    </div>
  );
}

export default MyDonationsPage;
