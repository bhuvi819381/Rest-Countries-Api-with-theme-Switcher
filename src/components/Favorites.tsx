import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaTimes } from "react-icons/fa";
import { Country, CountryCardInfo } from "../types";
import CountryCard from "./CountryCard";

interface FavoritesProps {
  countries: Country[];
  isOpen: boolean;
  onClose: () => void;
}

const Favorites = ({ countries, isOpen, onClose }: FavoritesProps) => {
  const [favoriteCountries, setFavoriteCountries] = useState<CountryCardInfo[]>([]);

  useEffect(() => {
    const loadFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem("favoriteCountries") || "[]");
      
      if (favorites.length > 0 && countries.length > 0) {
        const favoriteCountryData = countries
          .filter(country => favorites.includes(country.alpha3Code))
          .map(country => ({
            flag: country.flag,
            name: country.name,
            population: country.population,
            region: country.region,
            capital: country.capital,
            alpha3Code: country.alpha3Code
          }));
        
        setFavoriteCountries(favoriteCountryData);
      } else {
        setFavoriteCountries([]);
      }
    };

    loadFavorites();
    
    // Add event listener for storage changes
    window.addEventListener("storage", loadFavorites);
    
    return () => {
      window.removeEventListener("storage", loadFavorites);
    };
  }, [countries, isOpen]);

  // Listen for changes to localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const favorites = JSON.parse(localStorage.getItem("favoriteCountries") || "[]");
      
      if (favorites.length > 0 && countries.length > 0) {
        const favoriteCountryData = countries
          .filter(country => favorites.includes(country.alpha3Code))
          .map(country => ({
            flag: country.flag,
            name: country.name,
            population: country.population,
            region: country.region,
            capital: country.capital,
            alpha3Code: country.alpha3Code
          }));
        
        setFavoriteCountries(favoriteCountryData);
      } else {
        setFavoriteCountries([]);
      }
    };

    // Create a custom event for our components to trigger
    window.addEventListener("favoritesUpdated", handleStorageChange);
    
    return () => {
      window.removeEventListener("favoritesUpdated", handleStorageChange);
    };
  }, [countries]);

  const clearAllFavorites = () => {
    localStorage.setItem("favoriteCountries", "[]");
    setFavoriteCountries([]);
    // Dispatch event to notify other components
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md h-full bg-Light-Mode-Background dark:bg-Dark-Mode-Background overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-Light-Mode-Background dark:bg-Dark-Mode-Elements z-10 p-4 flex justify-between items-center border-b dark:border-gray-700">
              <div className="flex items-center gap-2">
                <FaHeart className="text-red-500" />
                <h2 className="text-xl font-bold">Favorite Countries</h2>
              </div>
              <div className="flex items-center gap-2">
                {favoriteCountries.length > 0 && (
                  <button
                    onClick={clearAllFavorites}
                    className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close favorites"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="p-4">
              {favoriteCountries.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FaHeart className="text-4xl text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Favorites Yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-xs">
                    Click the heart icon on any country card to add it to your favorites.
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {favoriteCountries.map((country) => (
                    <motion.div
                      key={country.alpha3Code}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex justify-center"
                    >
                      <CountryCard country={country} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Favorites;
