import React, { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5500/api")
    .then(response => response.json())
    .then(data => {
      setBackendData(data)
    })
  }, [])

  return (
    <>
      <p>Crypto App</p>
    </>
  )
}

export default App
