//-- Whole-script strict mode syntax
"use strict";

//-- JQuery wrapper
$(document).ready(function() {
   //-- START of document.ready
   //--====================== 
   //--====================== 



   //--==============================================      
   //-- . Set API key and get user input city and get it's coords
   //--==============================================
   var APIKey = "23c1d2729442f28b96176ff1560c919f";

   let queryUrlGetLoc;

   let locCorr = {
      lat : "",
      lon : "",
   };

   var cityName;

   function init() {
      queryUrlGetLoc = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=" + APIKey;
      console.log(queryUrlGetLoc);
      //get the coordinates of city based on user input.
      $.ajax({
         url: queryUrlGetLoc,
         method: "GET"
         }).then(function(resLocation) {
            console.log("resLocation here:", resLocation);
            locCorr.lat = resLocation.coord.lat;
            locCorr.lon = resLocation.coord.lon;
            cityName = resLocation.name;

            // User input validation before getting weather data

            getWeather();
            get5DayForecast();


   //-- here
   var searchBtnStoredArr;
   var searchBtnDefaultArr;

   function setSearchArray() {
      searchBtnStoredArr = JSON.parse(localStorage.getItem("searchBtnArr"));

      console.log("searchBtnStoredArr", searchBtnStoredArr);
      if (!(searchBtnStoredArr)) {
         searchBtnDefaultArr = [
            "singapore",
            "tokyo",
            "washington",
            "shanghai",
            "cape town"
         ];
         localStorage.setItem("searchBtnArr",JSON.stringify(searchBtnDefaultArr));
      };
   }

   setSearchArray();

   searchBtnStoredArr = JSON.parse(localStorage.getItem("searchBtnArr"));

   console.log("searchBtnStoredArr", searchBtnStoredArr);



   console.log("searchBtnStoredArr here", searchBtnStoredArr);

   //--==============================================   
   //-- 1. Get current day 
   //--==============================================   
   var now = dayjs();
   var nowMidnightStartUnix = dayjs(now.startOf("date")).valueOf();
   // var nowMidnightEndUnix = dayjs(now.endOf("date")).valueOf();
   // console.log("nowMidnight EOD:", nowMidnightEndUnix, "and that is actually:", dayjs(nowMidnightEndUnix).format("DD-MMM-YYYY HH:mm:ss"));
   var todayDateString = dayjs(now).format("DD-MMM-YYYY");
   var todayHour = parseInt(dayjs(now).format("HH"));

   // var todayDateUnix = dayjs("2023-02-04").unix();
   var todayDateUnix = dayjs(todayDateString).valueOf();
   // console.log("todayDate:", now);
   console.log("todayDateString:", todayDateString);
   console.log("todayDateUnix:", todayDateUnix, "and that is actually:", dayjs(todayDateUnix).format("DD-MMM-YYYY"));

   function getDate(unixDate, timeZone) {
      let dayString = dayjs((unixDate + timeZone) * 1000).format("DD-MMM-YYYY, HH:mm:ss");
      return dayString;
   }

   function getDateString(unixDate, timeZone) {
      let dateString = dayjs((unixDate + timeZone) * 1000).format("DD MMM");
      return dateString;
   }

   function getTime(unixDate, timeZone) {
      let timeString = dayjs((unixDate + timeZone) * 1000).format("HH:mm");
      return timeString;
   }






   //--------------------------------        
   //-- 2.1 Get current weather data

   var isError = false;

   function getLocCorr(cityName) {

      queryUrlGetLoc = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
      //get the coordinates of city based on user input.
      $.ajax({
         url: queryUrlGetLoc,
         method: "GET"
         }).then(function(resLocation) {
            console.log("resLocation:", resLocation);
            locCorr.lat = resLocation.coord.lat;
            locCorr.lon = resLocation.coord.lon;

            // User input validation before getting weather data

            getWeather();
            get5DayForecast();


      }).fail(function(e) {
         console.log("error is:", e)
         console.log("response:", e.responseJSON);
         $("#errMsg").html("<i class='fa fa-exclamation-triangle' aria-hidden='true'></i> <i class='fa fa-hand-paper-o' aria-hidden='true'></i> City does not exist. Please try again.");
         isError = true;
         console.log("here:", isError);
      })
      .then(function(){
         console.log("here check error:", isError);
         if (isError === false) {
            searchBtnStoredArr = JSON.parse(localStorage.getItem("searchBtnArr"));
            searchBtnStoredArr.pop();
            searchBtnStoredArr.unshift(cityName);
            localStorage.setItem("searchBtnArr",JSON.stringify(searchBtnStoredArr));
            renderSearchButtons();
         };
         isError = false;
      })
      ;
   }

   getLocCorr(cityName);

   //--------------------------------        
   //-- 2.3 Get User Input

   let userInputEl = $("#userTextInput");
   let searchBtnEl = $("#search");



   searchBtnEl.on("click", function() {
      $("#errMsg").empty();
      cityName = (userInputEl.val().trim()).toLowerCase();
      console.log("user input city:", cityName);
      
      if (cityName === null) {
         cityName = "london"; 
      };

      getLocCorr(cityName);
      userInputEl.val("");



   });
   
   //--------------------------------        
   //-- 2.4 Search Buttons


   function renderSearchButtons() {
      for (let i = 0; i < searchBtnStoredArr.length; i++) {
         let cntNum = i + 1;
         $("#btn" + cntNum).text(searchBtnStoredArr[i]);
         $("#btn" + cntNum).on("click", function(){
            cityName = searchBtnStoredArr[i];
            queryUrlGetLoc = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
            //get the coordinates of city based on user input.
            $.ajax({
               url: queryUrlGetLoc,
               method: "GET"
               }).then(function(resLocation) {
                  console.log("resLocation:", resLocation);
                  locCorr.lat = resLocation.coord.lat;
                  locCorr.lon = resLocation.coord.lon;
      
                  // User input validation before getting weather data
      
                  getWeather();
                  get5DayForecast();
         });
      });
   };
}

   renderSearchButtons();






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
   let timeZone; //Shift in seconds from UTC


//-- function to set background colour based on temperature
   let bgColorClass;

   function setBgColor(temp) {
      if (temp >= 35) {
         bgColorClass = "hotExtreme";
      } else if ((temp >= 32) && (temp < 35)) {
         bgColorClass = "hotVeryVery";
      } else if ((temp >= 28) && (temp < 32)) {
         bgColorClass = "hotVery";
      } else if ((temp >= 25 ) && (temp < 28)) {
         bgColorClass = "hotQuite";
      } else if ((temp >= 20 ) && (temp < 25)) {
         bgColorClass = "warmYucky";
      } else if ((temp >= 12 ) && (temp < 20)) {
         bgColorClass = "warmNice";
      } else if ((temp >= 5 ) && (temp < 12)) {
         bgColorClass = "coolNice";
      } else if ((temp >= 1 ) && (temp < 5)) {
         bgColorClass = "coolChilly";
      } else if ((temp >= -5 ) && (temp < 1)) {
         bgColorClass = "coldCold";
      } else if ((temp >= -10 ) && (temp < -5)) {
         bgColorClass = "coldVery";
      } else if (temp < -10) {
         bgColorClass = "freezing";
      } else {
         bgColorClass = "default";
      };
      return bgColorClass;
   }



   function getWeather() {
      // Get the current weather data for a location
      let queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + locCorr.lat + "&lon=" + locCorr.lon + "&units=metric&appid=" + APIKey;

      $.ajax({
         url: queryURL,
         method: "GET"
         }).then(function(resWeather) {

            console.log("resWeather:", resWeather);

            currTemp = resWeather.main.temp;
            currHumid = resWeather.main.humidity;
            currWind = resWeather.wind.speed;
            currFeelsLike = resWeather.main.feels_like;
            currIconID = resWeather.weather[0].id;
            currIconDesc = resWeather.weather[0].description;
            timeZone = resWeather.timezone;
            currSunRise = getTime(resWeather.sys.sunrise, timeZone);
            currSunSet = getTime(resWeather.sys.sunset, timeZone);


            //--------------------------------        
            //-- 3.2 Render current weather data

            $("#currCity").text(cityName);

            let iconDay = "-n";

            if ((todayHour > 7) && (todayHour < 18) ) {
               iconDay = "-d";
            };
            $("#weaIconMain").attr("class", "owf owf-"+ currIconID + iconDay +" owf-3x weaIconMain");

            $("#currWeaDesc").text(currIconDesc);


            $("#currTemp").html("<i class='fa fa-thermometer-three-quarters' aria-hidden='true'></i> Now: " + currTemp + "°C");
            $("#currWeaFeels").html("<i class='fa fa-commenting' aria-hidden='true'></i> Feels like <br>" + currFeelsLike + "°C");
            $("#currHumid").text(currHumid + "%");
            $("#currWind").text(currWind + "m/s");
            $("#currSunRise").text(currSunRise + "H");
            $("#currSunSet").text(currSunSet + "H");

            //-- set background colour based on temperature

            let bgEl = $("#currCityWeather");
   
            bgEl.removeClass();
            bgEl.addClass("table table-sm table-borderless tableWeather center " + setBgColor(currTemp));

         });
   //-- end of function getWeather()      
   }






   //--==============================================   
   //-- 4. Get Five Day Forecast
   //--==============================================     

   var fiveDayMaxMinArr;


   function get5DayForecast() {
   // Get the 5-day weather forecast for a location
      let queryURL5Day = "https://api.openweathermap.org/data/2.5/forecast?lat=" + locCorr.lat + "&lon=" + locCorr.lon + "&units=metric&appid=" + APIKey;
      // res5DayArray = "";
      let res5DayArray;

      let day0Array = [];
      let day1Array = [];
      let day2Array = [];
      let day3Array = [];
      let day4Array = [];
      let day5Array = [];
      let dayDiff;


      $.ajax({
         url: queryURL5Day,
         method: "GET"
         }).then(function(results) {
            res5DayArray = results;
            console.log("Weather Forecast:", results);

         //--------------------------------        
         //-- 4.1 Put Each day in 5Day Forecast in own array

         var forecastTimeZone;

         function prep5DayData(results) {


            console.log("res5DayArray.list.length:", results.list.length);

            forecastTimeZone = results.city.timezone;
            let nowLocal = dayjs().valueOf() + forecastTimeZone;
            console.log("nowLocal", nowLocal, " is ", dayjs(nowLocal).format("DD-MMM-YYYY HH:mm"));
            var foreCastMidnightStartUnix = dayjs(dayjs(nowLocal).startOf("date")).valueOf();

            for (let i = 0; i < results.list.length; i++) {

               let arrayDateUnix = (results.list[i].dt * 1000) + forecastTimeZone;

               console.log("forecastTimeZone", forecastTimeZone);
               console.log("arrayDateUnix", arrayDateUnix, " is ", dayjs(arrayDateUnix).format("DD-MMM-YYYY HH:mm"));

               console.log("foreCastMidnightStartUnix", foreCastMidnightStartUnix, " is ", dayjs(foreCastMidnightStartUnix).format("DD-MMM-YYYY HH:mm"));              

               dayDiff = dayjs(arrayDateUnix).diff(foreCastMidnightStartUnix, "day");

               console.log(i, ": for", getDate(arrayDateUnix, 0), ", the diff is:", dayDiff);

               switch(dayDiff) {
                  case 1:
                     // code block
                     day1Array.push(results.list[i]);
                     console.log("day1Array:", day1Array);
                     break;
                  case 2:
                     // code block
                     day2Array.push(results.list[i]);
                     console.log("day2Array:", day2Array);
                     break;
                  case 3:
                     // code block
                     day3Array.push(results.list[i]);
                     console.log("day3Array:", day3Array);
                     break;
                  case 4:
                     // code block
                     day4Array.push(results.list[i]);
                     console.log("day4Array:", day4Array);
                     break;
                  case 5:
                     // code block
                     day5Array.push(results.list[i]); 
                     console.log("day5Array:", day5Array);
                     break;   
                  default:
                     day0Array.push(results.list[i]); 
                     console.log("day0Array:", day0Array);
               };

            };
         //-- end of prep5DayData(res5DayArray) 
         }

         prep5DayData(results);

         //--------------------------------        
         //-- 4.2 Compute the Max and Min of each day in 5Day forecast 

         var dayCnt = 0;
         let dateStringForecast;
         let avgTemp;

         function getPeriodMaxMin(period_array) {

            let temp;
            var tempMax;
            var tempMin;
            let humidity;
            var humidMax;
            var humidMin
            let wind;
            var windMax;
            var windMin;

            for (let i = 0; i < period_array.length; i++) {

               dateStringForecast = getDateString(period_array[i].dt, forecastTimeZone);
               console.log("dateStringForecast:", dateStringForecast);
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

               console.log("====================================");
               console.log("temp/humidity/wind for index:", i, "is", temp, "/", humidity, "/", wind);     

               if (temp > tempMax) {
                  tempMax = temp;
               } else if (temp < tempMin) {
                  tempMin = temp;
               };

               if (humidity > humidMax) {
                  humidMax = humidity;
               } else if (humidity < humidMin) {
                  humidMin = humidity;
               };

               if (wind > windMax) {
                  windMax = wind;
               } else if (wind < windMin) {
                  windMin = wind;
               }
               //-- end of for loop
            };

            console.log("Final max/min");
            console.log("**************************");
            console.log("temp:", tempMax, "/", tempMin);
            console.log("humidity:", humidMax, "/", humidMin);
            console.log("wind:", windMax, "/", windMin);

            avgTemp = ((tempMax + tempMin)/2);

            if (dayCnt === 0) {
               fiveDayMaxMinArr = [
                  {
                     day : dayCnt,
                     date : dateStringForecast,
                     avgTemp: avgTemp.toFixed(1),
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
                     date : dateStringForecast,     
                     avgTemp: avgTemp.toFixed(1),          
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


         //--------------------------------        
         //-- 4.3 render 5 day forecast 
            let dayNum;

            for (let i = 0; i < fiveDayMaxMinArr.length; i++) {
               dayNum = i +1;
               $("#foreTitleDay" + dayNum).text(fiveDayMaxMinArr[i].date);
               $("#foreTempDay" + dayNum).html(fiveDayMaxMinArr[i].tempMin + "°C <br> to <br>"+ fiveDayMaxMinArr[i].tempMax + "°C");
               $("#foreHumidDay" + dayNum).html(fiveDayMaxMinArr[i].humidMin + "% <br> to <br>" + fiveDayMaxMinArr[i].humidMax + "%");
               $("#foreWindDay" + dayNum).html(fiveDayMaxMinArr[i].windMin + " m/s <br> to <br>" + fiveDayMaxMinArr[i].windMax + " m/s" );
               let bgCard = $("#fDay" + dayNum);
               bgCard.removeClass();
               bgCard.addClass("card " + setBgColor(fiveDayMaxMinArr[i].avgTemp));
            };
            // end of function getPeriodMaxMin()
         } 

            getPeriodMaxMin(day1Array);
            getPeriodMaxMin(day2Array);
            getPeriodMaxMin(day3Array);
            getPeriodMaxMin(day4Array);
            getPeriodMaxMin(day5Array);
         });
   }

   
})
}
init();   
   




//--PW temperature, precipitation, pressure, wind, humidity, and cloudiness.


   //--====================== 
   //--======================  
   //-- END of document.ready
});   