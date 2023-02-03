//-- Whole-script strict mode syntax
"use strict";

//-- JQuery wrapper
$(document).ready(function() {
   //-- START of document.ready
   //--====================== 
   //--====================== 
   var APIKey = "23c1d2729442f28b96176ff1560c919f";

   let cityName = "london";
   queryUrlGetLoc = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

   // Here we are building the URL we need to query the database
   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + APIKey;
   

   $.ajax({
      url: queryUrlGetLoc,
      method: "GET"
      }).then(function(resLocation) {
         console.log("resLocation:", resLocation);
      });
   
   

   $.ajax({
      url: queryURL,
      method: "GET"
      }).then(function(resWeather) {
         console.log("resWeather:", resWeather);
      });
   
   
   
   
   
   
   
   
   
   //--====================== 
   //--======================  
   //-- END of document.ready
});   