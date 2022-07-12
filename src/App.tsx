import React, { useState, useEffect } from "react";
import "./App.css";
import CountryInformation from "./components/countryInformation/CountryInformation";
import SearchPage from "./components/searchPage/SearchPage";
import { Route, Routes, useLocation } from "react-router-dom";

const App = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
        <i className="bi bi-moon"> Dark Mode</i>
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
        <Route
          path="/country/:cca2"
          element={<CountryInformation/>}
        />
      </Routes>
    </div>
  );
};

export default App;
