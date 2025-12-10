import { getUpcomingWeather } from "../utils/services";

const zoneIDChicago = "ILZ104"
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDate = new Date;
const currentDayOfWeek = currentDate.getUTCDay();


async function main() {
  // fetch the forecasts for the next 7 days
  const nextForecasts = await getUpcomingWeather(zoneIDChicago, "land", 1, 14);
  const forecastNameElmt = document.querySelector("#next-forecast-name");
  const forecastBodyElmt = document.querySelector("#next-forecast-body");
  
  console.log(nextForecasts);
  
  forecastNameElmt.innerHTML = nextForecasts[0].name;
  forecastBodyElmt.innerHTML = nextForecasts[0].detailedForecast;
  
  // get the date for tomorrow
  let tomorrowDate = currentDate;
  tomorrowDate.setDate(tomorrowDate.setDate(tomorrowDate.getDate()+1))
  
  // due to the lack of strict formatting for the NWS api, we must determine at what index in
  // the nextForcasts that tomorrow's forecasts start, since we don't know if either 1 entry or 2 entries
  // belong to the current day.
  let tomorrowIdx = 1;
  for (tomorrowIdx = 1; tomorrowIdx <= 2; tomorrowIdx++){
    if (nextForecasts[tomorrowIdx].name == tomorrowDate.getDay())
      break;
  }

  // if api gives only a night forecast for today
  if (tomorrowIdx == 1){
    document.querySelector("#day-1 .night-forecast h4").innerHTML = nextForecasts[0].name;
    document.querySelector("#day-1 .night-forecast p").innerHTML = nextForecasts[0].detailedForecast;
  } else { // else api gives a morning and a night forecast for today
    document.querySelector("#day-1 .morning-forecast h4").innerHTML = nextForecasts[0].name;
    document.querySelector("#day-1 .morning-forecast p").innerHTML = nextForecasts[0].detailedForecast;
    document.querySelector("#day-1 .night-forecast h4").innerHTML = nextForecasts[1].name;
    document.querySelector("#day-1 .night-forecast p").innerHTML = nextForecasts[1].detailedForecast;
  }

  // now fill in the rest of the days for the next week
  
}

main();