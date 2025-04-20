import { useState } from "react";
import { CountryCardInfo } from "../types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegHeart, FaHeart, FaInfoCircle } from "react-icons/fa";

interface CountryCardProps {
  country: CountryCardInfo;
}

const CountryCard = ({ country }: CountryCardProps) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(
      localStorage.getItem("favoriteCountries") || "[]"
    );
    return favorites.includes(country.alpha3Code);
  });

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const favorites = JSON.parse(
      localStorage.getItem("favoriteCountries") || "[]"
    );
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter(
        (code: string) => code !== country.alpha3Code
      );
    } else {
      newFavorites = [...favorites, country.alpha3Code];
    }

    localStorage.setItem("favoriteCountries", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -10,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 },
      }}
      className="w-full max-w-[280px] h-[380px] dark:bg-Dark-Mode-Elements bg-White rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative group"
    >
      <div className="absolute top-3 right-3 z-10">
        <motion.button
          onClick={toggleFavorite}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300"
          } shadow-md`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </motion.button>
      </div>

      <Link to={`/country/${country.alpha3Code}`} className="block h-full">
        <div className="h-[160px] overflow-hidden">
          <motion.img
            className="w-full h-full object-cover"
            src={country.flag}
            alt={`Flag of ${country.name}`}
            loading="lazy"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="p-6">
          <h2 className="text-xl font-extrabold mb-4 truncate group-hover:text-blue-500 transition-colors duration-300">
            {country.name}
          </h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Population:</span>{" "}
              {country.population.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {country.region}
            </p>
            <p>
              <span className="font-semibold">Capital:</span> {country.capital}
            </p>
          </div>

          <motion.div
            className="mt-4 flex justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.span
              className="inline-flex items-center gap-1 text-blue-500 font-medium"
              whileHover={{ x: 5 }}
            >
              <FaInfoCircle /> View Details
            </motion.span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CountryCard;
