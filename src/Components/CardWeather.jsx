import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/CardWeatherStyle.css'
import '../styles/Loanding.css'

const CardWeather = () => {
    const [coords, setCoords] = useState()
    const [getWeather, setGetWeather] = useState()
    const [changeMeasure, setchangeMesure] = useState(true)
    const [loanding, setLoanding] = useState(true)
  
    useEffect( () => {
      const success = location => {
        const position = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
        setCoords(position)
      }
      navigator.geolocation.getCurrentPosition(success)
    }, [])
    const apiKey = '7d5873d34efaee7f63c2364c11120c97'
    useEffect( () => {
    if(coords){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}`
    axios.get(url)
      .then( res => setTimeout( () => {
        setLoanding(false)
        setGetWeather(res.data)
      }, 100))
      .catch( err => console.log(err))
    }
    },[coords])
    console.log(getWeather)
    const handleBtn = () => setchangeMesure(!changeMeasure)
    const celcius = getWeather?.main.temp - 273.15
    const fahrenheit = celcius*(9/5)+32

    const Loanding = () => {

        return (
            <div className="container-principal-ld">
              <h1></h1>
              <h2></h2>
              <div className='container-btn-ld'>
                
              </div>
              <div className='container-second-ld'>
                <h3 className='description-ld'></h3>
                  <ul className='list-ld'>
                  </ul>
              </div>
            </div>
          )
    }

    if(loanding){
        return(
            <Loanding />
        )
        
    } else{
    return (
        <div className="container-principal">
          <h1>Weather App</h1>
          <h2>{`${getWeather?.name}, ${getWeather?.sys.country}`}</h2>
          <div className='container-btn'>
            <div className='container-btn-temp'>
                <h3 className='messure'>
                    {
                    (changeMeasure)?
                    `${Math.round(fahrenheit)}°`
                    :
                    `${Math.round(celcius)}°`
                    }
                </h3>
                <div className='container-img'>
                     <img src={`http://openweathermap.org/img/wn/${getWeather?.weather[0].icon}@2x.png`}/>
                </div>
            </div>
            <button onClick={handleBtn}><b>{(changeMeasure)? "Change °C" : "Change °F"}</b></button>
          </div>
          <div className='container-second'>
            <h3 className='description'><b>"{`${getWeather?.weather[0].description}`}"</b></h3>
              <ul className='list'>
                <li className='1'><img src='..//assets/vent (3).png'/><h4>Wind speed <br/>{`${getWeather?.wind.speed}`} m/s</h4></li>
                <li className='2'><img src='..//assets/cloud-computing (1).png'/><h4> Clouds <br/>{`${getWeather?.clouds.all}`} %</h4></li>          
                <li className='li3'><img src='..//assets/resilience.png'/><h4> Pressure <br/> {`${getWeather?.main.pressure}`} mb</h4></li>
              </ul>
          </div>
          
        </div>
      )}
}

export default CardWeather