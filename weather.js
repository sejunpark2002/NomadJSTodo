const weather = document.querySelector(".js-weather");
const API_KEY = "8c8eb40b4e238d149ac671eb5062699d";
const COORDS = 'coords';


function getWeather (lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temperature} at ${place}`
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordsObj))
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
         latitude,
         longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError () {
    console.log("Can't access geo location")
}

function askForCoords () {
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError)
}


function loadCoords () {
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init () {
    loadCoords()
}

init();