import { getUpcomingWeather } from "../utils/services";

async function main() {
  const nextForecast = await getUpcomingWeather();
  const forecastNameElmt = document.querySelector(".nextForecastName");
  const forecastBodyElmt = document.querySelector(".nextForecastBody");

  forecastNameElmt.innerHTML = nextForecast.name;
  forecastBodyElmt.innerHTML = nextForecast.detailedForecast;
}

main();