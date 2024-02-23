import { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";

import styles from "./Filter.module.css";

const Filter = ({ trips, setFilteredTrips }) => {
  const [cityName, setCityName] = useState("");

  const handleChange = ({ target: { value } }) => {
    setCityName(value.trim());
    const searchTrip = cityName.toLowerCase();

    const filteredTrips = trips.filter(({ city }) =>
      city.toLowerCase().includes(searchTrip)
    );

    setFilteredTrips(filteredTrips);
  };

  useEffect(() => {
    if (!cityName) {
      setFilteredTrips([]);
    }
  }, [cityName, setFilteredTrips]);

  return (
    <div className={styles["wrapper-input"]}>
      <input
        className={styles["input"]}
        type="text"
        placeholder="Search your trip"
        value={cityName}
        onChange={handleChange}
      />
      <LuSearch className={styles["icon-search"]} />
    </div>
  );
};

export default Filter;
