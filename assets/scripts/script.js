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

   var todayDate = new Date();
   var todayDateString = dayjs(todayDate).format("DD-MMM-YYYY");

   var todayDateUnix = Date.parse(todayDateString);
   console.log("todayDate:", todayDate);
   console.log("todayDateString:", todayDateString);
   console.log("todayDateUnix:", todayDateUnix);


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
         // need to catch the error here!!!!
         return;
      });
   }

   getLocCorr(cityName);

   console.log("compare date unix 1675663600 day is:", dayjs(1675663600 * 1000).format("DD-MMM-YYYY, HH:MM"));
   console.log("today unix 1680390000 day is:", dayjs(1675468800000).format("DD-MMM-YYYY, HH:MM"));
   

   let test = dayjs(1675519348000).isBefore(dayjs(1675663600 * 1000)) ;

   console.log("test:", test, "bec", dayjs(1675519348000).format("DD-MMM-YYYY"), " is before", dayjs(1675663600 * 1000).format("DD-MMM-YYYY"));

   function getDate(unixdate) {

      let dayString = dayjs.unix(unixdate).format("DD-MMM-YYYY, HH:MM");
      return dayString;
   }

   function prep5DayData(resLocation) {
      
      let dayCounter = 0;
      let createArrayString ="let day" + dayCounter +";";
      let createArray;


      for (let i = 0; i < resLocation.length; i++) {
         
         // if ( === ) {


         // } 
         dayCounter++;
         createArray = eval(createArrayString);

      };
      
   }


//--PW temperature, precipitation, pressure, wind, humidity, and cloudiness.


   //--====================== 
   //--======================  
   //-- END of document.ready
});   