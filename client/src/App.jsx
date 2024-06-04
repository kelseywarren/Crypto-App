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
      {backendData.map((crypto) => {
        return (
          <div className="cryptoContainer">
              <div className="card" key={crypto.id}>
                <span className="rank">{crypto.cmc_rank}</span><br></br>
                <span>{crypto.name} <span className="symbol">{crypto.symbol}</span> </span><br></br>
                <span className="dollar">$</span>{(crypto.quote.USD.price).toLocaleString(undefined, {minimumFractionDigits: 6})} 
              </div>
          </div>
        )
      })}
    </div>
    
  )
}

export default App
