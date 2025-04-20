import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import Favorites from "./Favorites";
import { motion } from "framer-motion";
import { FaGlobeAmericas, FaHeart } from "react-icons/fa";
import { Country } from "../types";

interface HeaderProps {
  countries: Country[];
}

const Header = ({ countries }: HeaderProps) => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(() => {
    const favorites = JSON.parse(
      localStorage.getItem("favoriteCountries") || "[]"
    );
    return favorites.length;
  });

  // Update favorites count when localStorage changes
  useState(() => {
    const handleStorageChange = () => {
      const favorites = JSON.parse(
        localStorage.getItem("favoriteCountries") || "[]"
      );
      setFavoritesCount(favorites.length);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("favoritesUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoritesUpdated", handleStorageChange);
    };
  });

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <>
      <motion.header
        className="sticky top-0 z-40 w-full h-[80px] mx-auto px-4 md:px-[5rem] py-[1.58rem] flex items-center justify-between leading-0 dark:bg-Dark-Mode-Elements bg-White shadow-md transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <FaGlobeAmericas className="text-2xl text-blue-500" />
          <h1 className="text-xl md:text-2xl font-extrabold dark:text-White">
            Where in the world?
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <motion.button
            onClick={toggleFavorites}
            className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-full dark:bg-Dark-Mode-Background bg-gray-100 shadow-sm hover:shadow transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart className="text-red-500" />
            <span className="hidden sm:inline">Favorites</span>
            {favoritesCount > 0 && (
              <motion.span
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                {favoritesCount}
              </motion.span>
            )}
          </motion.button>
          <ThemeSwitcher />
        </div>
      </motion.header>

      <Favorites
        countries={countries}
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
      />
    </>
  );
};

export default Header;
