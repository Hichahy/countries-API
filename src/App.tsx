import React, { useState, useEffect }  from 'react';
import "./App.css";
import SearchPage from "./components/searchPage/SearchPage";

const App = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState([]);

//Fetch
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then(
            (result) => {
              setIsLoading(true);
              setdata(result);
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
      <SearchPage data={data} isLoading={isLoading} error={error} />
    </div>
  );
};

export default App;
