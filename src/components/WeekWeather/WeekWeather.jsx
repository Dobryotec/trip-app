import { useState, useEffect } from "react";

import { getWeatherIcon } from "../../utils/getWeatherIcon";
import { fetchWeatherData } from "../../utils/fetchWetherData";
import { getDayOfWeek } from "../../utils/getDayOfWeek";

import styles from "./WeekWeather.module.css";

const WeekWeather = ({ trip }) => {
  const [dataWeather, setDataWeather] = useState([]);
  const { city, startDate, endDate } = trip;

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await fetchWeatherData(city, startDate, endDate);
      setDataWeather(weatherData);
    };
    fetchData();
  }, [city, startDate, endDate]);

  return (
    <div className={styles["wrapper-block-weather"]}>
      <h2 className={styles["title"]}>Weather forecast in {city}</h2>
      <div className={styles["block-weather"]}>
        {dataWeather.map(({ datetime, tempmax, tempmin, icon }) => (
          <div key={datetime}>
            <p>{getDayOfWeek(datetime)}</p>
            <img
              className={styles["icon-weather"]}
              src={getWeatherIcon(icon)}
              alt={icon}
            />
            <p>
              {Math.round(tempmax)}
              <sup>&deg;</sup>/{Math.round(tempmin)}
              <sup>&deg;</sup>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekWeather;
