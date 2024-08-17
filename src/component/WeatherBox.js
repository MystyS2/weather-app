import React from "react";

const WeatherBox = ({ weather }) => {
  let iconSrc = `https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`;
  return (
    <div className="weatherBox">
      <div className="location">{weather?.name}</div>
      <h2>
        {weather?.main.temp} °C /{" "}
        {weather ? (weather.main.temp * 1.8 + 32).toFixed(2) : ""} °F
      </h2>
      <div className="infoBox">
        <img src={iconSrc} alt="weather icon" />
        <h3>{weather?.weather[0].description}</h3>
      </div>
    </div>
  );
};

export default WeatherBox;
