
import React, { useEffect, useState } from 'react'
import Forecast from './components/Forecast'
import Inputs from './components/Inputs'
import TempAndDetails from './components/TempAndDetails'
import TimeAndLocation from './components/TimeAndLocation'
import TopButtons from './components/TopButtons'
import getFormattedWeatherData from './services/weatherService'



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const [query, setQuery] = useState({ q: "patna" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  // const getWeather = async () => {
  //   const data = await getFormattedWeatherData({q: "new delhi"});
  //   console.log(data)
  // }

  const getWeather = async () => {
    await getFormattedWeatherData({ ...query, units })
      .then((data) => {
        setWeather(data);
        toast.success(`Successfully fetched weather data for ${data.name}, ${data.country}`);
      })
      .catch((error) => {
        toast.error("Failed to fetch weather data");
      });
  };


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    getWeather();

    //toast work
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`)

  }, [query, units])

  // getWeather();



  return (

    <div className={`mx-auto py-5 px-32 sm:px-8 lg:px-32 bg-gradient-to-br shadow-xl shadow-gray-400
     from-gray-900 via-gray-8900 to-black overflow-x-hidden`}>
      <div className="flex flex-col sm:flex-row justify-between items-start mb-8">
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} setUnits={setUnits} />
      </div>

      {weather && (
        <>
          <div className="mb-8">
            <TimeAndLocation weather={weather} />
          </div>
          <TempAndDetails weather={weather} units={units} />
          <div className="my-6">
            <Forecast title="3-Hour Forecast" data={weather.hourly} type="hourly"  />
          </div>
          <div className="my-6">
            <Forecast title="Daily Forecast" data={weather.daily} type="daily" />
          </div>
        </>
      )}

      <ToastContainer autoClose={2500} hideProgressBar={true} theme="dark" />
    </div>

  )
}

export default App