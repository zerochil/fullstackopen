import axios from 'axios';
import { useEffect, useState } from "react"

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState(null);
  
  useEffect( () => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then( response => setCountries(response.data))
  } , []);

  const handleSearch = (e) => {
    const filter = e.target.value.toLowerCase()
    const found=countries.filter( country => country.name.common.toLowerCase().includes(filter) )
    console.log(filter)
    console.log(found)
    if (found.length > 10 ){
      setSearch(null)
    } else if (found.length < 10 && found.length > 1 ) {
      setSearch(found)
    } else if (found.length == 1) {
      setSearch(found[0])
    }
  }

  return (
    <div>
      <div>
        <span>find countries:</span> <input type="text" onKeyUp={handleSearch}></input>
        <Country country={search} setSearch={setSearch} />
      </div>
    </div>
  )

}

const Country = ({country, setSearch}) => {
  if (country == null) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (Array.isArray(country)) {
    return (
      <div>
        {country.map(country => <li key={country.name.common}>
          {country.name.common}<button onClick={() => setSearch(country)}>show</button>
          </li>)}
      </div>
    )
  }
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <p><b>languages:</b></p>
      {Object.keys(country.languages).map( key => <li key={key}>{country.languages[key]}</li>)}
      <img src={country.flags.png}></img>
    </div>
  )
}

export default App 