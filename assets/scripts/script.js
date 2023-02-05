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


   let day0Array = [];
   let day1Array = [];
   let day2Array = [];
   let day3Array = [];
   let day4Array = [];
   let day5Array = [];
   let dayDiff;


   let temp;
   var tempMax;
   var tempMin;
   var humidity;
   var humidMax;
   var humidMin
   let wind;
   var windMax;
   var windMin;

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
            getPeriodMaxMin(day1Array);
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






   function getPeriodMaxMin(period_array) {

      for (let i = 0; i < period_array.length; i++) {

         temp = period_array[i].main.temp;
         humidity = period_array[i].main.humidity;
         wind = period_array[i].wind.speed;

         if (i === 0) {
            tempMax = temp;
            tempMin = temp;
            humidMax = humidity;
            humidMin = humidity;
            windMax = wind;
            windMin = wind;
            console.log("im in zero!");
         };

         // console.log("temp/humidity/wind:", temp, "/", humidity, "/", wind);
         console.log("====================================");
         console.log("temp/humidity/wind for index:", i, "is", temp, "/", humidity, "/", wind);
   
         // get max min temp
         // console.log("Go check max/min - temp/tempMax/tempMin:", temp, "/", tempMax, "/", tempMin);         

         if (temp > tempMax) {
            tempMax = temp;
            // console.log("Im in max!: ", temp, "/", tempMax, "/", tempMin);
         } else if (temp < tempMin) {
            tempMin = temp;
            // console.log("Im in min!: ", temp, "/", tempMax, "/", tempMin);
         };

         // console.log("Now completed getPeriodMaxMin - temp/tempMax/tempMin:", temp, "/", tempMax, "/", tempMin);

         if (humidity > humidMax) {
            humidMax = humidity;
            // console.log("Im in max!: ", humidity, "/", humidMax, "/", humidMin);
         } else if (humidity < humidMin) {
            humidMin = humidity;
            // console.log("Im in min!: ", humidity, "/", humidMax, "/", humidMin);
         };

         if (wind > windMax) {
            windMax = wind;
            // console.log("Im in max!: ", wind, "/", windMax, "/", windMin);
         } else if (wind < windMin) {
            windMin = wind;
            // console.log("Im in min!: ", wind, "/", windMax, "/", windMin);
         }



      };

      console.log("Final max/min");
      console.log("**************************");
      console.log("temp:", tempMax, "/", tempMin);
      console.log("humidity:", humidMax, "/", humidMin);
      console.log("wind:", windMax, "/", windMin);


   } // end of function getPeriodMaxMin()


//--PW temperature, precipitation, pressure, wind, humidity, and cloudiness.


   //--====================== 
   //--======================  
   //-- END of document.ready
});   