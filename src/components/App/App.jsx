import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import ModalForm from "../Modal/ModalForm";
import TripList from "../TripList/TripList";
import WeekWeather from "../WeekWeather/WeekWeather";
import DayWeather from "../DayWeather/DayWeather";
import Filter from "../Filter/Filter";

import styles from "./App.module.css";

const App = () => {
  const [tripArray, setTripArray] = useState([
    { id: 1, city: "London", startDate: "2024-02-29", endDate: "2024-03-05" },
  ]);

  const [filteredTrips, setFilteredTrips] = useState([]);

  const [activeTrip, setActiveTrip] = useState(1);

  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState("");

  const sortedTrips = tripArray.toSorted(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  const trip = sortedTrips.find(({ id }) => id === activeTrip);

  useEffect(() => {
    const savedTripArray = localStorage.getItem("tripArray");
    if (savedTripArray) {
      setTripArray(JSON.parse(savedTripArray));
    }

    const savedActiveTrip = localStorage.getItem("activeTrip");
    if (savedActiveTrip) {
      setActiveTrip(parseInt(savedActiveTrip));
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tripArray", JSON.stringify(tripArray));
  }, [tripArray]);

  useEffect(() => {
    localStorage.setItem("activeTrip", activeTrip);
  }, [activeTrip]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const handleSubmit = (newTrip) => {
    setTripArray((prevTrips) => [...prevTrips, newTrip]);
    setIsOpen(!isOpen);
    setActiveTrip(newTrip.id);
  };

  const handleTripClick = (id) => {
    setActiveTrip(id);
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  const handleSignOut = () => {
    setUser("");
    localStorage.removeItem("user");
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setUser(tokenResponse),
  });

  return (
    <>
      <header></header>
      <main>
        {isOpen && (
          <ModalForm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onSubmit={handleSubmit}
          />
        )}
        {!user && (
          <div className={styles["congratulations"]}>
            {" "}
            <h1 className={styles["title"]}>Welcome to my application!!!</h1>
            <button className={styles["button"]} onClick={() => login()}>
              Sign in with Google 🚀
            </button>
          </div>
        )}
        {user && (
          <>
            <div className={styles["wrapper-main-content"]}>
              <div className={styles["container-main-content"]}>
                <div className={styles["main-header-block"]}>
                  {user && (
                    <button
                      className={styles["button"]}
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  )}
                  <Filter
                    trips={sortedTrips}
                    setFilteredTrips={setFilteredTrips}
                  />
                </div>

                <TripList
                  tripArray={
                    filteredTrips.length > 0 ? filteredTrips : sortedTrips
                  }
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                  handleTripClick={handleTripClick}
                  activeTrip={activeTrip}
                  setActiveTrip={setActiveTrip}
                />
              </div>

              <DayWeather trip={trip} />
            </div>

            <WeekWeather trip={trip} />
          </>
        )}
      </main>
      <footer></footer>
    </>
  );
};

export default App;
