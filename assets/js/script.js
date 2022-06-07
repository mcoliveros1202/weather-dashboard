// var searchButton = document.querySelector(".btn");
// var cityFormEl = document.querySelector("#city-form");
// var cityInputEl = document.querySelector("#city-search");
// // card variables
// var cityDisplay = document.querySelector("#city-name");
// var tempDisplay = document.querySelector(".temp");
// var windDisplay = document.querySelector(".wind");
// var humidityDisplay = document.querySelector(".humidity");
// var uvDisplay = document.querySelector(".uv-index");


// // to submit city search
// var formSubmitHandler = function(event) {
//     var cityName = cityInputEl.value;

//     if (cityName) {
//         getCityWeather(cityName);
//         // clears old input
//         cityInputEl.value = "";
//     } else {
//         alert("Please enter a city");
//     }

//     event.preventDefault();  
// } 

var convertCity = function(location) {
    // define api
    var locationApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=2a7c7bd65f9deac59c01e0be3fce7c26";

    // make request to URL
    fetch(locationApiUrl)
        .then(function(response) {
            response.json()
            .then(function(data, location) {
                console.log(data)
            });
        });
};

// to pull city weather
// var getCityWeather = function(cityName) {

//     // format the api url
//     var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&limit=1&appid=2a7c7bd65f9deac59c01e0be3fce7c26&units=imperial";

//     // make a request to the url
//     fetch(apiUrl).then(function(response) {
//         response.json().then(function(data, cityName) {
//             displayWeather(data);
//             console.log(data, cityName);
//     });
// });
// };

// var displayWeather = function(data, cityName) {
//     cityDisplay.textContent = cityName; 
//     tempDisplay.textContent = data["main"]["temp"];
//     windDisplay.textContent = data.wind.speed;
//     humidityDisplay.textContent = data["main"]["humidity"];
// };

// cityFormEl.addEventListener("submit", formSubmitHandler)
// displayWeather();
