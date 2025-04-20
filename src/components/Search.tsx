import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import RegionFilter from "./RegionFilter";
import { motion } from "framer-motion";

type SearchProps = {
  onSearchChange: (text: string) => void;
  onRegionChange: (region: string) => void;
};

const Search = ({ onSearchChange, onRegionChange }: SearchProps) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setSearchText("");
    onSearchChange("");
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-full md:w-auto"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <label
          htmlFor="search"
          className="inline-flex items-center justify-start w-full md:w-[350px] py-4 px-6 gap-3 rounded-md dark:bg-Dark-Mode-Elements bg-White shadow-md transition-shadow hover:shadow-lg"
        >
          <IoMdSearch className="text-xl text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            name="search"
            id="search"
            value={searchText}
            className="w-full border-none outline-none bg-transparent dark:bg-Dark-Mode-Elements dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300"
            placeholder="Search for a country..."
            onChange={handleSearchChange}
          />
          {searchText && (
            <button
              onClick={clearSearch}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </label>
      </motion.div>
      <RegionFilter onRegionChange={onRegionChange} />
    </motion.div>
  );
};

export default Search;
