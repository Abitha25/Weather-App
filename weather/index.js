
const weatherApi = {
    key: "10c65cd5cf7ef7110312220f84a46541",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
}

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const search = document.getElementById('input-city');
search.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        console.log(search.value);
        getWeatherReport(search.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});
//getweather report

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWearherReport);
}

//showWearherReport
function showWearherReport(weather) {
    console.log(weather);
    let city = document.getElementById('city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let temp = document.getElementById('temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMax = document.getElementById('min_max');
    minMax.innerHTML = `${Math.floor(weather.main.temp_min)}&deg; C (min)/${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${(weather.weather[0].main)}`;

    let date = document.getElementById('date');
    let todayDate = new Date();

    date.innerText = dateManager(todayDate);

    if (weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = 'url(images/clear.jpg)';
    }
    else if (weatherType.textContent == 'Haze') {
        document.body.style.backgroundImage = 'url(images/haze.jpg)';
    }
    else if (weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = 'url(images/clouds.jpg)';
    }
    else if (weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = 'url(images/rain.jpg)';
    }
    else if (weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = 'url(images/snow.jpg)';
    }
    else if (weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = 'url(images/thunderstorm.jpg)';
    }

}

function dateManager(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;

}