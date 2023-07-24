import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const apiKey = "6cc35d9c912d4d35a9b0f4ab8c106c65";

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData(location);
  };

  const getWeatherData = async (location) => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?city=${location}&units=M&key=${apiKey}`
      );

      if (response.data.data.length === 0) {
        setError("Location not found.");
        setWeatherData(null);
      } else {
        setWeatherData(response.data.data[0]);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setError("An error occurred. Please try again later.");
      setWeatherData(null);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <p>Enter the city followed by the two-letter country code:</p>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a city name"
        />
        <button type="submit">Get Weather</button>
      </form>

      {weatherData && (
        <div className="weather-info">
          <p>Location: {weatherData.city_name}</p>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Description: {weatherData.weather.description}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
