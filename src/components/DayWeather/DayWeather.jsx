import { useState, useEffect } from "react";

import { getDayOfWeek } from "../../utils/getDayOfWeek";
import { getTimeLeft } from "../../utils/getTimeLeft";
import { calculateTimeDifference } from "../../utils/calculateTimeDifference";
import { fetchWeatherDayData } from "../../utils/fetchWeatherDayData";
import { getWeatherIcon } from "../../utils/getWeatherIcon";

import styles from "./DayWeather.module.css";

const DayWeather = ({ trip }) => {
  const [dataDayWeather, setDataDayWeather] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const { city, startDate } = trip;

  const fetchData = async () => {
    const weatherData = await fetchWeatherDayData(city);
    if (weatherData) {
      setDataDayWeather(weatherData);
    }
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      setTimeLeft(calculateTimeDifference(startDate));
    };

    calculateTimeLeft();

    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  useEffect(() => {
    fetchData();
  }, [city, fetchData]);

  const { days, hours, minutes, seconds } = getTimeLeft(timeLeft);

  const dayOfWeek = getDayOfWeek(dataDayWeather.datetime);

  return (
    <aside className={styles["side-bar"]}>
      <h2 className={styles["day"]}>{dayOfWeek}</h2>
      <div className={styles["wrapper-image"]}>
        {" "}
        <img
          className={styles["icon"]}
          src={getWeatherIcon(dataDayWeather.icon)}
          alt={dataDayWeather.icon}
        />
        <p className={styles["text"]}>
          {Math.round(dataDayWeather.temp)}
          <span className={styles["degrees"]}>&deg;С</span>
        </p>
      </div>
      <p className={styles["city"]}>{city}</p>
      {!days && !hours && !minutes && !seconds ? (
        <p className={styles["congratulations"]}>
          Congratulations! <br /> Your trip has begun
        </p>
      ) : (
        <div className={styles["time"]}>
          <p>
            {days} <br /> <span>days</span>
          </p>
          <p>
            {hours} <br /> <span>hours</span>
          </p>
          <p>
            {minutes} <br /> <span>minutes</span>
          </p>
          <p>
            {seconds} <br /> <span>seconds</span>
          </p>
        </div>
      )}
    </aside>
  );
};

export default DayWeather;
