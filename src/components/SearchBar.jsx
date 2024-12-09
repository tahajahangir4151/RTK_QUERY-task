import { Search, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { githubApi } from "../store/services/githubApi";
import { AnimatePresence, motion } from "framer-motion";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const inputRef = useRef(null);

  const { data: searchResults } = githubApi.useSearchRepositoriesQuery(
    debouncedSearch,
    {
      skip: debouncedSearch.length < 3,
    }
  );
  console.log(searchResults),
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside());
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
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
      <AnimatePresence>
        {isOpen && searchResults && searchResults.items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="max-h-96 overflow-y-auto">
              {searchResults.items.slice(0, 5).map((repo) => (
                <motion.div
                  key={repo.id}
                  whileHover={{ backgroundColor: "rgba(59,130,246,0.1)" }}
                  className="cursor-pointer"
                >
                  <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                    <div className="flex items-start">
                      <img
                        src={repo.owner.avatar_url}
                        alt={repo.owner.login}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">
                          {repo.full_name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {repo.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
