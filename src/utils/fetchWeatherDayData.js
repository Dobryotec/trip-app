export const fetchWeatherDayData = async (city) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=PGSEM7NAYNKWDHUMQMMHQ6KLF&contentType=json`
    );
    const data = await response.json();
    return data.days[0];
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
