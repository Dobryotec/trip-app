export const fetchWeatherData = async (city, startDate, endDate) => {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=ZQ3T8ZRFKDNMM3NTGSEH4XBJT&contentType=json`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.days;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        return [];
      }
};
