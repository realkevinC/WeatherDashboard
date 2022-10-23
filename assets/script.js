// Dependencies (DOM)
var APIKey = "84901325de4dfa2e90aa5903c666c0dc"  
// var city = ""
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";

var lat = "";
var lon = "";

//var cityAPIurl = `api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;


var weatherAPIurl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

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
    var cityAPIurl = `api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${APIKey}`;
    var geoCode = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&appid=${APIKey}`;
    // save the new input value to localStorage
    // 1. we have to get the item or data
    // 2. we have to convert it (JSON.parse()) to a JS object
    // 3. We add to the Array the new city --> ARRAY.push(newCity)
    // 4. we convert it back to a JSON object (STRING) (JSON.stringify())
    // 5. Update the data --> locaStorage.setItem()
    // --> 6. Refresh the page --> load()

    // Make a request to the Weather API (an Async operation)
    fetch(geoCode) 
        .then(function(response) {
            console.log(response)
            return response.json();
        })
        .then(function(results) {
            // At this Point we have actual DATA
            console.log(results);
            // parsing out needed data from response object
            let lat = results[0].lat;
            let lon = results[0].lon;

            console.log(lat, lon);
            var weatherAPIurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
            console.log(weatherAPIurl)
            // Now we have data and can make a SECOND request using that data that we got from the first request
            fetch(weatherAPIurl)
            .then(function(response){
                return response.json();
            })
            .then(function(results){
                // dig into the data that we got back
                console.log(results)
                    $('#city').text(searchInput);
                    $('#currentday').text("(" + moment().format("MM/DD/YYYY") + ")");
                    $('#picture').attr("src", `https://openweathermap.org/img/wn/${results.list[4].weather[0].icon}@2x.png`);
                    console.log(results.list[4].weather[0].icon)
                    var temp = $(".temp").text(Math.floor(results.list[4].main.temp));
                    // var temp = $(".temp").text(Math.floor(results.list[4].main.temp) * 9/5 - 459);
                    var wind = $(".wind").text(results.list[4].wind.speed);
                    var humidity = $(".humidity").text(results.list[4].main.humidity);




                // create new elements
                // add attributes or text content

                // for(i=4; i < results.list.length; i= i + 8){
                //     console.log(i);

                //     var temp = $(".temp").text(parseInt(results.list[i].main.temp) * 9/5 - 459);
                    // var temp = Math.floor(temp)
                //     var wind = $(".wind").text(`Wind: ${results.list[i].wind.speed}`);
                //     var humidity = $(".humidity").text(`Humidity: ${results.list[i].main.humidity}`);

                    // var container = $("<div>").append(temp);
                    // var weatherCard = document.createElement('div')
                    // weatherCard.textContent = 
                    // $("#fiveDayForecastBox").append(weatherCard);
                // }


                // $(".temperature").text(results.list[12].main.temp)
                // $(".wind").text(`Wind: ${results.list[12].wind.speed}`)
                // $(".humidity").text(results.list[12].main.humidity)

                // append it to the DOM

                
            })
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
    localStorage.setItem("saved", JSON.stringify(["New York"]));
    
    load();
    