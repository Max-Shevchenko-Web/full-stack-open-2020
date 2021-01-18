import React from 'react'
import  GetWeather  from '../GetWeather';

function CountryInfo({country}) {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>
        capital: {country.capital}
      </div>
      <div>
        population: {country.population}
      </div>
      <h2>Languages:</h2>
      <div>
        <ul>
          {country.languages.map(language => <li key={language.name + 1}>{language.name}</li>)}
        </ul>
      </div>
      <div >
        <img
          style={{width: '150px', marginTop: '10px'}}
          src={`${country.flag}`} alt=""/>
      </div>
      <GetWeather
        capital={country.capital}
      />
    </div>
  )
}

export default CountryInfo
