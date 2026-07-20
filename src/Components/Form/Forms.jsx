import React, { useEffect, useState } from 'react'
import './Forms.css'

const Forms = () => {
  const [city, setCity] = useState("")
  const [WeatherData, setWeatherData] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState(null)
  const API_KEY = "0d56dfab329ce6a083f581143d68a6b5"

  const weatherColors = {
  Rain: "linear-gradient(to bottom, #4b5a68, #7c8b99)",
  Clear: "linear-gradient(to bottom, #f2c879, #5fa8e0)",
  Clouds: "linear-gradient(to bottom, #8ca0b3, #c9d3dc)",
    Snow: "linear-gradient(to bottom, #b8c6d6, #eaf1f8)",
  Thunderstorm: "linear-gradient(to bottom, #2e2a3d, #54495f)",
  Drizzle: "linear-gradient(to bottom, #5c6b78, #8e9ca8)",
  Mist: "linear-gradient(to bottom, #9ba6ac, #d3d8da)",
  Default: "linear-gradient(to bottom, #4a6fa5, #8eb4d6)"
};

  // ONE shared function — top-level, sibling to handleSubmit, not nested inside it
  const fetchWeather = async (query) => {
    setisLoading(true);
    setError(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&appid=${API_KEY}`
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("city not found")
      }
      const data = await response.json()
      setWeatherData(data);
    } catch (err) {
      setWeatherData(null);
      setError(err.message)
    } finally {
      setisLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(`q=${city}`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(`lat=${lat}&lon=${lon}`);
      },
      (err) => {
        console.log("geolocation failed:", err.message);
        fetchWeather(`q=Peshawar`);
      }
    )
  }, [])

  return (
      <div
    className="weather-app"
style={{ background: weatherColors[WeatherData?.weather[0]?.main] || weatherColors.Default }}
>  
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} />
        <button type='submit'>Search</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {WeatherData && (
        <div className="stats">
          <h1>{WeatherData.main.temp}</h1>
          <h4>{WeatherData.weather[0].description}</h4>
          <p>{WeatherData.name}</p>
        </div>
      )}
      {WeatherData && (
        <div className="stats">
    <h5>Feels like : {WeatherData.main.feels_like}°</h5>
    <h5>Humidity : {WeatherData.main.humidity}%</h5>
    <h5>Wind :{WeatherData.wind.speed} m/s</h5>
  </div>
      )}
    </div>
  )
}

export default Forms