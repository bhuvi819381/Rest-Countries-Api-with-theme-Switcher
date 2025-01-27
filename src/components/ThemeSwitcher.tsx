import { useState, useEffect } from "react";
import { IoIosMoon } from "react-icons/io";
import { FaSun } from "react-icons/fa";

const ThemeSwitcher = () => {
  // State to track the theme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve theme from localStorage or default to true (dark mode)
    return localStorage.getItem("theme") === "dark";
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

  return (
    <button
      onClick={themeSwitch}
      className="flex items-center gap-2 text-lg px-4 py-2 rounded-md"
    >
      {isDarkMode ? (
        <>
          <FaSun className=" dark:text-white" />
          <span className="dark:text-white">Light Mode</span>
        </>
      ) : (
        <>
          <IoIosMoon className="text-gray-800" />
          <span className="dark:text-white">Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeSwitcher;
