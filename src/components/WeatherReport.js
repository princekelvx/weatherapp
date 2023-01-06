import axios from "axios";

import React, { useState } from "react";
import Forecast from "./Forecast";

function WeatherReport() {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  navigator.geolocation.getCurrentPosition((position) => {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
  });

  // api
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API;

  // url
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&cnt=3&units=metric&appid=${apiKey}`;
  const geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const geoForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=3&units=metric&appid=${apiKey}`;

  // handles the submit for the search button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const weatherResult = await axios.get(url);
    const forecastResult = await axios.get(forecastUrl);
    setWeather(weatherResult);
    setForecast(forecastResult);
  };

  // handles the submit for the current location button
  const handleGeoSubmit = async (e) => {
    e.preventDefault();

    const weatherResult = await axios.get(geoUrl);
    const forecastResult = await axios.get(geoForecastUrl);
    setWeather(weatherResult);
    setForecast(forecastResult);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className="container text-lg text-center">
      <div>
        <h1 className="text-white text-2xl font-bold">Weather App</h1>
      </div>
      <div className="mt-10 w-full">
        <form>
          <input
            id="city"
            type="text"
            placeholder="Enter City"
            className="w-40 lg:w-auto py-2 px-4 outline-none ring-1 w-45 rounded-lg focus:ring-2 focus:ring-gray-200 bg-transparent text-gray-700"
            onChange={handleCity}
          />
          <input
            id="country"
            type="text"
            placeholder="Enter Country"
            className="w-40 lg:w-auto py-2 px-4 outline-none ring-1 w-45 rounded-lg focus:ring-2 focus:ring-gray-200 bg-transparent text-gray-700"
            onChange={handleCountry}
          />
          <button
            className="text-center lg:ml-3 px-6 py-3 bg-orange-400 rounded-md mt-3 block lg:inline-block mx-auto"
            onClick={handleSubmit}
          >
            Search
          </button>
          <button
            className="text-center lg:ml-3 px-6 py-3 bg-orange-400 rounded-md mt-3 block lg:inline-block mx-auto"
            onClick={handleGeoSubmit}
          >
            Current Location
          </button>
        </form>
      </div>

      {weather.data !== undefined ? (
        <div>
          <Forecast data={weather.data} forecast={forecast.data} />
        </div>
      ) : null}
    </div>
  );
}

export default WeatherReport;
