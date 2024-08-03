// import { DateTime } from "luxon";

// const getWeatherData = (infoType, searchParams) => {
//     const url = new URL(BASE_URL + infoType)
//     url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

//     return fetch(url)
//         .then((res) => res.json());
// };

import axios from 'axios';
import { DateTime } from 'luxon';


const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Fetch weather data using axios
const getWeatherData = async (infoType, searchParams) => {
    const url = `${BASE_URL}${infoType}`;
    const params = { ...searchParams, appid: API_KEY };

    return  await axios.get(url, { params })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching weather data:', error);
            throw error;
        });
};

// Creating the URL for icon depicting weather condition
const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

// Using luxon package, converting from epoch time to desired time format
const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") =>
    DateTime.fromSeconds(secs + offset, { zone: 'utc' }).toFormat(format);

const formatCurrent = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
        timezone,
    } = data;

    const { main: details, icon } = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone);

    return {
        temp,
        feels_like,
        temp_max,
        temp_min,
        humidity,
        name,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        speed,
        details,
        icon: iconUrlFromCode(icon),
        formattedLocalTime,
        dt,
        timezone,
        lat,
        lon
    };
};



//getting the forecast for 5 days
//https://api.openweathermap.org/data/2.5/forecast?q=london&appid=699f60b57ec0d91efcff173cb4c025b1
//weather forecast url - get the data for forecast

const formatForecastWeather = (secs, offset, data) => {
    //hourly
    const hourly = data.filter((f) => f.dt > secs)
                       .map((f) => ({
                        temp: f.main.temp,
                        title: formatToLocalTime(f.dt, offset, "hh:mm a"),
                        icon: iconUrlFromCode(f.weather[0].icon),
                        date:f.dt_txt,
                       }))
                       .slice(0, 5);

    //daily                                   
    const daily = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00")
                        .map((f) => ({
                        // const dailydate = DateTime.fromISO(f.dt_txt).toFormat('dd:MM:yyyy');
                        temp: f.main.temp,
                        title: formatToLocalTime(f.dt, offset, "hh:mm a"),
                        icon: iconUrlFromCode(f.weather[0].icon),
                        date:f.dt_txt,
    }))

    return {hourly, daily};
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        "weather",
        searchParams
    ).then((data) => formatCurrent(data));

    // console.log(formattedCurrentWeather);

//take these variables present in the formatted weather
const {dt, lat, lon, timezone} = formattedCurrentWeather;

const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
}).then((d) => formatForecastWeather(dt, timezone, d.list));

// console.log(formattedForecastWeather)

return { ...formattedCurrentWeather , ...formattedForecastWeather};
};

export default getFormattedWeatherData;
