export const fetchWeatherDayData = async (city) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=ZQ3T8ZRFKDNMM3NTGSEH4XBJT&contentType=json`
    );
    const data = await response.json();
    return data.days[0];
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
