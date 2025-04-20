import Search from "./Search";
import Countries from "./Countries";
import { useState, useEffect } from "react";
import { Country } from "../types";
import { motion } from "framer-motion";

interface MainProps {
  initialCountries: Country[];
  loading: boolean;
  error: string | null;
}

const Main = ({
  initialCountries,
  loading: initialLoading,
  error: initialError,
}: MainProps) => {
  const [countries, setCountries] = useState<Country[]>(initialCountries);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(initialLoading);
  const [error, setError] = useState<string | null>(initialError);

  // Update state when props change
  useEffect(() => {
    setCountries(initialCountries);
    setLoading(initialLoading);
    setError(initialError);
  }, [initialCountries, initialLoading, initialError]);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesRegion =
      selectedRegion === "" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <motion.main
      className="w-full min-h-[calc(100vh-80px)] dark:bg-Dark-Mode-Background bg-Light-Mode-Background dark:text-white transition-colors duration-300 px-4 md:px-[5rem] py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Search
        onSearchChange={setSearchText}
        onRegionChange={setSelectedRegion}
      />

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-red-100 dark:bg-red-900/30 p-6 rounded-lg max-w-md"
          >
            <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
              Error
            </h2>
            <p className="text-red-600 dark:text-red-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      ) : (
        <Countries filteredCountries={filteredCountries} isLoading={loading} />
      )}
    </motion.main>
  );
};

export default Main;
