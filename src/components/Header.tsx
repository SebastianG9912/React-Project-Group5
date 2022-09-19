import React from "react"
import { Link } from "react-router-dom"
import "./style.css"

const Header = () => {
  return (
    <header className="headerWB">
      <nav className="links">
        <Link to="/">Home</Link>
        <Link to="/weatherbird">Birds & Weather</Link>
      </nav>
    </header>
  )
}

export default Header
