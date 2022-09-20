import React, { useState, useEffect } from "react"
import { start } from "repl"
import "./style.css"

//Importing the birds component
import Birds from "./Birds"

interface IWeather {
  region: string
}

function firstLetterUppercase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const Weather = (param: IWeather) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [climate, setClimate] = useState({
    temperature: "",
    description: "",
    iconUri: "",
    humidity: "",
    visibility: "",
    windSpeed: "",
  })

  //Coordinates used for the Birds component
  const [coords, setCoords] = useState({
    lon: "",
    lat: "",
  })

  const key = "f57e16dd03bb490408e2f4f8b485e456"
  const uri = `http://api.openweathermap.org/data/2.5/weather?q=${param.region}&APPID=${key}`

  useEffect(() => {
    const callAPI = () => {
      setError(false)
      setLoading(true)
      fetch(uri)
        .then((response) => response.json())
        .then((apiData) => {
          const Coordinates = {
            lon: apiData.coord.lon,
            lat: apiData.coord.lat,
          }
          setCoords(Coordinates)

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
          setLoading(false)
        })
        .catch((err) => {
          console.log("ERROR: " + err)
          setError(true)
          setLoading(false)
        })
    }

    callAPI()
    const interval = setInterval(() => {
      callAPI()
    }, 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [uri])

  return (
    <div style={{ width: "100%", height: "fit-content", display: "flex" }}>
      {param.region === "" ? (
        <div className="card">Please enter name of the region</div>
      ) : loading ? (
        <div className="card">Loading, please wait...</div>
      ) : error ? (
        <div className="card">
          Something went wrong, try again. Please check name of region
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <WeatherCard
            temperature={climate.temperature}
            description={climate.description}
            iconUri={climate.iconUri}
            humidity={climate.humidity}
            visibility={climate.visibility}
            windSpeed={climate.windSpeed}
            region={param.region}
            lon={coords.lon}
            lat={coords.lat}
          />
        </div>
      )}
    </div>
  )
}

interface IWeatherCard {
  temperature: string
  description: string
  iconUri: string
  humidity: string
  visibility: string
  windSpeed: string
  region: string
  lon: string
  lat: string
}

const WeatherCard = (params: IWeatherCard) => {
  return (
    <span>
      <h2 className="card" style={{ marginBottom: "0" }}>
        {firstLetterUppercase(params.region.toLowerCase())}
      </h2>
      <div style={{ display: "flex", margin: "auto", width: "fit-content" }}>
        <div className="card" style={{ margin: "20px 10px 0 0" }}>
          <img src={params.iconUri} alt="Current Weather" />
          <p
            style={{ margin: "auto", fontSize: "larger", width: "fit-content" }}
          >
            {params.description}
          </p>
          <ul className="weatherList">
            <li>Temperature: {params.temperature}</li>
            <li>Humidity: {params.humidity}</li>
            <li>Visibility: {params.visibility}</li>
            <li>Wind speed: {params.windSpeed}</li>
          </ul>
        </div>
        <Birds regionCode={params.region} lon={params.lon} lat={params.lat} />
      </div>
    </span>
  )
}

export default Weather
