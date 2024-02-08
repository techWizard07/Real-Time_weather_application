import React, { useEffect, useState } from 'react'
import'./Weather.css'
import WeatherReports from './WeatherReports'

import searchIcon from '../images/search.png'
import windIcon from '../images/windicon.png'
import humidityIcon from '../images/humidity.png'

import D01 from '../images/01d.png'
import N01 from '../images/01n.png'
import D02 from '../images/02d.png'
import N02 from '../images/02n.png'
import D03 from '../images/03d.png'
import N03 from '../images/03n.png'
import D04 from '../images/04d.png'
import N04 from '../images/04n.png'
import D09 from '../images/09d.png'
import N09 from '../images/09n.png'
import D10 from '../images/10d.png'
import N10 from '../images/10n.png'
import D11 from '../images/11d.png'
import N11 from '../images/11n.png'
import D13 from '../images/13d.png'
import N13 from '../images/13n.png'
import D50 from '../images/50d.png'
import N50 from '../images/50n.png'



function Weather() {
  let apikey='3ee628815b31f987daa1aace5aaacd49'

  const [text,setText]=useState('')
  const [icon,setIcon]=useState(D10)
  const [desc,setDesc]=useState("-")
  const [temp,setTemp]=useState(0)
  const [city,setCity]=useState("")
  const [country,setCountry]=useState("")
  const [lati,setLati]=useState("")
  const [long,setLong]=useState("")
  const[humidity,setHumidity]=useState('')
  const[wind,setWind]=useState('')
  const [cityNotFound,setCityNotFound]=useState(false)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const iconMap={
    "01d" : D01,
    "01n" : N01,
    "02d" : D02,
    "02n" : N02,
    "03d" : D03,
    "03n" : N03,
    "04d" : D04,
    "04n" : N04,
    "09d" : D09,
    "09n" : N09,
    "10d" : D10,
    "10n" : N10,
    "11d" : D11,
    "11n" : N11,
    "13d" : D13,
    "13n" : N13,
    "50d" : D50,
    "50n" : N50  
  }

  const searchReport=async()=>{
    setLoading(true)
    let URL=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`;
    try{
      let res=await fetch(URL)
      let data=await res.json()
      if(data.cod==='404'){
        console.warn('city Not Found Please Check entered City')
        setCityNotFound(true)
        setLoading(false)
        return
      }
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setTemp(Math.floor(data.main.temp))
      setCity(data.name)
      setCountry(data.sys.country)
      setLati(data.coord.lat)
      setLong(data.coord.lon)
      const weather=data.weather[0].icon
      setIcon(iconMap[weather] || D10)
      setDesc(data.weather[0].description)
      setCityNotFound(false)
    }
    catch(e){
      console.error("Error while fetching the Weather Report",e.message)
    }
    finally{
      setLoading(false)
    }
   
  }

   const handleCity=(e)=>{
    setText(e.target.value)
   }

   const handleKeyDown=(e)=>{
    if(e.key==='Enter'){
      searchReport()
    }
   }

   useEffect(()=>{
    searchReport()
   },[])

  return (
    <div>
      <div className="container">
        <div className="input-container">
          <input type="text" onChange={handleCity} onKeyDown={handleKeyDown} placeholder="Enter Your City" className='search-input'/>
          <div className="search-img" onClick={searchReport}>
          <img
            src={searchIcon}
            alt="Search Icon"
          />
          </div>
          
        </div>
        
        
        {loading && <div className="load-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City Not Found</div>}
        {!loading && !cityNotFound && !error && <WeatherReports icon={icon} desc={desc} temp={temp} city={city} country={country} lati={lati} long={long} humidityicon={humidityIcon} humidity= {humidity} windicon={windIcon} wind={wind}/>} 

        <p className="copyright">CopyRights &#169; All Rights Reserved by <span><a href="https://wizards-personal-portfolio.netlify.app/" className='copyright-name'>Akash</a></span></p>
      </div>
    </div>
  )
}

export default Weather