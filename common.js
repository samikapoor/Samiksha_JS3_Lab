const ApiKey = "41b8c5eaf24816d2c63121728fe6b5b0";
const Main = document.getElementById("main");
const Form = document.getElementById("form");
const Search = document.getElementById("search");
const city = document.querySelector('.city');
const temprature = document.querySelector('.temp');
const weatherName = document.querySelector('.weather');
const tempInfo = document.querySelector('.hi-low');
const date = document.querySelector('.date');
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const CurrentDate = new Date();
const getDay = weekday[CurrentDate.getDay()];
const getDate = CurrentDate.getDate();
const getMonth = month[CurrentDate.getMonth()];
const getYear = CurrentDate.getFullYear();


const Url = (City) =>
    `http://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${ApiKey}`;

async function GetWeatherByLocation(City) {
    const resp = await fetch(Url(City), { Origin: "Cros" });
    const respData = await resp.json();
    AddWeatherToPage(respData);
}

function AddWeatherToPage(Data) {
    const temp = Ktoc(Data.main.temp);
    const tempMax = Ktoc(Data.main.temp_max);
    const tempMin = Ktoc(Data.main.temp_min);
    const fullDate = getDay + ' ' + getDate + ' ' + getMonth + ' ' + getYear;
    city.innerHTML = `${Data.name}, ${Data.sys.country}`;
    temprature.innerHTML = `${temp}<span>°c</span>`;
    weatherName.innerHTML = `${Data.weather[0].main}`;
    tempInfo.innerHTML = `${tempMin}°c / ${tempMax}°c`;
    date.innerHTML = `${fullDate}`;
}

function Ktoc(K) {
    return Math.floor(K - 273.15);
}

Form.addEventListener("submit", (e) => {
    e.preventDefault();

    const City = Search.value;

    console.log(City);

    if (City) {
        GetWeatherByLocation(City);
    }
});
