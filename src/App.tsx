import "./App.css";
import useFetch from "react-fetch-hook";
import SearchPage from "./components/searchPage/SearchPage";

const App = () => {
  const { isLoading, error, data } = useFetch(
    "https://restcountries.com/v3.1/all"
  );

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
