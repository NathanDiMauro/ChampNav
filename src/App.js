import logo from './logo.svg';
import floorplan from './ccmfloorplan.svg'
import './App.css';
import AstarComponent from './astarComponent.js' 

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div id="interior-map-container">
        <img id="interior-map" src= {floorplan}/>
      </div>
      <input type="button" id="moveup" class="button" value="Move Up"></input>
      <input type="button" id="movedown" class="button" value="Move Down"></input>
      <input type="button" id="moveleft" class="button" value="Move Left"></input>
      <input type="button" id="moveright" class="button" value="Move Right"></input>
      <p id="current-coords-display">Current Coordinates:</p>
      <p id="current-coords"></p>
      </header>

      <AstarComponent />
    </div>
  );
}

window.onload=function() {
  var btnUp = document.getElementById("moveup");
  btnUp.addEventListener("click", moveUp)
  var btnDown = document.getElementById("movedown");
  btnDown.addEventListener("click", moveDown)
  var btnLeft = document.getElementById("moveleft");
  btnLeft.addEventListener("click", moveLeft)
  var btnRight = document.getElementById("moveright");
  btnRight.addEventListener("click", moveRight)

  var currentMap = document.getElementById("interior-map");
  currentMap.style.transform = "translate(-30px, -500px)"

  displayCoords()
}

function displayCoords() {
  var coordsDisplay = document.getElementById("current-coords");
  var coordsText = "X: "
  coordsText += getXandY()[0]
  coordsText += " Y: "
  coordsText += getXandY()[1]
  coordsDisplay.innerText=coordsText
}

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

function moveUp() {
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

function moveDown() {
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

function moveLeft() {
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

function moveRight() {
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

export default App;
