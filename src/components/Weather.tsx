import React, { useState, useEffect } from "react"

interface IWeather {
  country: string
}

const Weather = (param: IWeather) => {
  const [temperature, setTemperature] = useState(Number)
  const [climate, setClimate] = useState([])

  const key = "f57e16dd03bb490408e2f4f8b485e456"
  const uri = `http://api.openweathermap.org/data/2.5/weather?q=${param.country}&APPID=${key}`

  useEffect(() => {
    fetch(uri)
      .then((response) => response.json())
      .then((apiData) => {
        const kelvTemp = apiData.main.temp
        const celcTemp = Math.round((kelvTemp - 272.15) * 10) / 10
        setTemperature(celcTemp)
      })
      .catch((err) => {
        console.log("ERROR: " + err)
      })
  }, [uri, temperature])
  return <div>{temperature}</div>
}

export default Weather
