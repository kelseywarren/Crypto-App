import React, { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [backendData, setBackendData] = useState([]);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/api")
    .then(response => response.json())
    .then(data => {
      console.log(data.data[0].name)
      setBackendData(data.data)
    })
  }, [])

  useEffect(() => {
    fetch("http://localhost:5500/info")
    .then(response => response.json())
    .then(data => {
      console.log(data.BTC[0].logo)
      setInfo(data.BTC[0])
    })
  }, [])

  return (
    <div>
      <img src={info.logo}></img>
      {backendData.map((crypto, index) => {
        return (
          <div>
            <p key={index}>{crypto.name}</p>
            <p key={index}>{crypto.symbol}</p>
            <p key={index}>{crypto.quote.USD.price}</p>
            <p key={index}>{crypto.cmc_rank}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App
