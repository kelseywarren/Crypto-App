import React, { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/api")
    .then(response => response.json())
    .then(data => {
      console.log(data.data[0].name)
      setBackendData(data.data)
    })
  }, [])

  return (
    <div>
      {backendData.map((crypto, index) => {
        return (
          <div className="cryptoContainer">
            <span>
              <p className="card" key={index}><span className="rank">{crypto.cmc_rank}</span> {crypto.name} {crypto.symbol} ${(crypto.quote.USD.price).toLocaleString(undefined, {minimumFractionDigits: 6})}</p>
              </span>
          </div>
        )
      })}
    </div>
    
  )
}

export default App
