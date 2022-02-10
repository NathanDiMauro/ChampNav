import React from 'react';
import logo from './logo.svg';
import floorplan from './ccmfloorplan.svg'
import './App.css';
import AstarComponent from './astarComponent.js' 

function getXandY() {
  var currentMap = document.getElementById("interior-map");
  var currentTransform = currentMap.style.transform
  currentTransform = currentTransform.substr(9, currentTransform.length - 1)
  var currentX = ""
  var currentY= ""
  var currentChar = ""
  var charCounter = 0
  var currentXInt = 0
  var currentYInt = 0

  while (currentChar != ",") {
    currentChar = currentTransform.charAt(charCounter)
    charCounter += 1
    currentX += currentTransform.charAt(charCounter)
  }
  currentX = currentX.slice(0, -4)
  currentChar = ""
  while (currentChar != ")") {
    currentChar = currentTransform.charAt(charCounter)
    charCounter += 1
    currentY += currentTransform.charAt(charCounter)
  }
  currentY = currentY.slice(0, -3)

  currentXInt = parseInt(currentX)
  currentYInt = parseInt(currentY)

  var finalCoords = [currentXInt, currentYInt]
  return finalCoords
}

function displayCoords() {
  var coordsDisplay = document.getElementById("current-coords");
  var coordsText = "X: "
  coordsText += getXandY()[0]
  coordsText += " Y: "
  coordsText += getXandY()[1]
  coordsDisplay.innerText=coordsText
}

class App extends React.Component {
  componentDidMount() {
    var btnUp = document.getElementById("moveup");
    btnUp.addEventListener("click", this.moveUp)
    var btnDown = document.getElementById("movedown");
    btnDown.addEventListener("click", this.moveDown)
    var btnLeft = document.getElementById("moveleft");
    btnLeft.addEventListener("click", this.moveLeft)
    var btnRight = document.getElementById("moveright");
    btnRight.addEventListener("click", this.moveRight)

    var zoomHandle = document.getElementById("myRange");
    zoomHandle.addEventListener("input", this.testZoom)
  
    var currentMap = document.getElementById("interior-map");
    currentMap.style.transform = "translate(-30px, -500px)"
  
    displayCoords()
  }

  moveUp() {
    var currentMap = document.getElementById("interior-map");
    var finalTransform = "translate("
    var currentCoords = getXandY()
    var currentX = currentCoords[0]
    var currentY = currentCoords[1]

    currentY += 10
    finalTransform += currentX + "px, " + currentY + "px)"

    currentMap.style.transform = finalTransform
    displayCoords()
  }

  moveDown() {
    var currentMap = document.getElementById("interior-map");
    var finalTransform = "translate("
    var currentCoords = getXandY()
    var currentX = currentCoords[0]
    var currentY = currentCoords[1]

    currentY -= 10
    finalTransform += currentX + "px, " + currentY + "px)"

    currentMap.style.transform = finalTransform
    displayCoords()
  }

  moveLeft() {
    var currentMap = document.getElementById("interior-map");
    var finalTransform = "translate("
    var currentCoords = getXandY()
    var currentX = currentCoords[0]
    var currentY = currentCoords[1]

    currentX += 10
    finalTransform += currentX + "px, " + currentY + "px)"

    currentMap.style.transform = finalTransform
    displayCoords()
  }

  moveRight() {
    var currentMap = document.getElementById("interior-map");
    var finalTransform = "translate("
    var currentCoords = getXandY()
    var currentX = currentCoords[0]
    var currentY = currentCoords[1]

    currentX -= 10
    finalTransform += currentX + "px, " + currentY + "px)"

    currentMap.style.transform = finalTransform
    displayCoords()
  }

  testZoom() {
    var currentMap = document.getElementById("interior-map");
    var zoomSlider = document.getElementById("myRange");
    var coordsDisplay = document.getElementById("current-coords");

    currentMap.style.width = zoomSlider.value + "%"
    currentMap.style.height = zoomSlider.value + "%"
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
        <div id="interior-map-container">

          <div id="interior-button-close"></div>
          <div id="interior-button-follow"></div>
          <div id="interior-button-settings"></div>

          <div class="slidecontainer">
            <input type="range" min="1" max="600" defaultValue="300" class="slider" id="myRange"/>
          </div>

          <img id="interior-map" src= {floorplan}/>
        </div>
        <input type="button" id="moveup" class="button" value="Move Up"></input>
        <input type="button" id="movedown" class="button" value="Move Down"></input>

        <ul id="left-right-container">
          <li id="left-right-item"><input type="button" id="moveleft" class="button" value="Move Left"></input></li>
          <li id="left-right-item"><input type="button" id="moveright" class="button" value="Move Right"></input></li>
        </ul>

        <p id="current-coords-display">Current Coordinates:</p>
        <p id="current-coords"></p>
        </header>

        <AstarComponent />
      </div>
    );
  }
}
export default App;
