import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [data , setData] = useState({})
  const [location, setLocation] = useState('')


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=ee1520bbf4765765d32e4a42754002ee` 

  const searchLocation = (event) =>{
    if(event.key === 'Enter'){
      axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
      })
    }   
  }

  return (
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange={event=>setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text" 
         />
      </div>
      <div className='container'>
        <div className="top">
            <div className="location">
              <p>{data.name}</p>
              <p>{data.sys ? <p>{data.sys.country}</p>:null}</p>
            </div>
            <div className="temp">
              <h1>{data.main?<h1>{((5/9) *((data.main.temp)-32)).toFixed(1)}°C</h1>:null}</h1>
              <h1>{data.main?<h1>{(data.main.temp.toFixed(1))}°F</h1>:null}</h1>
            </div>
            <div className="desciption">
              <p>{data.weather? <p>{data.weather[0].main}</p>:null}</p>
            </div>
        </div>
        {data.name!== undefined && 
        <div className="bottom">
            <div className="feels">
              <p className='bold'>{data.main ? <p className='bold'>{data.main.feels_like}°F</p>:null}</p>
              <p>Feels like</p>
            </div>
            <div className="humidity">
              <p className='bold'>{data.main ? <p className='bold'>{data.main.humidity}%</p>:null}</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className='bold' >{data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p>: null}</p>
              <p>Wind speed</p>
            </div>
        </div>
        }
        
      </div>
     </div>
  );
}

export default App;
