//-- Whole-script strict mode syntax
"use strict";

//-- JQuery wrapper
$(document).ready(function() {
   //-- START of document.ready
   //--====================== 
   //--====================== 


   //--==============================================      
   //-- 1. Set API key and get user input city and get it's coords
   //--==============================================
   var APIKey = "23c1d2729442f28b96176ff1560c919f";

   let cityName = "london";
   let queryUrlGetLoc = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

   let locCorr = {
      lat : "",
      lon : "",
   };

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
            // get5DayForecast();


      }).fail(function(e) {
         console.log("error is:", e)
         console.log("response:", e.responseJSON);
         // need to catch the error here!!!!
         return;
      });
   }

   // getLocCorr(cityName);




   //--==============================================   
   //-- 2. Get current day 
   //--==============================================   
   var now = dayjs();
   var nowMidnightStartUnix = dayjs(now.startOf("date")).valueOf();
   var nowMidnightEndUnix = dayjs(now.endOf("date")).valueOf();
   console.log("nowMidnight EOD:", nowMidnightEndUnix, "and that is actually:", dayjs(nowMidnightEndUnix).format("DD-MMM-YYYY HH:mm:ss"));
   var todayDateString = dayjs(now).format("DD-MMM-YYYY");
   var todayHour = parseInt(dayjs(now).format("HH"));

   // var todayDateUnix = dayjs("2023-02-04").unix();
   var todayDateUnix = dayjs(todayDateString).valueOf();
   // console.log("todayDate:", now);
   console.log("todayDateString:", todayDateString);
   console.log("todayDateUnix:", todayDateUnix, "and that is actually:", dayjs(todayDateUnix).format("DD-MMM-YYYY"));

   function getDate(unixDate) {
      let dayString = dayjs(unixDate).format("DD-MMM-YYYY, HH:mm:ss");
      return dayString;
   }

   function getTime(unixDate) {
      let timeString = dayjs(unixDate).format("HH:mm");
      return timeString;
   }


   //--==============================================   
   //-- 3. Get current weather 
   //--==============================================   
   
   //--------------------------------        
   //-- 3.1 Get current weather data

   let currTemp;
   let currHumid;
   let currWind;
   let currFeelsLike;
   let currIconID;
   let currIconDesc;
   let currSunRise;
   let currSunSet;




   function getWeather() {
      // Get the current weather data for a location
      let queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + locCorr.lat + "&lon=" + locCorr.lon + "&units=metric&appid=" + APIKey;

      $.ajax({
         url: queryURL,
         method: "GET"
         }).then(function(resWeatherTemp) {
            console.log("resWeather:", resWeatherTemp);

            // localStorage.setItem("resWeather", JSON.stringify(resWeatherTemp));
            // let resWeather = JSON.parse(localStorage.getItem("resWeather"));

            // currTemp = resWeather.main.temp + "°C";
            // currHumid = resWeather.main.humidity + "%";
            // currWind = resWeather.wind.speed + "m/s";
            // currFeelsLike = resWeather.main.feels_like + "°C";
            // currIconID = resWeather.weather[0].id;
            // currIconDesc = resWeather.weather[0].description;
            // currSunRise = resWeather.sys.sunrise + " is " + getTime(resWeather.sys.sunrise * 1000);
            // currSunSet = resWeather.sys.sunset + " is " + getTime(resWeather.sys.sunset * 1000);
            // console.log("currTemp:", currTemp);
            // console.log("currHumid:", currHumid);
            // console.log("currWind:", currWind);
            // console.log("currFeelsLike:", currFeelsLike);
            // console.log("currIconID:", currIconID);
            // console.log("currIconDesc:", currIconDesc);
            // console.log("currSunRise:", currSunRise);
            // console.log("currSunSet:", currSunSet);
         });
   }

// all these should be inside the function ajax

            let resWeather = JSON.parse(localStorage.getItem("resWeather"));

            currTemp = resWeather.main.temp + "°C";
            currHumid = resWeather.main.humidity + "%";
            currWind = resWeather.wind.speed + "m/s";
            currFeelsLike = resWeather.main.feels_like + "°C";
            currIconID = resWeather.weather[0].id;
            currIconDesc = resWeather.weather[0].description;
            currSunRise = getTime(resWeather.sys.sunrise * 1000);
            currSunSet =  getTime(resWeather.sys.sunset * 1000);
            console.log("currTemp:", currTemp);
            console.log("currHumid:", currHumid);
            console.log("currWind:", currWind);
            console.log("currFeelsLike:", currFeelsLike);
            console.log("currIconID:", currIconID);
            console.log("currIconDesc:", currIconDesc);
            console.log("currSunSet is " + currSunRise);
            console.log("currSunrise is " + currSunSet);


   //--------------------------------        
   //-- 3.2 Render current weather data

   $("#currCity").text(cityName);

   let iconDay = "-n";

   if ((todayHour > 7) && (todayHour < 18) ) {
      iconDay = "-d";
   };
   $("#weaIconMain").attr("class", "owf owf-"+ currIconID + iconDay +" owf-3x weaIconMain");

   $("#currWeaDesc").text(currIconDesc);


   $("#currTemp").text(currTemp);
   $("#currFeelsLike").text(currFeelsLike);
   $("#currHumid").text(currHumid);
   $("#currWind").text(currWind);
   $("#currSunRise").text(currSunRise + "H");
   $("#currSunSet").text(currSunSet + "H");

   // let isUseCnt = true;
   let isUseCnt = false;
   let cntNum =5;
   let cntNumParam;

   if (isUseCnt) {
      cntNumParam ="&cnt=" + cntNum;
   } else {

      cntNumParam ="";
   };


   //--==============================================   
   //-- 4. Get Five Day Forecast
   //--==============================================     

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

   var fiveDayMaxMinArr;


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
            getPeriodMaxMin(day2Array);
            getPeriodMaxMin(day3Array);
            getPeriodMaxMin(day4Array);
            getPeriodMaxMin(day5Array);
         });
   }
   
   
   //--------------------------------        
   //-- 4.1 Put Each day in 5Day Forecast in own array

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


   //--------------------------------        
   //-- 4.2 Compute the Max and Min of each day in 5Day forecast 

   var dayCnt = 0;

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

      if (dayCnt === 0) {
         fiveDayMaxMinArr = [
            {
               day : dayCnt,
               tempMax: tempMax,
               tempMin: tempMin, 
               humidMax: humidMax,
               humidMin: humidMin,
               windMax: windMax,
               windMin: windMin,        
            },
         ];
      } else {
         fiveDayMaxMinArr.push(
            {
               day : dayCnt,
               tempMax: tempMax,
               tempMin: tempMin, 
               humidMax: humidMax,
               humidMin: humidMin,
               windMax: windMax,
               windMin: windMin,        
            }
         )
      };

      dayCnt ++;
      console.log("fiveDayMaxMinArr:", fiveDayMaxMinArr);

   } // end of function getPeriodMaxMin()




//--PW temperature, precipitation, pressure, wind, humidity, and cloudiness.


   //--====================== 
   //--======================  
   //-- END of document.ready
});   