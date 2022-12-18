// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

const server = app.listen(port, listening);
function listening() {
  console.log("Server Is Running...");
  console.log(`Running On LocalHost: ${port}`);
}

/* post route to get all the data from the page and set it to the projectData object */
app.post("/local", function (request, respond) {
  projectData = {
    temperature: request.body.temperature,
    date: request.body.date,
    UserResponse: request.body.userResponse
  }
})

/* get route to give the page the final value of the projectData object after setting it */
app.get('/api', function (request, respond) {
  respond.send(projectData);
  console.log('projectData: ', projectData);
})


// cd C:\Users\yuyu\Desktop\weather-journal-app
// node server.js