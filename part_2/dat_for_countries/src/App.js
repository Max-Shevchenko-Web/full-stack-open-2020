import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css';
import ShowCountries from './components/ShowCountries/ShowCountries';

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Search countries</h2>
      <div>
        find countries
        <input
          type="text"
          value={search}
          onChange={(event)=> setSearch(event.target.value)}
        />
      </div>
      <h2>Search results</h2>
      <div>
        <h2>Show list even if result is greater than 10?</h2>
        <button
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Yes' : 'No'}
        </button>
      </div>
      <ShowCountries
        countries={countries}
        search={search}
        showAll={showAll}
      />
    </div>
  );
}

export default App;
