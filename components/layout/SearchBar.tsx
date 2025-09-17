"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = (e.target as HTMLInputElement).value;
      router.push(`/explore?search=${query}`);
    }
  };

  return (
<div className="pt-4 w-full">
  <div className="flex items-center w-full max-w-3xl mx-auto bg-white border border-gray-200  pl-2 rounded-xl shadow-lg focus-within:ring-2 focus-within:ring-blue-500">
    <input
      type="text"
      placeholder="Search campaigns across health, education, community, and more..."
      className="flex-1 px-3 py-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
      onKeyDown={handleSearch}
    />
    <div className="flex items-center justify-center px-5 py-4 bg-blue-50 cursor-pointer rounded-r-xl rounded-l-3xl">
      <Search className="w-5 h-5 text-blue-500" />
    </div>
  </div>
</div>


  );
}
