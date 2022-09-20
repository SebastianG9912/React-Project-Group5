import React, { useState } from "react"
import { Weather, Header } from "../components"

const WeatherBird = () => {
  const [region, setRegion] = useState("")

  return (
    <div>
      <Header />
      <div
        className="inputBtn"
        style={{ margin: "auto", marginTop: "50px", transform: "scale(1.3)" }}
      >
        <input
          type="text"
          id="regionText"
          placeholder="City, County, Country"
        />
        <button
          onClick={() => {
            const regionTextField = document.getElementById(
              "regionText"
            ) as HTMLInputElement
            setRegion(regionTextField.value)
          }}
        >
          Click
        </button>
      </div>

      <Weather region={region} />
    </div>
  )
}

export default WeatherBird
