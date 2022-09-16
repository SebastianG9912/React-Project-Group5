import React, { useState, useEffect } from "react"
import { start } from "repl"
import "./style.css"

interface IWeather {
  city: string
}

function firstLetterUppercase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const Weather = (param: IWeather) => {
  const [climate, setClimate] = useState({
    temperature: "",
    description: "",
    iconUri: "",
    humidity: "",
    visibility: "",
    windSpeed: "",
  })

  const key = "f57e16dd03bb490408e2f4f8b485e456"
  const uri = `http://api.openweathermap.org/data/2.5/weather?q=${param.city}&APPID=${key}`

  useEffect(() => {
    const callAPI = () => {
      fetch(uri)
        .then((response) => response.json())
        .then((apiData) => {
          const tempK = apiData.main.temp
          const WeatherTempC =
            Math.round((tempK - 272.15) * 10) / 10 + "\u00B0C"

          const weatherDesc = firstLetterUppercase(
            apiData.weather[0].description
          )
          const weatherIcon = `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`
          const weatherHumidity = apiData.main.humidity + "%"
          const weatherVisibility = apiData.visibility + "m"
          const weatherWindSpeed = apiData.wind.speed + "m/s"

          const weatherInfo = {
            temperature: WeatherTempC,
            description: weatherDesc,
            iconUri: weatherIcon,
            humidity: weatherHumidity,
            visibility: weatherVisibility,
            windSpeed: weatherWindSpeed,
          }

          setClimate(weatherInfo)
        })
        .catch((err) => {
          console.log("ERROR: " + err)
        })
    }

    callAPI()
    const interval = setInterval(() => {
      callAPI()
    }, 60000)

    return () => clearInterval(interval)
  }, [uri])

  return (
    <WeatherCard
      temperature={climate.temperature}
      description={climate.description}
      iconUri={climate.iconUri}
      humidity={climate.humidity}
      visibility={climate.visibility}
      windSpeed={climate.windSpeed}
      city={param.city}
    />
  )
}

interface IWeatherCard {
  temperature: string
  description: string
  iconUri: string
  humidity: string
  visibility: string
  windSpeed: string
  city: string
}

const WeatherCard = (params: IWeatherCard) => {
  return (
    <div
      className="card"
      style={{
        color: "black",
      }}
    >
      <h2 style={{ marginBottom: "0" }}>{params.city}</h2>
      <img src={params.iconUri} alt="Current Weather" />
      <p style={{ margin: "auto", fontSize: "larger", width: "fit-content" }}>
        {params.description}
      </p>
      <ul className="weatherList">
        <li>Temperature: {params.temperature}</li>
        <li>Humidity: {params.humidity}</li>
        <li>Visibility: {params.visibility}</li>
        <li>Wind speed: {params.windSpeed}</li>
      </ul>
    </div>
  )
}

export default Weather
