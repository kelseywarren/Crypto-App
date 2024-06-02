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
          <div>
            <span><p key={index}>{crypto.cmc_rank} {crypto.name} {crypto.symbol} ${crypto.quote.USD.price}</p></span>
          </div>
        )
      })}
    </div>
    
  )
}

export default App
