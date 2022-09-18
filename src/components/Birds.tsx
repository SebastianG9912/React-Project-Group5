import React, { useState, useEffect } from "react"

interface Ilocation {
    regionCode: string,
    lon: string,
    lat: string
}
interface IBirdArray {
    comName: string,
    speciesCode: string
}

const Birds = (param: Ilocation) => {
// const [uri, setUri] = useState(`https://api.ebird.org/v2/data/obs/${param.regionCode}/recent`)
const uri = `https://api.ebird.org/v2/data/obs/geo/recent?lat=${param.lat}&lng=${param.lon}`
const [jsonResponse, setJsonResponse] = useState([])
const [commonBirdList, setCommonBirdList] = useState([""])

useEffect(() => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('X-eBirdApiToken', 'u144726esb0d')
    const callAPI = () => {
        fetch(uri, {headers: requestHeaders})
        .then((response) => response.json())
        .then((json) => setJsonResponse(json))
        .catch((err) => {
            console.log("ERROR: " + err)
          })
    }
    callAPI()
}, [uri])

useEffect(() => {
    console.log(jsonResponse)
    jsonResponse.sort((a, b) => b["howMany"] - a["howMany"])
    jsonResponse.forEach(bird => console.log(bird['howMany']));
    const tmpArr = jsonResponse.slice(0, 5).map(a => a["comName"])

    setCommonBirdList(tmpArr)
}, [jsonResponse])


const birdList = commonBirdList.map((comName) => <li>{comName}</li>)

return (
    <div>
        <p>Common Birds:</p>
        <ul style={{listStyle:"none", marginLeft:"-2rem"}}>
            {birdList}
        </ul>
    </div>
)
}



// const CommonBirdList = (param: IBirdArray) => {
//     const birdList = param.birds.map(( comName ) => 
//         <li>{comName}</li>
//     )
//     return(
//         <ul>
//             {birdList}
//         </ul>
//     )
// }

export default Birds