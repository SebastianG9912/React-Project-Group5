import React, { useState, useEffect } from "react"
import "./style.css"
interface Ilocation {
  regionCode: string
  lon: string
  lat: string
}
interface IBird {
  comName: string
  speciesCode: string
}

interface IBirdArray {
  array: IBird[]
}

const Birds = (param: Ilocation) => {
  const uri = `https://api.ebird.org/v2/data/obs/geo/recent?lat=${param.lat}&lng=${param.lon}`
  const [jsonResponse, setJsonResponse] = useState([])
  const [commonBirdList, setCommonBirdList] = useState<IBirdArray>({
    array: [],
  })

  useEffect(() => {
    const requestHeaders: HeadersInit = new Headers()
    requestHeaders.set("X-eBirdApiToken", "u144726esb0d")
    const callAPI = () => {
      fetch(uri, { headers: requestHeaders })
        .then((response) => response.json())
        .then((json) => setJsonResponse(json))
        .catch((err) => {
          console.log("ERROR: " + err)
        })
    }
    callAPI()
  }, [uri])

  useEffect(() => {
    jsonResponse.sort((a, b) => b["howMany"] - a["howMany"])
    const tmpArr: IBirdArray = {
      array: jsonResponse.slice(0, 5),
    }
    setCommonBirdList(tmpArr)
  }, [jsonResponse])

  return (
    <div className="card">
      <p
        style={{
          margin: "auto",
          fontSize: "larger",
          width: "fit-content",
          paddingTop: "1rem",
        }}
      >
        Common Birds:
      </p>
      <CommonBirdList array={commonBirdList.array} />
    </div>
  )
}

const CommonBirdList = (param: IBirdArray) => {
  const birdList = param.array.map((bird) => (
    <li>
      <a
        href={`https://ebird.org/species/${bird.speciesCode}`}
        target="_blank"
        rel="noreferrer"
      >
        {bird.comName}
      </a>
    </li>
  ))
  return (
    <ul className="weatherList" style={{ marginTop: "0.5rem" }}>
      {birdList}
    </ul>
  )
}

export default Birds
