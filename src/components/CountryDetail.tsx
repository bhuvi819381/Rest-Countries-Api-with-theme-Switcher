import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Country } from "../types";
import {
  FaArrowLeft,
  FaMapMarkedAlt,
  FaHeart,
  FaRegHeart,
  FaInfoCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const CountryDetail = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<
    { name: string; alpha3Code: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Check if country is in favorites
  useEffect(() => {
    if (countryCode) {
      const favorites = JSON.parse(
        localStorage.getItem("favoriteCountries") || "[]"
      );
      setIsFavorite(favorites.includes(countryCode));
    }
  }, [countryCode]);

  // Listen for changes to favorites
  useEffect(() => {
    const handleFavoritesChange = () => {
      if (countryCode) {
        const favorites = JSON.parse(
          localStorage.getItem("favoriteCountries") || "[]"
        );
        setIsFavorite(favorites.includes(countryCode));
      }
    };

    window.addEventListener("favoritesUpdated", handleFavoritesChange);
    window.addEventListener("storage", handleFavoritesChange);

    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesChange);
      window.removeEventListener("storage", handleFavoritesChange);
    };
  }, [countryCode]);

  // Toggle favorite status
  const toggleFavorite = () => {
    if (!countryCode) return;

    const favorites = JSON.parse(
      localStorage.getItem("favoriteCountries") || "[]"
    );
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((code: string) => code !== countryCode);
    } else {
      newFavorites = [...favorites, countryCode];
    }

    localStorage.setItem("favoriteCountries", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);

    // Dispatch event to notify other components
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  // Toggle map view
  const toggleMapView = () => {
    setShowMap(!showMap);
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/bhuvi819381/b26f4af85733013119564de9e986fb8f/raw/46068ee8baa5bd8d96616b4b0176eaf7928efd99/restCountryData.json"
        );
        const data: Country[] = await response.json();

        // Find the country by alpha3Code
        const foundCountry = data.find(
          (c) => c.alpha3Code.toLowerCase() === countryCode?.toLowerCase()
        );

        if (foundCountry) {
          setCountry(foundCountry);

          // Get border countries
          if (foundCountry.borders && foundCountry.borders.length > 0) {
            const borderData = foundCountry.borders
              .map((border) => {
                const borderCountry = data.find((c) => c.alpha3Code === border);
                return borderCountry
                  ? {
                      name: borderCountry.name,
                      alpha3Code: borderCountry.alpha3Code,
                    }
                  : null;
              })
              .filter(Boolean) as { name: string; alpha3Code: string }[];

            setBorderCountries(borderData);
          }
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [countryCode]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <motion.div
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-10 w-20 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="h-10 w-20 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-lg">
            <div className="h-80 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                backgroundPosition: ["-200% 0", "200% 0"],
                transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
              }}
            />
          </div>

          <div className="space-y-6">
            <div className="h-10 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"
                    style={{ animationDelay: `${i * 0.1 + 0.5}s` }}
                  ></div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-3 animate-pulse"></div>
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="container mx-auto px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-2 mb-12 shadow-md dark:bg-Dark-Mode-Elements bg-White rounded-md transition-all hover:shadow-lg"
        >
          <FaArrowLeft /> Back
        </button>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Country not found</h2>
          <p className="mb-8">
            We couldn't find the country you're looking for.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-12">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-2 shadow-md dark:bg-Dark-Mode-Elements bg-White rounded-md transition-all hover:shadow-lg"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back
        </motion.button>

        <div className="flex gap-2">
          <motion.button
            onClick={toggleMapView}
            className={`flex items-center gap-2 px-4 py-2 rounded-md shadow-md transition-all ${
              showMap
                ? "bg-blue-500 text-white"
                : "dark:bg-Dark-Mode-Elements bg-White"
            }`}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle map view"
          >
            <FaMapMarkedAlt />
            <span className="hidden sm:inline">Map</span>
          </motion.button>

          <motion.button
            onClick={toggleFavorite}
            className={`flex items-center gap-2 px-4 py-2 rounded-md shadow-md transition-all ${
              isFavorite
                ? "bg-red-500 text-white"
                : "dark:bg-Dark-Mode-Elements bg-White"
            }`}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
            <span className="hidden sm:inline">
              {isFavorite ? "Saved" : "Save"}
            </span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showMap ? (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 rounded-lg overflow-hidden shadow-lg"
          >
            <iframe
              title={`Map of ${country.name}`}
              width="100%"
              height="450"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${country.name}`}
              allowFullScreen
              className="rounded-lg"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src={country.flag}
            alt={`Flag of ${country.name}`}
            className="w-full h-auto shadow-md rounded-md"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          <h1 className="text-3xl font-extrabold">{country.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Native Name:</span>{" "}
                {country.nativeName}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{" "}
                {country.subregion}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {country.topLevelDomain?.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{" "}
                {country.currencies
                  ?.map((currency) => currency.name)
                  .join(", ")}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {country.languages?.map((language) => language.name).join(", ")}
              </p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div className="pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold mr-2">Border Countries:</h3>
                {borderCountries.map((border) => (
                  <motion.div
                    key={border.alpha3Code}
                    whileHover={{
                      y: -3,
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={`/country/${border.alpha3Code}`}
                      className="px-4 py-1 text-sm shadow-md dark:bg-Dark-Mode-Elements bg-White rounded-sm inline-block"
                    >
                      {border.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CountryDetail;
