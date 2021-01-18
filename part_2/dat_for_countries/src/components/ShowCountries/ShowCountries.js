import React, { useState, useEffect } from 'react'
import CountryInfo from './../CountryInfo/CountryInfo';
import { isEmpty, toCompare } from './../utl/utl';

import "./ShowCountries.css";

function ShowCountries({ countries, search, showAll }) {
  const [country, setCountry] = useState({})
  const [countriesToShow, setCountriesToShow] = useState([])


  useEffect(() => {
    setCountriesToShow(
      search
          ? countries.filter(country => toCompare(country.name, search))
          : countries
    )
  }, [search, countries])

  useEffect(() => {
    if(countriesToShow.length === 1) {
        setCountry(countriesToShow[0])
    } else {
      setCountry({})
    }
  }, [countriesToShow])

  const renderCountriesList = countriesToShow.map((country, index )=> {
    return (
      <div style={{display: 'flex', }} key={index}>
        <li>{country.name}</li>
        <button
          style={{marginLeft: '5px'}}
          onClick={()=>setCountry(country)}
        >
          show
        </button>
      </div>
    )
  })

  // Проверяем можем ли мы показывать информацию про страну
  const isShowCountry = () => {
    // Определена ли страна
    const notEmpty = !isEmpty(country);

    // Если стран больше 10, можем ли мы их отобразить
    const canShow = () => {
      if(countriesToShow.length > 10) {
        return showAll ? true : false
      } else {
        return true
      }
    }

    return (notEmpty && canShow())
  }

  return (
    <div className="show-countries">
      <div className="show-countries__names">
        <ul>
          { showAll ? renderCountriesList
                    : countriesToShow.length > 10
                          ? <p>Too many matches, specify another filter</p>
                          : countriesToShow.length === 0
                                ? <p>No search matches</p>
                                : renderCountriesList
          }
        </ul>
      </div>
      <div className="show-countries__info">
        { isShowCountry()
              ? <CountryInfo
                  country={country}
                />
              : null
        }
      </div>
    </div>
  )
}

export default ShowCountries
