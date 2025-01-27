import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Filter from "./Filter";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="flex items-center justify-between ">
      <label
        htmlFor="search"
        className="inline-flex items-center justify-start border border-gray-300 py-3 px-34 gap-3 rounded-md "
      >
        <IoMdSearch />
        <input
          type="text"
          name="search"
          id="search"
          className="border-none outline-none dark:placeholder:white "
          placeholder="Search for a country..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <Filter />
    </div>
  );
};
export default Search;
