import React from 'react'
import moment from 'moment';


const Forecast = (props) => {
  const { data, forecast } = props;
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  
  return (
    <div className='mt-20 text-white text-3xl w-50 flex flex-col items-center justify-center lg:justify-around'>
      
      <div className='flex-col p-4 border-2 border-solid border-black rounded-lg bg-black opacity-70'>
        <div>
          <img className='block mx-auto' src={iconUrl} alt={data.weather[0].main} />
        </div>
        <div>
          <h1>{data.name}, {data.sys.country}</h1>
          <p>{Math.floor(data.main.temp - 273.15)}°C</p>
          <p>{data.weather[0].description}</p>
          <p>Feels like: {Math.floor(data.main.feels_like - 273.15)}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>High/Low: {Math.floor(data.main.temp_max - 273.15)}°C / {Math.floor(data.main.temp_min - 273.15)}°C</p>
        </div>
      </div>
      

      {forecast ? (
      <div className='mt-10 w-auto'>
        <div className='w-auto border-2 border-solid border-black rounded-lg bg-black opacity-70'>
          <h1>Hourly Forecast</h1>
          <p>{moment(forecast.list[0].dt_txt).format("DD MMM, YYYY")}</p>
        </div>

         
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 p-4">
            {forecast.list.map((forecast, index) => (

              <div className='px-2 py-4 mt-5 mb-5 border-2 border-solid border-black rounded-lg bg-black opacity-70' key={index}>
                <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt={forecast.weather.main} />
                <p>{forecast.dt_txt.slice(11, 16)}</p>
                <p>{Math.floor(forecast.main.temp)}°C</p>
                <p>{forecast.weather[0].description}</p>
                <p>Feels like: {Math.floor(forecast.main.feels_like)}°C</p>
                <p>Humidity: {forecast.main.humidity}%</p>
                <p>High/Low: {Math.floor(forecast.main.temp_max)}°C / {Math.floor(forecast.main.temp_min)}°C</p>
              </div>
              ))}
          </div>
      </div>) : (<div>Loading</div>)}
    </div>
  )
}

export default Forecast