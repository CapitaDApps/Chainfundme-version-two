"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className }: SearchBarProps) {
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = (e.target as HTMLInputElement).value;
      router.push(`/explore?search=${query}`);
    }
  };

  return (
    <div className={clsx("pt-4 w-full", className)}>
      <div className="flex items-center w-full max-w-3xl mx-auto bg-white border border-none pl-2 rounded-xl shadow-xl shadow-[#D5DFFC80] focus-within:ring-2 focus-within:ring-blue-500">
        <div className="flex items-center justify-center pl-2 py-3 md:py-4 cursor-pointer">
          <Search className="w-4 md:w-5 h-5 text-[#292D32]" />
        </div>
        <input
          type="text"
          placeholder="Search campaigns..."
          className="flex-1 px-2 py-2 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 block md:hidden"
          onKeyDown={handleSearch}
        />
        <input
          type="text"
          placeholder="Search campaigns across health, education, community, and more..."
          className="flex-1 px-3 py-1 bg-transparent outline-none text-sm md:text-base text-gray-700 placeholder-gray-400 hidden md:block"
          onKeyDown={handleSearch}
        />
      </div>
    </div>
  );
}
