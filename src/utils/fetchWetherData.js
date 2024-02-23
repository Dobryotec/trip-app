export const fetchWeatherData = async (city, startDate, endDate) => {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=PGSEM7NAYNKWDHUMQMMHQ6KLF&contentType=json`
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
