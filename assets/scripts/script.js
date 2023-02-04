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
      // Here we are building the URL we need to query the database
      let queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + locCorr.lat + "&lon=" + locCorr.lon + "&units=metric&appid=" + APIKey;

      $.ajax({
         url: queryURL,
         method: "GET"
         }).then(function(resWeather) {
            console.log("resWeather:", resWeather);
         });
   }

   function get5DayForecast() {
      // Here we are building the URL we need to query the database
      let queryURL5Day = "https://api.openweathermap.org/data/2.5/forecast?lat=" + locCorr.lat + "&lon=" + locCorr.lon + "&units=metric&appid=" + APIKey;

      $.ajax({
         url: queryURL5Day,
         method: "GET"
         }).then(function(res5Day) {
            console.log("Weather Forecast:", res5Day);
         });
   }


   function getLocCorr(cityName) {
      $.ajax({
         url: queryUrlGetLoc,
         method: "GET"
         }).then(function(resLocation) {
            console.log("resLocation:", resLocation);
            locCorr.lat = resLocation.city.coord.lat,
            locCorr.lon = resLocation.city.coord.lon,
            console.log("resLocation:", locCorr);
            getWeather();
            get5DayForecast();
      });
   }

   getLocCorr(cityName);





   //--====================== 
   //--======================  
   //-- END of document.ready
});   