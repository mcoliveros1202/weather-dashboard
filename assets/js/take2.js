var searchButton = document.querySelector(".btn");
var cityInputEl = document.querySelector(".form-input");
var formEl = document.querySelector("#city-form");

// // card variables

var currentContainer = document.getElementById("today-container");
var fiveDayContainer = document.getElementById("five-day");

// submit city search
var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getCoord(city);

        cityInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
}

// convert city name to coordinates

var getCoord = function (cityName) {

    // pick API 
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&limit=1&appid=2a7c7bd65f9deac59c01e0be3fce7c26&";

    // request to URL
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            convertCoord(data);
        });
    });
};

var convertCoord = function (city) {
    // create variables for lat and lon to plug into coordApiURL

    var lat = city.coord.lat;
    var lon = city.coord.lon;
    console.log(city.name);
    var coordApiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=2a7c7bd65f9deac59c01e0be3fce7c26&units=imperial`;

    // request to URL
    fetch(coordApiURL).then(function (response) {
        response.json().then(function (data) {
            var date = new Date(data.current.dt * 1000);

            // display current forecast
            currentContainer.innerHTML = `<h3 class="card-header">${city.name} ${date.toDateString()} <img 
            src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png" alt="${data.current.weather[0].description}"/> </h3>

            <div class="card">
            
            <p>Temperature: ${data.current.temp} &deg;F</p>
            <p>Wind Speed: ${data.current.wind_speed} mph</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>UV Index: ${data.current.uvi}</p>
            </div>`;

            // display 5-day forecast
            fiveDayContainer.innerHTML = data.daily.map((day, index) => {
                if (index > 0 && index < 6) {
                    var dt = new Date(day.dt * 1000);
                    return `<div class="card">
                <div class="card-body">
                    <p class="card-text">
                    <h4>${dt.toDateString()}</h4>
                    <p> <img 
                    src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png" alt="${data.current.weather[0].description}"/> </p>
                    <p>Temperature: ${day.temp.max}&deg;F</p>
                    <p>Wind Speed: ${day.wind_speed} mph</p>
                    <p>Humidity: ${day.humidity}%</p>
                </div>
            </div>`
                }
            }).join('');

            searchHistory = coordApiURL
            saveSearch();
        });
        // save to localStorage
        var saveSearch = function () {
            localStorage.setItem("searchHistory", JSON.stringify(coordApiURL));
        }
    });
    // var displayHistory = function () {
    //     var savedSearches = localStorage.getItem("coordApiURL");

    //     // if no searches, set search history to an empty array and return out of function
    //     if (!savedSearches) {
    //         return false;
    //     }
    //     console.log("Saved searches found!");
    //     // else load saved searches

    //     // parse into array of object
    //     savedSearches = JSON.parse(savedSearches);

    //     // loop through savedSearches array
    //     for (var i = 0; i < savedSearches.length; i++) {
    //         convertCoord(savedSearches[i]);
    //     }

    // };
};



formEl.addEventListener("submit", formSubmitHandler);
// displayHistory();


// click history to go to city forecast