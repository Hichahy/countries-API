import React, { useState } from "react";
import "./selectRegion.css";

const SelectRegion = ({
  setSelectedValue,
  selectedValue,
  filteredSelect,
}: any) => {
  const [open, setOpen] = useState(false);
  const [options] = useState([
    {
      value: "Africa",
      name: "Africa",
    },
    {
      value: "America",
      name: "America",
    },
    {
      value: "Asia",
      name: "Asia",
    },
    {
      value: "Europe",
      name: "Europe",
    },
    {
      value: "Oceania",
      name: "Oceania",
    },
    {
      value: "",
      name: "All",
    },
  ]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleSelectOption = (e: any) => {
    setSelectedValue(e.target.value);
    filteredSelect(e.target.value);
    handleOpen();
  };

  return (
    <div>
      <button onClick={handleOpen}>
        {`${!selectedValue ? "Filter by Region" : selectedValue}`}
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
            {options.map((i, index) => (
              <option onClick={handleSelectOption} key={index} value={i.value}>
                {i.name}
              </option>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SelectRegion;
