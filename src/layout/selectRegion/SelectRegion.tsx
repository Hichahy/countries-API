import React, { useState } from "react";
import "./selectRegion.css";

const SelectRegion = () => {
  const [open, setOpen] = useState(false);
  console.log(open);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <button onClick={handleOpen}>
        Filter by Region
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
      {open ? (
        <>
          <div className="overlay" onClick={handleOpen} />
          <div className="options">
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SelectRegion;
