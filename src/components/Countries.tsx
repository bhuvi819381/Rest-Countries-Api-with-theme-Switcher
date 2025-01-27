import { useState, useEffect } from "react";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  // Fetch countries data from the API
  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/bhuvi819381/b26f4af85733013119564de9e986fb8f/raw/46068ee8baa5bd8d96616b4b0176eaf7928efd99/restCountryData.json"
    )
      .then((res) => res.json())
      .then((data) => setCountries(data));
    // Add error handling here
  }, []);

  return (
    <div className="w-full h-full mt-11">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
        {countries.map((country, index) => (
          <div key={index} className="w-[264px] h-[334px]">
            <img
              className="w-[264px] h-[159px] object-cover"
              src={country.flag}
              alt={country.name.common}
              loading="lazy"
            />
            <h2>Country: {country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Countries;
