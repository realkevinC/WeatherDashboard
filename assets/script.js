// Dependencies (DOM)
var APIKey = "84901325de4dfa2e90aa5903c666c0dc"
// var city = ""
var queryURL




// Data





// User interaction
// user will type in a city name in the search bar
// when user click on search button then the city card will appear below the search button
$(".searchButton").click(function){
    
}
// save the city when refreshed
for (var i = 0; i < localStorage.length; i++){
    var city = localStorage.getItem(i);
    console.log(city)
    var cityList = $("#cityList").addClass("cityListItems");
    cityList.append("<li>" + city + "</li>");
}
// user will then see the city and the date. below will have current temp, wind speed, and humidity.
// user will also see the next 5 day forecast for that city





// Initilization







