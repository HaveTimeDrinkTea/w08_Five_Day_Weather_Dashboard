# w08_Five_Day_Weather_Dashboard

## Description

This project is part of the Frontend Dev Bootcamp course challenge for the seventh week "Third-Party APIs". 

It requires us to use third-party APIs such as moment.js, JQuery and its UI together JScript objects, client-side storage, browser events to build a single day schedule planner. This calendar application should allow a user to save events for each hour of the day. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery. Moment.js library is used for date and time display and manipulations. 

The JScript will produce the output dyanmically to the webpage pages as part of the starter code provided. I've tried to group repeatedly called JScript codes into modular functions where possible.

### NOTE:
 * To make it easier to evaluate this application, I have added two buttons at the bottom of the deployed page.  
   * One button will populate the hourly slots with mock activities (to remove the mock data, please delete the localStorage of key "userEntryArray" and then refresh the page) and 
   * the other will set the current hour to be 12 noon so that one can see the past/present/future hourly slot colouring. (to reset back to local machine time, please click the button again).
 * The "Delete Yesterday Data" button on the side bar is meant to demonstrate the deletion of data.  The mock data mentioned above has some previous day data pre-populated for testing this function.  
   


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

AS AN employee with a busy schedule

I WANT to add important events to a daily planner

SO THAT I can manage my time effectively

[Deployment link](https://havetimedrinktea.github.io/w07_Work_Day_Scheduler/)


## Acceptance Criteria

The app should:

* Display the current day at the top of the calender when a user opens the planner.
* Present timeblocks for standard business hours when the user scrolls down.
* Color-code each timeblock based on past, present, and future when the timeblock is viewed.
* Allow a user to enter an event when they click a timeblock
* Save the event in local storage when the save button is clicked in that timeblock.
* Persist events between refreshes of a page



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
