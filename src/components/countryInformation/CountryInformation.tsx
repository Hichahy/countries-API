import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import "./countryInformation.css";

const CountryInformation = () => {
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
          console.log(error);
        }
      );
  }, []);

  const { cca2 } = useParams();
  const find = () => {
    return data.find((x: any) => x.cca2 === cca2);
  };
  const country: any = find()!;

  if (!isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
        <label>loading countries ...</label>
      </div>
    );
  }

  const currencies: any = Object.values(country.currencies)[0];
  const languages: any = Object.values(country.languages);
  const nativeName: any = Object.values(country.name.nativeName)[0];

  return (
    <div className="country-container">
      <NavLink to="/">
        <button className="back-btn">
          <i className="bi bi-arrow-left"></i>
          Back
        </button>
      </NavLink>
      <div className="inf-container">
        <div className="inf-img-box">
          <img
            className="inf-img"
            src={country.flags.png}
            alt={`${country.name.common} flag`}
          />
        </div>
        <div className="inf-box">
          <h1 style={{ margin: "40px 0" }}>{country.name.common}</h1>
          <div className="secion-box-first">
            <section className="first-inf-sec">
              <p>
                <label>Native Name:</label> {nativeName.common}
              </p>
              <p>
                <label>Population:</label>{" "}
                {country.population.toLocaleString("en-US")}
              </p>
              <p>
                <label>Region:</label> {country.region}
              </p>
              <p>
                <label>Sub Region:</label> {country.subregion}
              </p>
              <p>
                <label>Capital:</label> {country.capital}
              </p>
            </section>

            <section>
              <p>
                <label>Top Level Domain:</label> {country.tld[0]}
              </p>
              <p>
                <label>Currencies:</label> {currencies.name}
              </p>
              <p>
                <label>Langues: </label> {languages.join(", ")}
              </p>
            </section>
          </div>

          <section className="border">
            <label>Border Countries:</label>
            <div className="borders-box">
              {country.borders ? (
                country.borders.map((i: any, index: number) => (
                  <div key={index} className="borders">
                    {i}
                  </div>
                ))
              ) : (
                <p>No Border</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CountryInformation;
