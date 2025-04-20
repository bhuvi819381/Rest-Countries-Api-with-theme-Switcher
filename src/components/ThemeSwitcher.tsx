import { useState, useEffect } from "react";
import { IoIosMoon } from "react-icons/io";
import { FaSun } from "react-icons/fa";
import { motion } from "framer-motion";

const ThemeSwitcher = () => {
  // State to track the theme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if theme is saved in localStorage
    const savedTheme = localStorage.getItem("theme");

    // If theme is saved, use it; otherwise check system preference
    if (savedTheme) {
      return savedTheme === "dark";
    } else {
      // Check system preference
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
  });

  // Toggle the theme
  const themeSwitch = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.classList.toggle("dark", newMode); // Toggle the 'dark' class
      localStorage.setItem("theme", newMode ? "dark" : "light"); // Save preference
      return newMode;
    });
  };

  // Apply the initial theme based on the saved preference
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(e.matches);
      }
    };

    // Add listener for theme changes
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <motion.button
      onClick={themeSwitch}
      className="flex items-center gap-2 text-sm md:text-base px-3 py-2 rounded-full dark:bg-Dark-Mode-Elements bg-gray-100 shadow-sm hover:shadow transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: isDarkMode ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {isDarkMode ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <IoIosMoon className="text-indigo-700" />
        )}
      </motion.div>
      <span className="hidden sm:inline">
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </span>
    </motion.button>
  );
};

export default ThemeSwitcher;
