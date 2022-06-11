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

// save to localStorage
var saveSearch = function (search) {
    var search = search.toLowerCase()
    var searchHistory = [];
    var savedSearches = JSON.parse(localStorage.getItem('city-search'));
    if (savedSearches) {
        searchHistory.push(...savedSearches)
    }

    if (searchHistory.includes(search)) {
        return;
    }

    searchHistory.push(search);
    localStorage.setItem('city-search', JSON.stringify(searchHistory));

    var searchHistory = document.getElementById("searchHistory");
    var cityEl = document.createElement("div");

    cityEl.setAttribute("class", "cities");
    cityEl.textContent = search;
    // searchHistory.appendChild(cityEl);


    cityEl.addEventListener("click", function (event) {
        getCoord(event.target.innerText);
    });
    searchHistory.appendChild(cityEl);
}



// convert city name to coordinates
var getCoord = function (cityName) {
    saveSearch(cityName);
    // pick API 
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&limit=1&appid=2a7c7bd65f9deac59c01e0be3fce7c26&";

    // request to URL
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            convertCoord(data);
        });
    });
};

var convertCoord = function (location) {
    // create variables for lat and lon to plug into coordApiURL
    console.log(location)
    var lat = location.coord.lat;
    var lon = location.coord.lon;

    var coordApiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=2a7c7bd65f9deac59c01e0be3fce7c26&units=imperial`;

    // request to URL
    fetch(coordApiURL).then(function (response) {
        response.json().then(function (data) {
            var date = new Date(data.current.dt * 1000);

            // display current forecast
            currentContainer.innerHTML =
                `<h3 class="card-header">${location.name} ${date.toDateString()} <img 
            src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png" alt="${data.current.weather[0].description}"/> </h3>

            <div class="card-current">
            
            <h4>Temperature: <span class="font-weight-normal">${data.current.temp} &deg;F</span></h4>
            <h4>Wind Speed: <span class="font-weight-normal">${data.current.wind_speed} mph</span></h4>
            <h4>Humidity: <span class="font-weight-normal">${data.current.humidity}%</span></h4>
            <h4>UV Index: <span class="font-weight-normal">${data.current.uvi}</span></h4>
            </div>
            </div>`;

            // display 5-day forecast
            fiveDayContainer.innerHTML = data.daily.map((day, index) => {
                if (index > 0 && index < 6) {
                    var dt = new Date(day.dt * 1000);
                    return `<div class="card" id="five-day-forecast">
                <div class="card-body">
                    <p class="card-text">
                    <h4>${dt.toDateString()}<img 
                    src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png" alt="${data.current.weather[0].description}"/></h4>
                    <p class="font-weight-bold">Temperature: <span class="font-weight-normal">${day.temp.max}&deg;F</span></p>
                    <p class="font-weight-bold">Wind Speed: <span class="font-weight-normal">${day.wind_speed} mph</span></p>
                    <p class="font-weight-bold">Humidity: <span class="font-weight-normal">${day.humidity}%</span></p>
                </div>
            </div>`
                }
            }).join('');


        });

    });

};

var displayHistory = function () {
    var savedSearches = JSON.parse(localStorage.getItem('city-search'));

    // if no searches, set search history to an empty array and return out of function
    if (!savedSearches) {
        return false;
    }
    console.log("Saved searches found!");
    // else load saved searches
    var searchHistory = document.getElementById("searchHistory");

    // loop through savedSearches array
    for (var i = 0; i < savedSearches.length; i++) {
        var cityEl = document.createElement("div");
        console.log(cityEl);
        cityEl.setAttribute("class", "cities");
        cityEl.textContent = savedSearches[i];
        searchHistory.appendChild(cityEl);

    }
    var cityList = document.getElementsByClassName("cities")
    if (cityList.length > 0) {
        for (let index = 0; index < cityList.length; index++) {
            const cityEl = cityList[index];
            cityEl.addEventListener("click", function (event) {
                getCoord(event.target.innerText);
            });
        }
    }
};



formEl.addEventListener("submit", formSubmitHandler);
displayHistory();


// click history to go to city forecast