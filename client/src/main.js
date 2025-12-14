import { switchLocations, getWeekForecastFromZones, getWeekForecast, getHourlyForecast } from "../utils/services";

const zoneIDChicago = "ILZ104"
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDate = new Date;
const currentDayOfWeekIdx = currentDate.getUTCDay();
const ChicagoLatitude = 41.8832;
const ChicagoLongitude = -87.6324;

async function setWeeklyForecasts(){
  // fetch the forecasts for the next 7 days
  const twelveHourForecasts = await getWeekForecastFromZones("land", 1, 14);
  // const twelveHourForecasts = await getWeekForecast(1, 14);
  console.log(twelveHourForecasts)

  const forecastNameElmt = document.querySelector("#next-forecast-name");
  const forecastBodyElmt = document.querySelector("#next-forecast-body");
    
  forecastNameElmt.innerHTML = twelveHourForecasts[0].name;
  forecastBodyElmt.innerHTML = twelveHourForecasts[0].detailedForecast;
  
  // due to the lack of strict formatting for the NWS api, the current day can have either two forecasts (today, tonight)
  // or one forecast (tonight) in the twelveHourForecasts array. If it's only 1 forecast, we will set an offset of -1 to use when 
  // iterating through the forecasts for the days proceeding the current day to accurately map the forecasts to the days.
  let forecastOffset = 0;
  if (twelveHourForecasts[1].name == daysOfWeek[(currentDayOfWeekIdx+1) % 7]) // if the second forecast is for tomorrow
    forecastOffset = -1;
      
  console.log(forecastOffset);

  // if api gives only a night forecast for today
  if (forecastOffset == -1){
    document.querySelector("#day-1 .night-forecast h4").innerHTML = twelveHourForecasts[0].name;
    document.querySelector("#day-1 .night-forecast p").innerHTML = twelveHourForecasts[0].detailedForecast;
    document.querySelector("#day-1 .day-title").innerHTML = daysOfWeek[currentDayOfWeekIdx];
  } else { // else api gives a morning and a night forecast for today
    document.querySelector("#day-1 .morning-forecast h4").innerHTML = twelveHourForecasts[0].name;
    document.querySelector("#day-1 .morning-forecast p").innerHTML = twelveHourForecasts[0].detailedForecast;
    document.querySelector("#day-1 .night-forecast h4").innerHTML = twelveHourForecasts[1].name;
    document.querySelector("#day-1 .night-forecast p").innerHTML = twelveHourForecasts[1].detailedForecast;
    document.querySelector("#day-1 .day-title").innerHTML = daysOfWeek[currentDayOfWeekIdx];

  }

  // forecastOffset is either 0 or -1
  // now fill in the rest of the days for the next week
  for (let i = 1; i < 7; i++){
    document.querySelector(`#day-${i+1} .day-title`).innerHTML = daysOfWeek[(currentDayOfWeekIdx+i) % 7]; // set day of week name

    // set morning forecast
    document.querySelector(`#day-${i+1} .morning-forecast h4`).innerHTML = twelveHourForecasts[(i*2) + forecastOffset].name;
    document.querySelector(`#day-${i+1} .morning-forecast p`).innerHTML = twelveHourForecasts[(i*2) + forecastOffset].detailedForecast;

    // set night forecast
    if (twelveHourForecasts[(i*2) + forecastOffset + 1]){
      document.querySelector(`#day-${i+1} .night-forecast h4`).innerHTML = twelveHourForecasts[(i*2) + forecastOffset + 1].name;
      document.querySelector(`#day-${i+1} .night-forecast p`).innerHTML = twelveHourForecasts[(i*2) + forecastOffset + 1].detailedForecast;
    }
  }
}

async function setHourlyForecasts(){
  let hourlyForecasts = await getHourlyForecast(1,24);
  console.log("Hourly forecasts: ");
  console.log(hourlyForecasts);
  let hourlyContainer = document.querySelector("#hourly-forecasts");
  for (let i = 0; i < hourlyForecasts.length; i++){
    // Time attribute example: "2025-12-13T16:00:00-06:00"
    let hourTime = hourlyForecasts[i].startTime.split("T")[1].split(":")[0];  
    // Convert military time to normal time  
    if (hourTime == 0){
      hourTime = "12AM"
    } else if (hourTime == 12){
      hourTime = "12PM"
    } else if (hourTime > 12){
      hourTime = (hourTime - 12) + "PM"
    } else {
      hourTime = hourTime + "AM"
    }

    // Create HTML elements
    let hourElm = document.createElement("div");
    hourElm.style.textAlign = "center";
    hourElm.style.border = "solid";
    hourElm.style.margin = "1px";
    let hourTimeElm = document.createElement("h3");
    let hourForecastElm = document.createElement("p");

    hourTimeElm.innerHTML = hourTime;
    hourForecastElm.innerHTML = hourlyForecasts[i].temperature + " degrees, " + hourlyForecasts[i].shortForecast;

    hourElm.appendChild(hourTimeElm);
    hourElm.appendChild(hourForecastElm);
    hourlyContainer.appendChild(hourElm);
  }
}

async function main() {
  await switchLocations(ChicagoLatitude, ChicagoLongitude);
  
  setWeeklyForecasts();

  setHourlyForecasts();

}

main();