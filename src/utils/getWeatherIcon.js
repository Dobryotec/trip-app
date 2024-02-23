import cloudyIcon from "../assets/cloudy.svg";
import sunnyIcon from "../assets/sunny.svg";
import rainyIcon from "../assets/rainy.svg";
import partlyCloudyIcon from "../assets/partly-cloudy.svg";
import snowyIcon from "../assets/snowy.svg";
import windIcon from "../assets/wind.svg";

export const getWeatherIcon = (weatherCondition) => {
  switch (weatherCondition) {
    case "cloudy":
      return cloudyIcon;
    case "clear-day":
      return sunnyIcon;
    case "rain":
      return rainyIcon;
    case "partly-cloudy-day":
      return partlyCloudyIcon;
    case "wind":
      return windIcon;
    case "snow":
      return snowyIcon;
    default:
      return null;
  }
};
