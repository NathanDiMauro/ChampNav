import React from 'react';
import floorplan from '../floorPlans/ccmNodetest.svg'
import '../styles/App.css';
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

class Indoor extends React.Component {
  componentDidMount() {
    this.closeInteriorMap();
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

    var closeIntDisplay = document.getElementById("interior-button-close");
    closeIntDisplay.addEventListener("click", this.closeInteriorMap)
    var openIntDisplay = document.getElementById("debugOpenIntDisplay")
    openIntDisplay.addEventListener("click", this.openInteriorMap)
  
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
    var currentMap = document.getElementById("interior-map-transform-box");
    var zoomSlider = document.getElementById("myRange");
    var currentLoc = document.getElementById("interior-curent-loc");

    currentMap.style.transform = "scale(" + zoomSlider.value + "%)"
    currentLoc.style.transform = "scale(" + zoomSlider.value + "%)"
  }

  closeInteriorMap() {
    var interiorDisplay = document.getElementById("interior-map-container");
    var showDisplay = document.getElementById("debugOpenIntDisplay");

    interiorDisplay.style.visibility = "hidden"
    showDisplay.style.visibility = "visible"
    showDisplay.style.zIndex = 11
  }

  openInteriorMap() {
    var interiorDisplay = document.getElementById("interior-map-container");
    var showDisplay = document.getElementById("debugOpenIntDisplay");

    interiorDisplay.style.visibility = "visible"
    showDisplay.style.visibility = "hidden"
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">

        <div id="debugOpenIntDisplay">OPEN INTERIOR MAP</div>

        <div id="interior-map-container">

          <div id="interior-button-close">X</div>
          <div id="interior-button-follow"></div>
          <div id="interior-button-settings"></div>

          <div id="slider-container">
            <div class="slidecontainer">
              <input type="range" min="50" max="200" defaultValue="100" class="slider" id="myRange"/>
            </div>
          </div>

          <div id="interior-title">CCM Floor 2</div>
          <div id="interior-curent-loc"></div>

          <div id="interior-map-transform-box">
            <img id="interior-map" usemap="#workmap" src= {floorplan}/>
            
            <map id="testMap" name="workmap">
              <area shape="circle" coords="145.25003,193.66672,3.1576095" alt="Cup of coffee" href="https://coltmagri.com/"/>
            </map>

          </div>

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

        {/* <AstarComponent /> */}
      </div>
    );
  }
}
export default Indoor;
