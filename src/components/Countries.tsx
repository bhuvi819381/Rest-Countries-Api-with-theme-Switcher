import { Country, CountryCardInfo } from "../types";
import CountryCard from "./CountryCard";
import SkeletonCard from "./SkeletonCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaSort,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortNumericDown,
  FaSortNumericUp,
} from "react-icons/fa";

interface CountriesProps {
  filteredCountries: Country[];
  isLoading?: boolean;
}

type SortOption = "name" | "population" | "region" | "capital";
type SortDirection = "asc" | "desc";

const Countries = ({
  filteredCountries,
  isLoading = false,
}: CountriesProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [sortedCountries, setSortedCountries] = useState<CountryCardInfo[]>([]);
  const [showSortOptions, setShowSortOptions] = useState(false);

  // Convert and sort countries
  useEffect(() => {
    // Convert Country to CountryCardInfo
    const countryCards: CountryCardInfo[] = filteredCountries.map(
      (country) => ({
        flag: country.flag,
        name: country.name,
        population: country.population,
        region: country.region,
        capital: country.capital,
        alpha3Code: country.alpha3Code,
      })
    );

    // Sort countries
    const sorted = [...countryCards].sort((a, b) => {
      if (sortBy === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "population") {
        return sortDirection === "asc"
          ? a.population - b.population
          : b.population - a.population;
      } else if (sortBy === "region") {
        return sortDirection === "asc"
          ? a.region.localeCompare(b.region)
          : b.region.localeCompare(a.region);
      } else {
        // Sort by capital
        const capA = a.capital || "";
        const capB = b.capital || "";
        return sortDirection === "asc"
          ? capA.localeCompare(capB)
          : capB.localeCompare(capA);
      }
    });

    setSortedCountries(sorted);
  }, [filteredCountries, sortBy, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleSortChange = (option: SortOption) => {
    if (sortBy === option) {
      toggleSortDirection();
    } else {
      setSortBy(option);
      setSortDirection("asc");
    }
    setShowSortOptions(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const getSortIcon = (option: SortOption) => {
    if (sortBy !== option) return <FaSort className="text-gray-400" />;

    if (option === "population") {
      return sortDirection === "asc" ? (
        <FaSortNumericDown className="text-blue-500" />
      ) : (
        <FaSortNumericUp className="text-blue-500" />
      );
    } else {
      return sortDirection === "asc" ? (
        <FaSortAlphaDown className="text-blue-500" />
      ) : (
        <FaSortAlphaUp className="text-blue-500" />
      );
    }
  };

  // Render skeleton cards when loading
  if (isLoading) {
    return (
      <div className="w-full h-full mt-11">
        <div className="mb-6 flex justify-end relative">
          <div className="w-48 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
          {[...Array(12)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full h-full mt-11"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {sortedCountries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold mb-4">No countries found</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 flex justify-end relative">
            <div className="relative">
              <button
                onClick={() => setShowSortOptions(!showSortOptions)}
                className="flex items-center gap-2 px-4 py-2 rounded-md dark:bg-Dark-Mode-Elements bg-White shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span>
                  Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                </span>
                {getSortIcon(sortBy)}
              </button>

              <AnimatePresence>
                {showSortOptions && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg dark:bg-Dark-Mode-Elements bg-White z-10 overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {["name", "population", "region", "capital"].map(
                      (option) => (
                        <button
                          key={option}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between ${
                            sortBy === option
                              ? "bg-gray-100 dark:bg-gray-700"
                              : ""
                          }`}
                          onClick={() => handleSortChange(option as SortOption)}
                        >
                          <span>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </span>
                          {getSortIcon(option as SortOption)}
                        </button>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
            {sortedCountries.map((country, index) => (
              <CountryCard
                key={country.alpha3Code || index}
                country={country}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Countries;
