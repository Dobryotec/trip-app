import { FiPlus } from "react-icons/fi";

import TripItem from "../TripItem/TripItem";

import styles from "./TripList.module.css";

const TripList = ({
  tripArray,
  setIsOpen,
  isOpen,
  activeTrip,
  setActiveTrip,
}) => {
  const toggleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles["container-list"]}>
        <div className={styles["wrapper-list"]}>
          <ul className={styles["trip-list"]}>
            {tripArray.map(({ id, city, startDate, endDate }) => (
              <TripItem
                city={city}
                key={id}
                id={id}
                startDate={startDate}
                endDate={endDate}
                isActive={activeTrip === id}
                tripArray={tripArray}
                activeTrip={activeTrip}
                setActiveTrip={setActiveTrip}
              />
            ))}
          </ul>
          <div className={styles["card-add"]} onClick={toggleOpenModal}>
            <FiPlus className={styles["icon-plus"]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TripList;
