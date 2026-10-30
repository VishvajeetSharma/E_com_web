// components/SearchBar/Searchbar.tsx
import React from "react";
import { FiSearch } from "react-icons/fi";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  category?: string;
  setCategory?: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex items-center gap-2 w-full md:w-70 max-w-md">
      <div className="flex items-center flex-1 bg-gray-50 border  border-1 border-[#f5c0d8] rounded-full  px-3 py-1.5 hover:border-pink-300 focus-within:border-pink-400 transition-colors">
        <FiSearch size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none px-2 text-sm text-gray-700 placeholder:text-gray-400 "
        />
      </div>
    </div>
  );
};

export default SearchBar;