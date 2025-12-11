import axios from "axios"

const baseApi = "https://api.weather.gov"

// returns an array of objects representing the upcoming 12 hour forecasts in the range of first to last (inclusive).
export async function getUpcomingWeather(zoneID, zoneType, first, last){
  let response = await axios.get(baseApi + "/zones/" + zoneType + "/" + zoneID + "/forecast")
  let forecasts = []
  response.data.properties.periods.forEach((forecast) => {
    if (forecast.number >= first && forecast.number <= last){
      forecasts[forecast.number - 1] = forecast;
    }
  });
  // console.log(`Forecasts: ${forecasts}`)
  return forecasts;
}

// returns an array of objects representing the upcoming hourly forecasts in the range of first to last (inclusive)
export async function getHourlyForecast(latitude, longitude, first, last){
  const pointsResponse = await axios.get(baseApi + "/points/" + latitude + "," + longitude);
  const hourlyURL = pointsResponse.data.forecastHourly;
  const response = await axios.get(hourlyURL);
  let hourlyForecasts = [];
  
  response.data.properties.periods.forEach((period) => {
    if (period.number >= first && period.number <= last){
      hourlyForecasts[period.number - 1] = period;
    }
  })

  return hourlyForecasts;
}

export async function getWeekForecast(latitude, longitude, first, last){
  const pointsResponse = await axios.get(baseApi + "/points/" + latitude + "," + longitude);
  const forecastURL = pointsResponse.data.properties.forecast;
  const response = await axios.get(forecastURL);
  let twelveHourForecasts = [];
  
  response.data.properties.periods.forEach((period) => {
    if (period.number >= first && period.number <= last){
      twelveHourForecasts[period.number - 1] = period;
    }
  })

  return twelveHourForecasts;
}