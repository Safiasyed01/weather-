import React, { useState } from 'react'
import './Forms.css'
const Forms = () => {
    const [city, setCity] = useState("")
    const [WeatherData, setWeatherData] = useState(null)
    const API_KEY = "0d56dfab329ce6a083f581143d68a6b5"
      const handleSubmit = async(e) => {
    e.preventDefault(); 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    const response = await fetch(url)
   
    const data = await response.json()
    console.log(data); 
    setWeatherData(data)
  };

  return (
    <div>
        <form  onSubmit={ handleSubmit } className='search'>
    <input type="text" placeholder='Enter city' value={city} onChange={(e)=>setCity(e.target.value)}/>
    <button type='submit'>Search</button>
        </form>

       { WeatherData && ( 
        <div>
            <h1>{WeatherData.main.temp}</h1> 
            <h4>{WeatherData.weather[0].description}</h4> 
            <p>{WeatherData.name}</p>
        </div>
      )}

       { WeatherData && (<div>
            <h5>{WeatherData.main.feels_like}</h5>
            <h5>{WeatherData.main.humidity}</h5>
            <h5>{WeatherData.wind.speed}</h5>
        </div>
      )}

   
    </div>
  )
}

export default Forms