import React, { useState, useEffect } from "react";
import "./App.css";
import CountryInformation from "./components/countryInformation/CountryInformation";
import SearchPage from "./components/searchPage/SearchPage";
import { Route, Routes } from "react-router-dom";
import useLocalStorage from "use-local-storage";

const App = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [filtered, setFiltered] = useState([]);


  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
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
    <div className="App" data-theme={theme}>
      <header className="main-header">
        <h1>Where in the world?</h1>
        <button onClick={switchTheme}>
          <i
            className={`${theme === "dark" ? "bi bi-moon-fill" : "bi bi-moon"}`}
          />
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
