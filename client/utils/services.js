import axios from "axios"

const baseApi = "https://api.weather.gov"

// returns an array of objects representing the upcoming forecasts in the range of first to last (inclusive).
export async function getUpcomingWeather(zoneID, zoneType, first, last){
  let response = await axios.get(baseApi + "/zones/" + zoneType + "/" + zoneID + "/forecast")
  let forecasts = []
  response.data.properties.periods.forEach((forecast) => {
    if (forecast.number >= first && forecast.number <= last) 
      forecasts[forecast.number - 1] = forecast;
  });
  // console.log(`Forecasts: ${forecasts}`)
  return forecasts;
}