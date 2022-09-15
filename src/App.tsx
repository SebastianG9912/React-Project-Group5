import React from "react"
import "./App.css"
import { Link } from "react-router-dom"
import { Weather } from "./components"

function App() {
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
        <Weather country="London" />
      </header>
    </div>
  )
}

export default App
