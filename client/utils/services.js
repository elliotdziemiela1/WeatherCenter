import axios from "axios"

const baseApi = "https://api.weather.gov"
const NWSForcastZoneIDChicago = "ILZ104"
const zoneType = "land"

export async function getUpcomingWeather(num){
  let response = await axios.get(baseApi + "/zones/" + zoneType + "/" + NWSForcastZoneIDChicago + "/forecast")
  let weather = ""
  response.data.properties.periods.forEach((forecast) => {if (forecast.number == num) weather = forecast;});
  // console.log(weather)
  return weather;
}