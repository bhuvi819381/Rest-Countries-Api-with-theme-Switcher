import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Main from "./components/Main";
import CountryDetail from "./components/CountryDetail";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import { Country } from "./types";

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/bhuvi819381/b26f4af85733013119564de9e986fb8f/raw/46068ee8baa5bd8d96616b4b0176eaf7928efd99/restCountryData.json"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch countries: ${response.status}`);
        }

        const data = await response.json();
        setCountries(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError("Failed to load countries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark:bg-Dark-Mode-Background bg-Light-Mode-Background dark:text-white transition-colors duration-300">
      <BrowserRouter>
        <Header countries={countries} />
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    initialCountries={countries}
                    loading={loading}
                    error={error}
                  />
                }
              />
              <Route path="/country/:countryCode" element={<CountryDetail />} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
        <ScrollToTop />
      </BrowserRouter>
    </div>
  );
};

export default App;
