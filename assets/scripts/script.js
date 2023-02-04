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

   var now = dayjs();
   var nowMidnightStartUnix = dayjs(now.startOf("date")).valueOf();
   var nowMidnightEndUnix = dayjs(now.endOf("date")).valueOf();
   console.log("nowMidnight EOD:", nowMidnightEndUnix, "and that is actually:", dayjs(nowMidnightEndUnix).format("DD-MMM-YYYY HH:mm:ss"));
   var todayDateString = dayjs(now).format("DD-MMM-YYYY");
  
   // var todayDateUnix = dayjs("2023-02-04").unix();
   var todayDateUnix = dayjs(todayDateString).valueOf();
   // console.log("todayDate:", now);
   console.log("todayDateString:", todayDateString);
   console.log("todayDateUnix:", todayDateUnix, "and that is actually:", dayjs(todayDateUnix).format("DD-MMM-YYYY"));
 


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


   let res5DayArray;

   function get5DayForecast() {
   // Get the 5-day weather forecast for a location
      let queryURL5Day = "https://api.openweathermap.org/data/2.5/forecast?lat=" + locCorr.lat + "&lon=" + locCorr.lon + "&units=metric" + cntNumParam + "&appid=" + APIKey;

      $.ajax({
         url: queryURL5Day,
         method: "GET"
         }).then(function(results) {
            res5DayArray = results;
            console.log("Weather Forecast:", res5DayArray);
            prep5DayData(res5DayArray) ;
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


   function getDate(unixDate) {

      let dayString = dayjs(unixDate).format("DD-MMM-YYYY, HH:mm:ss");
      return dayString;
   }



   function prep5DayData(res5DayArray) {
      
      
      // console.log("todayDateUnix:", nowMidnightEndUnix, "or", getDate(nowMidnightEndUnix));

      // console.log("the difference is :", dayjs('2023-02-04').diff(dayjs('2023-02-05'),"day"));
         
      let day0Array = [];
      let day1Array = [];
      let day2Array = [];
      let day3Array = [];
      let day4Array = [];
      let day5Array = [];
      let dayDiff;

      console.log("res5DayArray.list.length:", res5DayArray.list.length);

      for (let i = 0; i < res5DayArray.list.length; i++) {

         let arrayDateUnix = res5DayArray.list[i].dt * 1000;

         dayDiff = dayjs(getDate(arrayDateUnix)).diff(getDate(nowMidnightStartUnix), "day");
         console.log(i, ": for", getDate(arrayDateUnix), ", the diff is:", dayDiff);

         switch(dayDiff) {
            case 1:
               // code block
               day1Array.push(res5DayArray.list[i]);
               console.log("day1Array:", day1Array);
               break;
            case 2:
               // code block
               day2Array.push(res5DayArray.list[i]);
               console.log("day2Array:", day2Array);
               break;
            case 3:
               // code block
               day3Array.push(res5DayArray.list[i]);
               console.log("day3Array:", day3Array);
               break;
            case 4:
               // code block
               day4Array.push(res5DayArray.list[i]);
               console.log("day4Array:", day4Array);
               break;
            case 5:
               // code block
               day5Array.push(res5DayArray.list[i]); 
               console.log("day5Array:", day5Array);
               break;   
            default:
               day0Array.push(res5DayArray.list[i]); 
               console.log("day0Array:", day0Array);
         };

      };

   }


//--PW temperature, precipitation, pressure, wind, humidity, and cloudiness.


   //--====================== 
   //--======================  
   //-- END of document.ready
});   