import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { degToCard } from './utl/utl';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
// const API_KEY = 'ac36a2385034c22f9fcdcc9eff6097fe';
const API_KEY  = process.env.REACT_APP_API_KEY;

//for start without .env and process.env.REACT_APP_API_KEY
// set REACT_APP_API_KEY=ac36a2385034c22f9fcdcc9eff6097fe&& npm start

function GetWeather({capital}) {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(URL, {
        params: {
          q: capital,
          units: 'metric',
          lang: 'en',
          APPID: API_KEY,
        },
      })
      .then(response => {
        setWeather(response.data);
      })
  }, [capital])

  return (
    <>
      {weather.main && (
        <div className="city">
          <h2>Weather in {capital}</h2>
          <div className="temp">
              Temperature:
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
          </div>
          <div className="info">
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} className="city-icon"/>
              <p>{weather.weather[0].description}</p>
          </div>
          <div>
            Wind: {weather.wind.speed} BFT | {degToCard(weather.wind.deg)}
          </div>
        </div>
      )}
    </>
  )
}

export default GetWeather;


