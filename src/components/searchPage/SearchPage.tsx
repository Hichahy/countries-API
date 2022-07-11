import React, { useState, useEffect } from "react";
import SelectRegion from "../../layout/selectRegion/SelectRegion";
import "./searchPage.css";

interface IProps {
  data: any;
  isLoading: boolean;
  error: Error | null;
}

const SearchPage = ({ data, isLoading, error }: IProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleSearchInput = (e: any) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const handleSearchFilter = () => {
    const filteredSearch = data.filter((i: any) =>
      i.name.common.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (!searchValue) {
      setFiltered(data);
    } else if (searchValue) {
      setFiltered(filteredSearch);
    }
  };

  const handleSelectFilter = () => {
    const filteredSelect = data.filter(
      (i: any) => i.region.indexOf(selectedValue) >= 0
    );
    if (!selectedValue) {
      setFiltered(data);
    } else if (selectedValue) {
      setFiltered(filteredSelect);
    } else if (selectedValue !== "") {
      setSelectedValue("");
    }
  };

  useEffect(() => {
    handleSearchFilter();
  }, [data, searchValue]);

  useEffect(() => {
    handleSelectFilter();
  }, [selectedValue]);

  if (!isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
        <label>loading countries ...</label>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <p>{error.message} 🥲</p>
      </div>
    );
  }

  return (
    <div>
      <div className="countries-container">
        <section className="search-section">
          <div className="search">
            <i className="bi bi-search"></i>
            <input
              value={searchValue}
              onChange={handleSearchInput}
              type="text"
              placeholder="Search for a country..."
            />
          </div>
          <SelectRegion setSelectedValue={setSelectedValue} />
        </section>
        <section className="card-section">
          {filtered.length < 1 ? (
            <p>Not found country {searchValue}</p>
          ) : (
            filtered.map((i: any, index: number) => (
              <div className="card" key={index}>
                <img src={i.flags.png} alt={`${i.name.common} flag`} />
                <div style={{ padding: "0px 25px" }}>
                  <header>
                    <h1>{i.name.common}</h1>
                  </header>
                  <div className="info-box">
                    <p>Population: {i.population.toLocaleString("en-US")}</p>
                    <p>Region: {i.region}</p>
                    <p>Capital: {i.capital}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default SearchPage;
