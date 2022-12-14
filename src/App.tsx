import "./App.css"
import { Header } from "./components"

function App() {
  return (
    <div className="App">
      <Header />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="card"
          style={{
            maxWidth: "500px",
            lineHeight: "1.2em",
            marginRight: "10px",
            marginLeft: "10px",
          }}
        >
          <h1>Birdwatcher</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
            eaque qui ipsam porro modi a et aliquid, vitae ratione tempora
            repellendus incidunt nesciunt hic adipisci. Ullam iure minus itaque
            illum aperiam tempore harum nihil fugiat quibusdam magnam,
            consequuntur incidunt quis eligendi consequatur ipsam facilis hic
            eius dignissimos quas illo voluptatem, soluta ab eaque suscipit. A
            hic quidem amet, earum ut expedita quos aut, libero corrupti quod
            eveniet quasi cum, aperiam debitis repellat asperiores impedit
            voluptates illum quo animi! Nesciunt, cupiditate? A numquam,
            corrupti neque alias, eligendi et delectus cum adipisci totam,
            facere repudiandae iure natus minus. Maiores debitis fugit
            distinctio.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
