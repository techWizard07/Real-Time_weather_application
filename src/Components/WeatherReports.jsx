import React from 'react'
import './WeatherReports.css'
function WeatherReports({icon,desc,temp,city,country,lati,long,humidityicon,humidity,windicon,wind}) { 
  return (
    <div>
      <div className='weather-image'>
        <img src={icon} alt="Sunny" />
    </div>
    <div className="desc">{desc}</div>
    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
    <div className="lati">
      <span className="lat">latitude</span> 
      <span>{lati}</span>
      </div>
    <div className="long">
      <span className="log">
      longitude</span>
       <span>
       {long}
       </span>
       </div>
    </div>
    <div className="data-container">
    <div className="element"><img src={humidityicon} alt="" />
      <div className="humidity-percent">{humidity}</div>
      <div className="text">humidity</div>
      </div>
      <div className="element"><img src={windicon} alt="" />
      <div className="wind-percent">{wind} km/h</div>
      <div className="text">wind speed</div>
      </div>
    </div>
    </div>
  )
}

export default WeatherReports