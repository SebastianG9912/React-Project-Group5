import React, { useState } from "react"
import "./App.css"
import { Link } from "react-router-dom"
import { Weather, Birds } from "./components"

function App() {
  const [region, setRegion] = useState("")
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <Link to="/Route"></Link> */}

        {/*WEATHER IMPLEMANTATION START*/}
        <input type="text" id="regionText" />
        <button
          onClick={() => {
            const regionTextField = document.getElementById(
              "regionText"
            ) as HTMLInputElement
            setRegion(regionTextField.value)
          }}
        >
          click for weather
        </button>
        <Weather region={region} />
        {/*WEATHER IMPLEMANTATION END*/}

        {/*BIRDS IMPLEMENTATION START*/}
        {/* <Birds regionCode={region} /> */}
        {/*BIRDS IMPLEMENTATION END*/}
      </header>
    </div>
  )
}

export default App
