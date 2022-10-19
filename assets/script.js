// Dependencies (DOM)
var APIKey = "84901325de4dfa2e90aa5903c666c0dc"  
// var city = ""
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "Chicago";

var lat = "40.7";
var lon = "70";
var weatherAPIurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

// var weatherAPIurl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

console.log(weatherAPIurl)

var cityList = $("#cityList");


// Data



// User interaction

// user will type in a city name in the search bar
// --> document.querySelector().addEventListener("click", cb)
$(".searchButton").click(function (event){
// when user click on search button then the city card will appear below the search button
    event.preventDefault();
    var searchInput = $(".searchInput").val();
    console.log(searchInput);
    
    var listItem = "<ul>"
    $("#cityList").append($("<li>").text(searchInput));

    // save the new input value to localStorage
    // 1. we have to get the item or data
    // 2. we have to convert it (JSON.parse()) to a JS object
    // 3. We add to the Array the new city --> ARRAY.push(newCity)
    // 4. we convert it back to a JSON object (STRING) (JSON.stringify())
    // 5. Update the data --> locaStorage.setItem()
    // --> 6. Refresh the page --> load()

    // Make a request to the Weather API (an Async operation)
    fetch(weatherAPIurl)
    method; 
        .then(function(response) {
            console.log(response)
            return response.json();
        })
        .then(function(results) {
            // At this Point we have actual DATA
            console.log(results);
            // dig into the data that we got back
            console.log(results.list[4].main)

            // create new elements
            var
            // add attributes or text content

            // append it to the DOM

            // Now we have data and can make a SECOND request using that data that we got from the first request

            /*
            fetch(queryURL)  // <-- Creates a PROMISE
                .then(function(response) {   // <-- When we get data back (Successfully)
                    // WE are waiting for the data
                    console.log(response);
                    return response.json();
                })
                .then(function(results) {
                    // At this Point we have actual DATA
                    console.log(results);
                })
                .catch(function(error) {   // <-- When we get an ERROR back
                    console.log(error)
                });
                */


        })
        .catch(function(error) {   // <-- When we get an ERROR back
            console.log(error)
        });
    // user will then see the city and the date. below will have current temp, wind speed, and humidity.


// user will also see the next 5 day forecast for that city

}) 


// save the city when refreshed

function load() {
    // var saved = "saved";
    var city = localStorage.getItem("saved");
    console.log(city)
    console.log(typeof city)
    
    // var cityList = $("#cityList").addClass("cityListItems");
    // cityList.append("<li>" + city + "</li>");
    
    // make the request to local Storage
    
    // we get back a JSON array " { "key": ["Dallas", "Detroit"]  }"   (This is a STRING data type)
    
    // WE want to PARSE the JSON OBJECT  --> this turns it into a usable JS object (ARRAY  JSON.Parse())
    var savedCities = JSON.parse(city)
    console.log(savedCities);
    console.log(typeof savedCities);
    
    // Update the "cityList" <ul> 
    
    for (var i = 0; i < savedCities.length; i++){
            // We create a new <li> and add the city as Text Content
            var listItem = $("<li>").text(savedCities[i])
            // Where does the text come from? 
    
            // we append it to the <ul> container
            $("#cityList").append(listItem)
    }
}



// Initilization
localStorage.setItem("saved", JSON.stringify(["Dallas", "Detroit"]));

load();






