import React, { useState, useEffect } from "react";
import SelectRegion from "../../layout/selectRegion/SelectRegion";
import { NavLink } from "react-router-dom";
import "./searchPage.css";

interface IProps {
  data: never[];
  isLoading: boolean;
  error: Error | null;
  setFiltered: React.Dispatch<React.SetStateAction<never[]>>;
  filtered: never[];
}

const SearchPage = ({
  data,
  isLoading,
  error,
  setFiltered,
  filtered,
}: IProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleSearchInput = (e: any) => {
    setSearchValue(e.target.value.toLowerCase());
    setFiltered(
      data.filter((i: any) =>
        i.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (isLoading)
      return () => {
        setFiltered(data);
      };
  }, [data, isLoading, setFiltered]);

  const filteredSelect = (value: string) =>
    setFiltered(data.filter((i: any) => i.region.indexOf(value) >= 0));

  if (!isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
        <label>loading countries ...</label>
      </div>
    );
  } else if (error) {
    return (
      <div className="error">
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
          <SelectRegion
            filteredSelect={filteredSelect}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        </section>
        <section className="card-section">
          {filtered.length < 1 ? (
            <p className="found-error">Not found country {searchValue}</p>
          ) : (
            filtered.map((i: any) => (
              <div className="card" key={i.cca2}>
                <NavLink to={`/country/${i.cca2}`}>
                  <img src={i.flags.png} alt={`${i.name.common} flag`} />
                </NavLink>
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
