import axios from "axios"

const baseApi = "https://api.weather.gov"
const NWSForcastZoneIDChicago = "ILZ104"
const zoneType = "land"

export async function getUpcomingWeather(){
  let response = await axios.get(baseApi + "/zones/" + zoneType + "/" + NWSForcastZoneIDChicago + "/forecast")
  let weather = ""
  response.data.properties.periods.forEach((forecast) => {if (forecast.number == 1) weather = forecast;});
  // console.log(weather)
  return weather;
}