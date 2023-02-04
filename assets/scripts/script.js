//-- Whole-script strict mode syntax
"use strict";

//-- JQuery wrapper
$(document).ready(function() {
   //-- START of document.ready
   //--====================== 
   //--====================== 
   var APIKey = "23c1d2729442f28b96176ff1560c919f";

   let cityName = "london";
   let queryUrlGetLoc = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

   let locCorr = {
      lat : "",
      lon : "",
   };

   function getWeather() {
      // Get the current weather data for a location
      let queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + locCorr.lat + "&lon=" + locCorr.lon + "&units=metric&appid=" + APIKey;

      $.ajax({
         url: queryURL,
         method: "GET"
         }).then(function(resWeather) {
            console.log("resWeather:", resWeather);
         });
   }

   // let isUseCnt = true;
   let isUseCnt = false;
   let cntNum =5;
   let cntNumParam;

   if (isUseCnt) {
      cntNumParam ="&cnt=" + cntNum;
   } else {

      cntNumParam ="";
   };




   function get5DayForecast() {
   // Get the 5-day weather forecast for a location
      let queryURL5Day = "https://api.openweathermap.org/data/2.5/forecast?lat=" + locCorr.lat + "&lon=" + locCorr.lon + "&units=metric" + cntNumParam + "&appid=" + APIKey;

      $.ajax({
         url: queryURL5Day,
         method: "GET"
         }).then(function(res5Day) {
            console.log("Weather Forecast:", res5Day);
         });
   }


   function getLocCorr(cityName) {
      //get the coordinates of city based on user input.
      $.ajax({
         url: queryUrlGetLoc,
         method: "GET"
         }).then(function(resLocation) {
            console.log("resLocation:", resLocation);
            locCorr.lat = resLocation.city.coord.lat,
            locCorr.lon = resLocation.city.coord.lon,
            console.log("resLocation:", locCorr);
            // User input validation before getting weather data

            getWeather();
            get5DayForecast();
      }).fail(function(e) {
         console.log("error is:", e)
         console.log("response:", e.responseJSON);
         return;

      });
   }

   getLocCorr(cityName);

   console.log("day is:", dayjs.unix(1675522800).format("DD-MMM-YYYY, HH:MM"));





   //--====================== 
   //--======================  
   //-- END of document.ready
});   