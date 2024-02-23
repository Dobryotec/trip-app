import { useState, useRef } from "react";
import { MdClose } from "react-icons/md";
import { calculateMaxEndDate } from "../../utils/calculateMaxEndDate";

import data from "../../data/cities.json";

import styles from "./ModalForm.module.css";

const ModalForm = ({ onSubmit, setIsOpen, isOpen }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const startInputRef = useRef();
  const endInputRef = useRef();

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "startDate":
        setStartDate(value);
        break;
      case "endDate":
        setEndDate(value);
        break;
      case "city":
        setCity(value);
        setSelectedId(data.find(({ city }) => city === value).id);
        break;
    }
  };

  const submitData = (e) => {
    e.preventDefault();
    if (city && startDate && endDate) {
      const newTrip = {
        id: selectedId,
        city,
        startDate,
        endDate,
      };
      onSubmit(newTrip);
    }
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 14);

  const year = calculateMaxEndDate(startDate).getFullYear();
  const month = (calculateMaxEndDate(startDate).getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const day = calculateMaxEndDate(startDate)
    .getDate()
    .toString()
    .padStart(2, "0");

  const formattedMaxDate = `${year}-${month}-${day}`;

  return (
    <div className={styles["overlay"]}>
      <form className={styles["form"]} onSubmit={submitData}>
        <div className={styles["form-header"]}>
          <h2 className={styles["title"]}>Create trip</h2>
          <MdClose
            className={styles["icon-close"]}
            onClick={() => setIsOpen(!isOpen)}
            alt="icon close"
          />
        </div>

        <div className={styles["form-elements"]}>
          <div className={styles["wrapper-form-element"]}>
            <label className={styles["form-element-label"]}>
              <span className={styles["star"]}>&#42;</span>City
            </label>
            <div className={styles["select-container"]}>
              <select name="city" value={city} onChange={handleChange}>
                <option value="" disabled hidden>
                  Please select a city
                </option>
                {data.map(({ city, id }) => (
                  <option value={city} key={id}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles["wrapper-form-element"]}>
            <label className={styles["form-element-label"]}>
              <span className={styles["star"]}>&#42;</span>Start date
            </label>
            <input
              type="text"
              ref={startInputRef}
              className={styles["input"]}
              name="startDate"
              placeholder="Select start date"
              onFocus={() => (startInputRef.current.type = "date")}
              onBlur={() => (startInputRef.current.type = "date")}
              value={startDate}
              onChange={handleChange}
              min={today.toISOString().split("T")[0]}
              max={maxDate.toISOString().split("T")[0]}
            />
          </div>
          <div className={styles["wrapper-form-element"]}>
            <label className={styles["form-element-label"]}>
              <span className={styles["star"]}>&#42;</span>End date
            </label>
            <input
              type="text"
              ref={endInputRef}
              name="endDate"
              className={styles["input"]}
              placeholder="Select end date"
              onFocus={() => (endInputRef.current.type = "date")}
              onBlur={() => (endInputRef.current.type = "date")}
              value={endDate}
              onChange={handleChange}
              min={startDate}
              max={formattedMaxDate}
            />
          </div>
        </div>
        <div className={styles["block-buttons"]}>
          <button
            className={`${styles["button"]} ${styles["button-cancel"]}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            Cancel
          </button>
          <button
            className={`${styles["button"]} ${styles["button-save"]}`}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalForm;
