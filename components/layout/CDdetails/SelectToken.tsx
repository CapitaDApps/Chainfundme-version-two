import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectToken() {
  return (
    <div className="rounded-md bg-transparent">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4">

          <div className="w-full md:w-[70%] py-2 md:py-3">
            <label className="md:text-sm text-[12px] text-sidebar-content mb-2 block">
              Select Token
            </label>
            <div className="relative">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CPT">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/layout/capita.png"
                        alt="CPT"
                        width={20}
                        height={20}
                        className="bg-purple-700 rounded-2xl"
                      />
                      <span>CPT</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="ETH">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/layout/eth.png"
                        alt="ETH"
                        width={20}
                        height={20}
                      />
                      <span>ETH</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="USDC">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/layout/usdc.png"
                        alt="USDC"
                        width={20}
                        height={20}
                      />
                      <span>USDC</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sidebar-content">

              </span>
            </div>
          </div>
          <div className="w-full md:w-[100%] md:py-3 py-2">
            <label className="md:text-sm text-[12px] text-sidebar-content block mb-1">
              Enter Amount
            </label>
            <input
              placeholder="0.00"
              className="w-full rounded-md bg-background border border-disabled-text px-3 py-2 h-10 text-sidebar-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent md:text-sm text-[12px]"
            />
            <div className="text-xs text-sidebar-content mt-2">0.000ETH</div>
          </div>
        </div>

        <div className="w-full md:w-[100%] py-2">
          <label className="text-sm block mb-2 text-white">Fund Campaign</label>
          <button className="w-full cursor-pointer md:px-4 py-2.5 rounded-lg text-white md:text-sm text-[12px] bg-[#003DEF]">
            Fund Campaign
          </button>
        </div>
      </div>
  );
}

export default SelectToken;
