import { getUpcomingWeather } from "../utils/services";

const zoneIDChicago = "ILZ104"
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDate = new Date;
const currentDayOfWeekIdx = currentDate.getUTCDay();


async function main() {
  // fetch the forecasts for the next 7 days
  const nextForecasts = await getUpcomingWeather(zoneIDChicago, "land", 1, 14);
  const forecastNameElmt = document.querySelector("#next-forecast-name");
  const forecastBodyElmt = document.querySelector("#next-forecast-body");
  
  console.log(nextForecasts);
  
  forecastNameElmt.innerHTML = nextForecasts[0].name;
  forecastBodyElmt.innerHTML = nextForecasts[0].detailedForecast;
  
  // due to the lack of strict formatting for the NWS api, the current day can have either two forecasts (today, tonight)
  // or one forecast (tonight) in the nextForecasts array. If it's only 1 forecast, we will set an offset of -1 to use when 
  // iterating through the forecasts for the days proceeding the current day to accurately map the forecasts to the days.
  let forecastOffset = 0;
  if (nextForecasts[1].name == daysOfWeek[(currentDayOfWeekIdx+1) % 7]) // if the second forecast is for tomorrow
    forecastOffset = -1;
      

  // if api gives only a night forecast for today
  if (forecastOffset == -1){
    document.querySelector("#day-1 .night-forecast h4").innerHTML = nextForecasts[0].name;
    document.querySelector("#day-1 .night-forecast p").innerHTML = nextForecasts[0].detailedForecast;
    document.querySelector("#day-1 .day-title").innerHTML = daysOfWeek[currentDayOfWeekIdx];
  } else { // else api gives a morning and a night forecast for today
    document.querySelector("#day-1 .morning-forecast h4").innerHTML = nextForecasts[0].name;
    document.querySelector("#day-1 .morning-forecast p").innerHTML = nextForecasts[0].detailedForecast;
    document.querySelector("#day-1 .night-forecast h4").innerHTML = nextForecasts[1].name;
    document.querySelector("#day-1 .night-forecast p").innerHTML = nextForecasts[1].detailedForecast;
    document.querySelector("#day-1 .day-title").innerHTML = daysOfWeek[currentDayOfWeekIdx];

  }

  // forecastOffset is either 0 or -1
  // now fill in the rest of the days for the next week
  for (let i = 1; i < 7; i++){
    document.querySelector(`#day-${i+1} .morning-forecast h4`).innerHTML = nextForecasts[(i*2) + forecastOffset].name;
    document.querySelector(`#day-${i+1} .morning-forecast p`).innerHTML = nextForecasts[(i*2) + forecastOffset].detailedForecast;
    document.querySelector(`#day-${i+1} .night-forecast h4`).innerHTML = nextForecasts[(i*2) + forecastOffset + 1].name;
    document.querySelector(`#day-${i+1} .night-forecast p`).innerHTML = nextForecasts[(i*2) + forecastOffset + 1].detailedForecast;
    document.querySelector(`#day-${i+1} .day-title`).innerHTML = daysOfWeek[(currentDayOfWeekIdx+i) % 7];
  }


}

main();