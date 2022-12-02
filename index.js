'use strict';

const apiKey = '06c05ae99fbaf7e427d9a3ddc85c8055';
const someLocation = 'Rio de Janeiro';

window.addEventListener('load', () => {
    getData(someLocation);
})

// main event trigger, for searching a location
document.querySelector('button#search').addEventListener('click', (e) => {
    e.preventDefault();
    const _location = document.querySelector('input#search').value;
    const disposables = document.querySelectorAll('.disposable');
    for (let disposable of disposables) {
        disposable.textContent = '';
    }
    getData(_location);
})

// the async function
async function getData(location) {
    try {
        // this is to fetch data
        const raw = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`, {mode : 'cors'}) 

        // to make sure 404 gets traced => in order to tell user
        // Why? because 404 can't get caught :(
        if (raw.status === 200) {
            // what we need after fetch is a response.
            const response = await raw.json(); // without await error : 'raw.json() isn't a function' :(            
            getDetails(response); // passing the json response to function
        } else if (raw.status === 404) {
            promptAgain();
        }
    } catch (error) {
        console.log(error)
    }
}

function promptAgain() {
    alert('we couldn\'t find the location');
}

function getDetails(data) { // gets details from response JSON
    const locationName = data.name;
    const temperature = data.main;
    const weather = data.weather;
    const wind = data.wind;
    const clouds = data.clouds;
    const coord = data.coord;

    setName(locationName);
    setCoord(coord);
    setTemps(temperature);
    setWeather(weather[0]);
    setWind(wind);
    setClouds(clouds);
}

function setName(name) {
    // set name location
    document.querySelector('span.location-highlight').textContent = `${name}`;
}

function setCoord(coord) {
    document.querySelector('.lat.disposable').textContent = `${coord.lat}`;
    document.querySelector('.lon.disposable').textContent = `${coord.lon}`;
}

function setTemps(temperature) {

    // main temperature
    document.querySelector('.normal-temp.disposable').textContent = `${temperature.temp} °C`

    // feels like
    document.querySelector('.feels.disposable').textContent = `${temperature.feels_like} °C`;

    // min_temp
    document.querySelector('.min.disposable').textContent = `${temperature.temp_min} °C`;

    //max_temp
    document.querySelector('.max.disposable').textContent = `${temperature.temp_max} °C`;

}

function setWeather(weather) {
    
    // main weather
    document.querySelector('.weather.disposable').textContent = `${weather.main}`;

    // description 
    document.querySelector('.description.disposable').textContent = `${weather.description}`;

    // icon?
    document.querySelector('img[alt = "show"').src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;

}

function setWind(wind) {

    document.querySelector('.wind.speed.disposable').textContent = `${wind.speed} m/s`;
    document.querySelector('.deg.disposable').textContent = `${wind.deg} degrees`;

}

function setClouds(clouds) {
    document.querySelector('.cloud.disposable').textContent = `${clouds.all}%`;
}


