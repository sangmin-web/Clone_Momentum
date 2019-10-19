const weather = document.querySelector(".js-weather");
const API_KEY = "aecae47c8f8bbb531c4493a21e81dca7";
const COORDS = 'coords';

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then((response)=>{
       return response.json()
    }).then((json)=>{
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function askForCoords() {
    console.log("hi")
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coordsObj = {
            latitude,
            longitude
        };
        saveCoords(coordsObj);
    }, (error) => {


    })
}

function loadCoords() {
    const loadCoords = localStorage.getItem(COORDS);
    if (!loadCoords) {
        askForCoords();
    } else {
        const parseCoord = JSON.parse(loadCoords);
        getWeather(parseCoord.latitude, parseCoord.longitude)
    }
}

(() => {

    loadCoords();


})()