// Using free Weather API key and URL

const apiKey = "25fad273b0a14ed2949201450241602";
const apiUrl ="https://api.weatherapi.com/v1/forecast.json?days=1&aqi=yes&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon =  document.querySelector("#weather-icon");


// using async await functionality to get weather data
async function checkWeather(city){

    document.querySelector(".intro-container").style.display = "none";
    document.querySelector(".error-container").style.display = "none";
    document.querySelector(".weather-data").style.display = "none";
    document.querySelector(".loader-container").style.display = "block";


    try {

        const response = await fetch(apiUrl + city + `&key=${apiKey}`);
        var data = await response.json();
        // console.log(response.status);
        // console.log(data);
    
        // Switching intro page to weather data page only when city found
        document.querySelector(".intro-container").style.display = "none";
        document.querySelector(".error-container").style.display = "none";
        document.querySelector(".loader-container").style.display = "none";
        document.querySelector(".weather-data").style.display = "block";
    
        // Updating innerHTML with realtime weather data
        document.querySelector("h1").innerHTML = data.location.name;
        document.querySelector("#temperature").innerHTML = data.current.temp_c + "&deg;";
        document.querySelector("#weather-status").innerHTML = data.current.condition.text;
        document.querySelector("#aqi").innerHTML = Math.round(data.current.air_quality.pm10);
        document.querySelector("#rainfall").innerHTML = data.current.precip_mm;
        document.querySelector("#wind-speed").innerHTML = Math.round(data.current.wind_kph);
        document.querySelector("#max-temp").innerHTML = Math.round(data.forecast.forecastday[0].day.maxtemp_c);
        document.querySelector("#min-temp").innerHTML = Math.round(data.forecast.forecastday[0].day.mintemp_c);
        
        // setting up wind direction
        var windAngle = data.current.wind_degree;
        document.querySelector("#wind-direction").style.transform = `rotate(${windAngle}deg)`;
    
    
        // Assigning Weather Icons according to the weather code from the API
    
        var Code = data.current.condition.code;
        var isDay = data.current.is_day;
    
        // Assigning icons for cloud related conditions
        if(Code == 1000){
            isDay == true ? weatherIcon.src = "assets/clear-day.svg" : weatherIcon.src = "assets/clear-night.svg";
        }
        else if(Code == 1003){
            isDay == true ? weatherIcon.src = "assets/clouds/partly-cloudy-day.svg" : weatherIcon.src = "assets/clouds/partly-cloudy-night.svg";
        }
        else if(Code == 1006){
            weatherIcon.src = "assets/clouds/cloudy.svg";
        }
        else if(Code == 1009){
            isDay == true ? weatherIcon.src = "assets/clouds/overcast-day.svg" : weatherIcon.src = "assets/clouds/overcast-night.svg";
        }
        else if(Code == 1030){
            weatherIcon.src = "assets/clouds/mist.svg";
        }
        else if(Code == 1135){
            isDay == true ? weatherIcon.src = "assets/clouds/fog-day.svg" : weatherIcon.src = "assets/clouds/fog-night.svg";
        }
        else if(Code == 1147){
            weatherIcon.src = "assets/clouds/fog.svg";
        }
    
        // Assigning icons for snow related conditions
        else if(Code == 1066 || Code == 1210 || Code == 1213 || Code == 1255){
            isDay == true ? weatherIcon.src = "assets/snow/partly-cloudy-day-snow.svg" : weatherIcon.src = "assets/snow/partly-cloudy-night-snow.svg";
        }
        else if(Code == 1114 || Code == 1117 || Code == 1216 || Code == 1219 || Code == 1222 || Code == 1225 || Code == 1237 || Code == 1258 || Code == 1261 || Code == 1264){
            weatherIcon.src = "assets/snow/snow.svg";
        }
        else if(Code == 1279 || Code == 1282){
            weatherIcon.src = "assets/snow/thunderstorms-snow.svg";
        }
        else if(Code == 1069){
            isDay == true ? weatherIcon.src = "assets/snow/partly-cloudy-day-sleet.svg" : weatherIcon.src = "assets/snow/partly-cloudy-night-sleet.svg";
        }
        else if(Code == 1198 || Code == 1201 || Code == 1204 || Code == 1207 || Code == 1249 || Code == 1252){
            weatherIcon.src = "assets/snow/sleet.svg";
        }
    
        // Assigning icons for rain related conditions
        else if(Code == 1063 || Code == 1163 || Code == 1150){
            isDay == true ? weatherIcon.src = "assets/rain/partly-cloudy-day-rain.svg" : weatherIcon.src = "assets/rain/partly-cloudy-night-rain.svg";
        }
        else if(Code == 1072 || Code == 1153  || Code == 1168  || Code == 1171){
            weatherIcon.src = "assets/rain/drizzle.svg";
        }
        else if(Code == 1180  || Code == 1183  || Code == 1186  || Code == 1189  || Code == 1192  || Code == 1195 || Code == 1240  || Code == 1243  || Code == 1246){
            weatherIcon.src = "assets/rain/rain.svg";
        }
        else if(Code == 1087){
            weatherIcon.src = "assets/rain/thunderstorms.svg";
        }
        else if(Code == 1273  || Code == 1276){
            weatherIcon.src = "assets/rain/thunderstorms-rain.svg";
        }
    
        // If weather code does not recognized then assining N/A to weather icon
        else{
            weatherIcon.src = "assets/not-available.svg";
        }
    
    
        // Setting up custom formatted realtime date and time values for different timzones
        let timestamp = data.current.last_updated;
        let date = new Date(timestamp);
    
        let dateNow = date.toLocaleDateString
            ('default', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            }
        );
        
        let timeNow = date.toLocaleTimeString
            ('default', {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            }
        );
        
        document.querySelector("#date-time").innerHTML =  dateNow + " " + timeNow;


    } catch (error) {
        // TypeError: Failed to fetch
        // console.log('City not found', error);
        document.querySelector(".intro-container").style.display = "none";
        document.querySelector(".weather-data").style.display = "none";
        document.querySelector(".loader-container").style.display = "none";
        document.querySelector(".error-container").style.display = "block";
    }
}

searchBtn.addEventListener("mousedown", () => {
    checkWeather(searchBox.value);
})



// Note:
// mousedown is faster than click event
// local comprerssed png icons are faster than cdn like boxicons or flaticons
