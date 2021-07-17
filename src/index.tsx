import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Page from "./components/page"
import persistPlayerState from "./persist-player-state"
import reportWebVitals from "./reportWebVitals"

persistPlayerState()

ReactDOM.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
  document.getElementById("root")
)

// Set the height properly on mobile
function resetHeight() {
  const actualVh = window.innerHeight * 0.01
  document.documentElement.style.setProperty("--vh", `${actualVh}px`)
}
resetHeight()

// possibly do this, and probably should be debounced
// window.addEventListener('resize', resetHeight)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
