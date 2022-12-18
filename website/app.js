/* Global Variables */
const apiSite = "http://api.openweathermap.org/data/2.5/weather?zip="
const apiKey = ",us&appid=b3456f9acbfa64fc4495e6696ecdc9a5";
const unitParametar = "&units=imperial"; // get temp in Fahrenheit
/**
 * Fahrenheit use units=imperial
 * Celsius use units=metric
 * Kelvin is used by default, units=standard
 */

// another way with state name:
// http://api.openweathermap.org/data/2.5/weather?q=California&appid=b3456f9acbfa64fc4495e6696ecdc9a5


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

/* our async function for posting data into our node server */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  try {
    const allData = await response.json();
  } catch (error) {
    console.log('error: ', error);
  }
}

/* our get request that we will use later for calling weather api */
const getData = async (url = '') => {
  const request = await fetch(url);
  try {
    const newData = await request.json();
    const temp = `${newData.main.temp} °F`; // For Celsius => <span>&#8451;</span> ℃
    return temp; // assign to ELEMENT`s innerHTML
  } catch (error) {
    console.log('error: ', error);
  }
}

const submiting = document.getElementById("generate");
submiting.addEventListener("click", post);

function post() {
  const user_Response_Value = document.getElementsByTagName("textarea")[0].value;
  const zipCode = document.getElementById("zip").value;
  // we call our api here so we can get the temperature from the returned object
  getData(apiSite + zipCode + apiKey + unitParametar)
    //then we chain promises to use the data from api into a post request to our server 
    .then(function (temp) {
      postData("/local", { temperature: temp, date: newDate, userResponse: user_Response_Value })
      // and the update our UI with anther get request
      updateUI('/api')
    })
};

const updateUI = async (url = '') => {
  const request = await fetch(url);
  try {
    const data = await request.json();
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("temp").innerHTML = data.temperature;
    document.getElementById("content").innerHTML = data.UserResponse;
  } catch (error) {
    console.log('error: ', error);
  }
}