import React, { useState, useEffect } from "react";
import "./App.css";
import CountryInformation from "./components/countryInformation/CountryInformation";
import SearchPage from "./components/searchPage/SearchPage";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  //Dark Mode
  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");

  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");

  };

  const storedTheme = localStorage.getItem("theme");

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

  if (defaultDark) {
    setDark();
  }

  const toggleTheme = () => {
    setDarkMode((prev) => !prev)
    if (!darkMode) {
      setDark();
    } else {
      setLight();
    }
  };

  //Fetch
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(true);
          setdata(result);
          setFiltered(result);
        },
        (error) => {
          setIsLoading(true);
          setError(error);
        }
      );
  }, []);

  return (
    <div className="App">
      <header className="main-header">
        <h1>Where in the world?</h1>
        <button onClick={toggleTheme}>
          <i className={`${darkMode ? "bi bi-moon-fill" : "bi bi-moon"}`} />
          Dark Mode
        </button>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <SearchPage
              filtered={filtered}
              setFiltered={setFiltered}
              data={data}
              isLoading={isLoading}
              error={error}
            />
          }
        />
        <Route path="/country/:cca2" element={<CountryInformation />} />
      </Routes>
    </div>
  );
};

export default App;
