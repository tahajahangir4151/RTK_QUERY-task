import { Search, X } from "lucide-react";
import React, { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search repositories..."
          className="w-full px-4 py-3 pl-12 pr-10 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus-ring-blue-500 dark:text-white text-lg transition-all duration-200"
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 mt-1" />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5 mt-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
