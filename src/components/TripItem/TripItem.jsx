import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { formatDate } from "../../utils/formatDate";
import data from "../../data/cities.json";

import styles from "./TripItem.module.css";

const TripItem = ({
  city,
  id,
  startDate,
  endDate,
  isActive,
  tripArray,
  activeTrip,
  setActiveTrip,
}) => {
  const goToPrevSlide = () => {
    const currentIndex = tripArray.findIndex((trip) => trip.id === activeTrip);
    if (currentIndex > 0) {
      const prevTripId = tripArray[currentIndex - 1].id;
      setActiveTrip(prevTripId);
    }
  };

  const goToNextSlide = () => {
    const currentIndex = tripArray.findIndex((trip) => trip.id === activeTrip);
    if (currentIndex < tripArray.length - 1) {
      const prevTripId = tripArray[currentIndex + 1].id;
      setActiveTrip(prevTripId);
    }
  };

  const trip = data.find((item) => item.id === id);

  return (
      <li className={`${styles["trip-item"]} ${isActive ? styles.active : ""}`}>
        <div
          className={styles["trip-item-content"]}
          onClick={() => setActiveTrip(id)}
        >
          <div className={styles["wrapper-image"]}>
            <img src={trip.image} className={styles["image"]} />
          </div>

          <h2>{city}</h2>
          <p>
            {formatDate(startDate)}-{formatDate(endDate)}
          </p>
        </div>

        <div className={styles["controls"]}>
          <FiChevronLeft onClick={goToPrevSlide} />
          <FiChevronRight onClick={goToNextSlide} />
        </div>
      </li>
  );
};

export default TripItem;
