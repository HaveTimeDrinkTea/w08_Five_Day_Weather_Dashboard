# w08_Five_Day_Weather_Dashboard

## Description

This project is part of the Frontend Dev Bootcamp course challenge for the eighth week "Server APIs". 

It requires us to use server APIs such as openweather and third-party APIs like day.js, JQuery and its UI together JScript objects, client-side storage, browser events to build a Weather app. This weather application should allow a user to view the current weather of a city and its five-day forecast. This app should also allow user to check for the weather of any city provided by openweather. 

The JScript and JQuery will produce the output dyanmically to the webpage pages as part of the starter code provided. I've tried to group repeatedly called JScript codes into modular functions where possible.

### NOTE:
 * That for some reason(s) unknown, the text "testing" is actually a valid city according to openweather API. 
   


### Methodology: Pseudo Code
* Get the current (local machine) time to present in Jumbotron and to extract the date (in DD-MMM-YYYY string) and the hour as a numeric variable
  * the date should be inserted with the user entry
  * the hour will be used to colour each time slots to indicate "past", "present" or "future".
* For each time slot (if in the "present" or "future"
  * Allow user to enter text (Check for null entry)
  * Allow user to save their entry
  * present the newly saved or previously saved entries.
* For "past" time slots, user should still be able to see their previously saved entries but should not be able to add any more events.
  

### Further Improvements

* To allow users to delete or amend a previous entry. 
  * This can be done by generating an ID (as a counter) to each entry stored in the Local Storage everytime the Local Storage data is called. 
  * The IDs can then be inserted into Local Storage is done when every there is a new input or amendment or deletion. 
  
* To allow users to enter text for the two post-it notes in the side bar. This "Post-It note" functionality should allow user to amend or delete any notes.  These notes will be stored in the localstorage.



## User Story

AS A traveler

I WANT to see the weather outlook for multiple cities

SO THAT I can plan a trip accordingly


[Deployment link](https://havetimedrinktea.github.io/w07_Five_Day_Weather_Dashboard/)


## Acceptance Criteria

The app should should act as a weather dashboard with form inputs.
* When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
* When a user views the current weather conditions for that city they are presented with:
  * The city name
  * The date
  * An icon representation of weather conditions
  * The temperature
  * The humidity
  * The wind speed
* When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
  * The date
  * An icon representation of weather conditions
  * The temperature
  * The humidity
* When a user click on a city in the search history they are again presented with current and future conditions for that city



## Table of Contents (Optional)

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Features](#features)


## Installation

N.A.


## Usage 

Screen dump of the deployed webpage:

### Web Schedule Planner
![Deployed Webpage](assets/images/Work_Day_Scheduler.png)



### User Entry in Current Hour Time Slot / Colour-coded time slots and multiply entries per time slot
![Deployed Webpage](assets/images/Work_Day_Scheduler2.png)


### null User entry and error message
![Deployed Webpage](assets/images/Work_Day_Scheduler3.png)


### User Entry in future Hour Time Slot
![Deployed Webpage](assets/images/Work_Day_Scheduler4.png)


### Mock Data Creation and Time Slot Setting Buttons
![Deployed Webpage](assets/images/Work_Day_Scheduler5.png)




## Credits

* Most of the inspirational quotes are taken from [https://malpaper.com/blogs/news/72-mindfulness-quotes-for-daily-inspiration](https://malpaper.com/blogs/news/72-mindfulness-quotes-for-daily-inspiration)
* speech bubble css styling modified from [https://projects.verou.me/bubbly/](https://projects.verou.me/bubbly/)



## License 

MIT License



## Features

### Main Features
A styled online schedule planner for the current day that
* uses bootstrap v4.6 as a page template
* display the current (local machine) date and time in the jumbotron
* Hourly time slots for scheduling events during office hours. This app allows user to input entries for 13 hourly time slots from 0700h to 1900h.
* Allow users to enter events for the current or future time slots. When the user attempts to save a blank event entry, the is a warning message.
* Once the user saved an entry, it is displayed for the time slot.
* Users can enter more than one event (subject to local storage limits)
* Each hourly timeslot is colour coded to represent "past", "preent" and "future"
* The event data that user entered persists on page refresh.


### Extra Features
* A randam inspirational quote of the day rendered on page refresh from a quotes data bank of 30+ quotes
* Two (or more) post-it notes on the side bar for reminders
* Entry (and rendering) of more than one event for each time slot.
* A button to remove previous day entries to clear up local storage.
* Previous days entries are not presented in the current day schedule.
* Two buttons for testing this app (to be removed after go-live):
  * Button for creating test data for the app. (to delete the mock data, tester will need to clear the local storage of key "userEntryArray").
  * Button to switch between local machine time and a default time of 12 noon.
