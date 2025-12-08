import { getUpcomingWeather } from "../utils/services";

async function main() {
  const nextForecast = await getUpcomingWeather(1);
  const forecastNameElmt = document.querySelector(".nextForecastName");
  const forecastBodyElmt = document.querySelector(".nextForecastBody");

  console.log(nextForecast);

  forecastNameElmt.innerHTML = nextForecast.name;
  forecastBodyElmt.innerHTML = nextForecast.detailedForecast;

  for (let i = 1; i <= 7; i++){
    
  }
}

main();