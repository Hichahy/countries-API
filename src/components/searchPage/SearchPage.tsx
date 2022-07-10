import SelectRegion from "../../layout/selectRegion/SelectRegion";
import "./searchPage.css";

interface IProps {
  data: any;
  isLoading: any;
  error: any;
}

const SearchPage = ({ data, isLoading, error }: IProps) => {
  console.log(data);

  if (isLoading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
        <label>loading countries ...</label>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Code: ${error.status}</p>
        <p>Message: ${error.statusText}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="countries-container">
        <section className="search-section">
          <div className="search">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search for a country..." />
          </div>
          <SelectRegion />
        </section>
        <section className="card-section">
          {data.map((i: any, index: number) => (
            <div className="card" key={index}>
              <img src={i.flags.png} alt={`${i.name.common} flag`} />
              <div style={{ padding: "0px 25px" }}>
                <header>
                  <h1>{i.name.common}</h1>
                </header>
                <div className="info-box">
                  <p>population: {i.population}</p>
                  <p>region: {i.region}</p>
                  <p>capital: {i.capital}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default SearchPage;
