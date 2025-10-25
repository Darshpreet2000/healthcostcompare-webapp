"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Mic } from "lucide-react"; // Assuming lucide-react for icons

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/results?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full max-w-xl mx-auto bg-white rounded-full shadow-xl focus-within:ring-4 focus-within:ring-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105">
      <div className="relative flex-grow flex items-center">
        <Search className="absolute left-5 text-gray-500" size={24} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Knee replacement cost in Alabama"
          className="w-full py-4 pl-14 pr-6 text-xl text-gray-800 bg-transparent border-none focus:outline-none placeholder-gray-500"
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-white p-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center mr-2"
        aria-label="Search"
      >
        <Search size={24} />
      </button>
      {/* Voice input optional (bonus) */}
      <button
        type="button"
        className="bg-gray-100 text-gray-600 p-4 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center mr-3"
        title="Voice input (optional)"
        disabled // Disable for now
        aria-label="Voice Search"
      >
        <Mic size={24} />
      </button>
    </form>
  );
};

export default SearchBar;
