# Tweeter Project:

## About:

**The interview scheduler** is a single page Full Stack application. It allows user to book an appointment and choose an interviewer. The application utilizes WebSocket connection to support multiple user connections. It allows data to update across all session without users refreshing the page.

The application uses a wide range of testing technics:

1. Static testing;
2. Unit  and Integration testing (StoryBook, Jest);
3. E2E testing (Cypress)

The overall test coverage for the application is 95%:
![coverage](/public/images/coverage.png)

The app has been deployed on `Netlify` and can be accessed via the link:<br>
https://goofy-noether-013749.netlify.app/
<br> `Please allow approximately 15 seconds for application to start up. It runs on AWS servers, so if application has been inactive for 30 minutes, it will be terminated and needs some time to restart`.

# Key Features:

*  Single Page App
*  Built using function-based React
*  Reducer was used to controll application state
*  **WebSocket** was used to allow for synchoniously updating data in     multiple active clients

# Dependencies:

* `Node.js`
* `React`
* `Axios`
* `Express`
* `CSS`
* `SASS`
* `Jest`
* `Cypress`
* `classnames`

# Functionality Demonstration:

## Create Appointment
Create a new appointment for selected day and time slot:

![New appointment](/public/images/Createappointment.gif)
___
## Edit Appointment 
Edit an existing appointment:

![Edit](/public/images/Editappointment.gif)
___
## Delete Appointment
Delete an existing appointment:
![Delete](/public/images/deleteappointment.gif)
___
## Error handling
Demonstrate two types of errors thrown when there is no Student name or Interviewer selected while trying to submit an appointment form:
![Errors](/public/images/Errors.gif)
___
## Spots updating
Demonstrate an update of number of available slots on each appointment createing/deletion. If no spots available for any given day, this day is greyed out:
![spotsupdate](/public/images/spotsupdate.gif)
___
## Websocket implementation
Websocket allows a synchronous update on more than one running instance of application. In this case there are two separate sessions opened in separate browsers. Once a change is made in one open browser, it is reflected in the other one:
![websocket](/public/images/Websocket.gif)