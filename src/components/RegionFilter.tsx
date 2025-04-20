import { useState, useEffect, useRef } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaGlobeAmericas,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type RegionFilterProps = {
  onRegionChange: (region: string) => void;
};

const RegionFilter = ({ onRegionChange }: RegionFilterProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    onRegionChange(region);
    setShowOptions(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearFilter = () => {
    setSelectedRegion("");
    onRegionChange("");
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { opacity: 1, y: 0, height: "auto" },
  };

  return (
    <motion.div
      ref={dropdownRef}
      className="relative w-full md:w-auto"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div
        onClick={toggleOptions}
        className="flex items-center justify-between w-full md:w-[220px] py-4 px-6 rounded-md cursor-pointer dark:bg-Dark-Mode-Elements bg-White shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex items-center gap-2 truncate">
          {selectedRegion ? (
            <>
              <FaGlobeAmericas className="text-blue-500" />
              <span className="truncate">{selectedRegion}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter();
                }}
                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Clear region filter"
              >
                <FaTimes size={12} />
              </button>
            </>
          ) : (
            <>
              <FaGlobeAmericas className="text-gray-400" />
              <span className="text-gray-500 dark:text-gray-300">
                Filter by Region
              </span>
            </>
          )}
        </div>
        <motion.span
          animate={{ rotate: showOptions ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaAngleDown className="text-gray-500 dark:text-gray-300" />
        </motion.span>
      </div>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            className="absolute mt-1 w-full md:w-[220px] rounded-md shadow-lg dark:bg-Dark-Mode-Elements bg-White z-10 overflow-hidden"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
          >
            {regions.map((region, index) => (
              <motion.div
                key={region}
                className={`px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                  selectedRegion === region
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
                onClick={() => handleRegionSelect(region)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                {region}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RegionFilter;
