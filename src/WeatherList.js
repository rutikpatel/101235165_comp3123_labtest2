import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function App(){
  
  const [data, setData] = useState([]);
  const [city, setCity] = useState('toronto')
  const apiData = async () =>{
  
   //const api = 'a6e125fb1106bdf660a722513e644e3b'
    const api = '6a5d69a68de78bb14d0a82afd064f3e0'
    //const api = '3e0927d5a13dcc4deaa2653db2c19ad5'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`
    const req = axios.get(url);
    const res = await req;
    setData({
      desc:res.data.weather[0].description,
      temp: res.data.main.temp,
      city: res.data.name,
      icon: res.data.weather[0].icon,
    })
  }
  
  const readInput = (event)=>{
    setCity(event.target.value)
  }

  const submitData = (event)=>{
    event.preventDefault()
}
  
  const iconUrl = `http://openweathermap.org/img/wn/${data.icon}@2x.png`

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let today = new Date();
  let dayName = days[today.getDay()]
  let mm = monthNames[today.getMonth()]
  let dd = today.getDate()
  let yy = today.getFullYear()

  let d =  mm+" "+dd+" ," + yy;

  //Converting K to C
  let K = data.temp;
  let C = K - 273.15

  useEffect(()=>{
    apiData()
  },[city])
    return (
        <>
        
        <div className='container'>
          <div>
            <p className='day'>{dayName}</p>
            <h1>{data.desc}</h1><br/>
          </div>
          <div id='div' className='section'>
            <div>
              <img src={iconUrl} alt="weather"/>
            </div>
            <div></div>
            <div><p className='temp'>{C.toFixed(1)}</p></div>
            <div><p className='c'>&#8451;</p></div>
          </div>
          <div className='loc'>
            <h4>{d}</h4>
            <h4>{data.city}</h4>
          </div> 
        </div>
        <form className='search' onSubmit={submitData}>
          <br/>
            <input id ='city' type='text' placeholder='city'onChange={readInput}/><br/>
        </form>
        
      </>
    )
  }
