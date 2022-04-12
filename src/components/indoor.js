import React, { useState } from 'react';
import '../styles/App.css';
import AstarComponent from './astarComponent.js' 

// floor plan imports
// CCM
import CCM1 from '../floorPlans/CCM/A1-CCM.svg'
import CCM2 from '../floorPlans/CCM/A2-CCM.svg'
import CCM3 from '../floorPlans/ccmNodetest.svg'
import CCM4 from '../floorPlans/CCM/A4-CCM.svg'
import CCM5 from '../floorPlans/CCM/A5-CCM.svg'
import CCM6 from '../floorPlans/CCM/A6-CCM.svg'
//Aiken
import Aiken1 from '../floorPlans/Aiken/A1-Aiken.svg'
import Aiken2 from '../floorPlans/Aiken/A1-Aiken.svg'
//Freeman
import Freeman1 from '../floorPlans/Freeman/A1-Freeman Hall.svg'
import Freeman2 from '../floorPlans/Freeman/A2-Freeman Hall.svg'
import Freeman3 from '../floorPlans/Freeman/A3-Freeman Hall.svg'
//IDX
import IDX1 from '../floorPlans/IDX/A1-SLCenter.svg'
import IDX2 from '../floorPlans/IDX/A2-SLCenter.svg'
import IDX3 from '../floorPlans/IDX/A3-SLCenter.svg'
//Ireland
import Ireland1 from '../floorPlans/Ireland/A1-SDIreland.svg'
import Ireland2 from '../floorPlans/Ireland/A2-SDIreland.svg'
import Ireland3 from '../floorPlans/Ireland/A3-SDIreland.svg'
//Joyce
import Joyce1 from '../floorPlans/Joyce/A1-Joyce.svg'
import Joyce2 from '../floorPlans/Joyce/A2-Joyce.svg'
import Joyce3 from '../floorPlans/Joyce/A3-Joyce.svg'
//MIC
import MIC1 from '../floorPlans/MIC/A1-Miller.svg'
import MIC2 from '../floorPlans/MIC/A2-Miller.svg'
import MIC3 from '../floorPlans/MIC/A3-Miller.svg'
import MIC4 from '../floorPlans/MIC/A4-Miller.svg'
import MIC5 from '../floorPlans/MIC/A5-Miller.svg'
//Perry
import Perry1 from '../floorPlans/Perry/A1-Perry.svg'
import Perry2 from '../floorPlans/Perry/A2-Perry.svg'
import Perry3 from '../floorPlans/Perry/A3-Perry.svg'
//West
import West1 from '../floorPlans/West/A1-West.svg'
import West2 from '../floorPlans/West/A2-West.svg'
import West3 from '../floorPlans/West/A3-West.svg'

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

function drawNodes() {

  var mapCanvas = document.getElementById("nodesCanvas");
  var mapCanvasBox = document.getElementById("nodesCanvas-transform-box");
  var currentMap = document.getElementById("interior-map");

  mapCanvas.width = currentMap.width;
  mapCanvas.height = currentMap.height;
  mapCanvasBox.width = currentMap.width;
  mapCanvasBox.height = currentMap.height;

  const c = mapCanvas.getContext('2d')

  c.fillStyle = 'blue'

  c.lineWidth = 5
  c.beginPath()
  c.arc(145.25003, 193.66672, 10, 0, Math.PI * 2)

  c.fill()
}

class Indoor extends React.Component {

  state = {
    displayedFloor: null,
    count: 0,
    nodeXCoords: [],
    nodeYCoords: []
  };

  constructor(props) {
    super(props);
    this.changeFloor = this.changeFloor.bind(this)
    this.readNodeData = this.readNodeData.bind(this)
    this.openInteriorMap = this.openInteriorMap.bind(this)
    
  }

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

    var mapCanvas = document.getElementById("nodesCanvas");
    var mapCanvasBox = document.getElementById("nodesCanvas-transform-box");

    mapCanvas.width = currentMap.width;
    mapCanvas.height = currentMap.height;
    mapCanvasBox.width = currentMap.width;
    mapCanvasBox.height = currentMap.height;

    displayCoords()
    //drawNodes()
    this.readNodeData()
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

    //drawNodes()
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

    var mapCanvas = document.getElementById("nodesCanvas");
    var mapCanvasBox = document.getElementById("nodesCanvas-transform-box");
    var currentMap = document.getElementById("interior-map");
  
    mapCanvas.width = currentMap.width;
    mapCanvas.height = currentMap.height;
    mapCanvasBox.width = currentMap.width;
    mapCanvasBox.height = currentMap.height;

    interiorDisplay.style.visibility = "visible"
    showDisplay.style.visibility = "hidden"

    this.readNodeData()
    console.log("CANVAS DATA:")
    console.log("Canvas W: " + mapCanvas.width + " H: " + mapCanvas.height)
    console.log("Map W: " + currentMap.width + " H: " + currentMap.height)
  }

  readNodeData() {

    var mapCanvas = document.getElementById("nodesCanvas");
    var mapCanvasBox = document.getElementById("nodesCanvas-transform-box");
    var currentMap = document.getElementById("interior-map");

    mapCanvas.width = currentMap.width;
    mapCanvas.height = currentMap.height;
    mapCanvasBox.width = currentMap.width;
    mapCanvasBox.height = currentMap.height;

    fetch('/ccmNodetest.svg')
    .then(response => response.text())
    .then(data => {
  
      var nodesArrayX = []
      var nodesArrayY = []
      var nodesArrayPaths = []
      init()
  
      //PARSE DATA
      var nodeDataLines = data.split("\n")
      var nodeDataStart = nodeDataLines.findIndex(element => element.includes("inkscape:label=\"NODES\""))
      nodeDataLines.splice(0,nodeDataStart)
  
      var nodeCount = 0;
  
      nodeDataLines.forEach(element => {
        if (element === nodeDataLines[1]) {
          nodeCount += 1;
        }
      });
  
      var parseLineCount = 1
      nodeDataLines.forEach(element => {
        if (element === nodeDataLines[1]) {
          var tempXCoord = ""
          tempXCoord = nodeDataLines[parseLineCount + 3]
          tempXCoord = tempXCoord.substring(11)
          tempXCoord = tempXCoord.slice(0,-2)
          nodesArrayX.push(tempXCoord)
  
          var tempYCoord = ""
          tempYCoord = nodeDataLines[parseLineCount + 4]
          tempYCoord = tempYCoord.substring(11)
          tempYCoord = tempYCoord.slice(0,-2)
          nodesArrayY.push(tempYCoord)
          parseLineCount += 6
        }
      });

      parseLineCount = 1
      nodeDataLines.forEach(element => {
        if (element === nodeDataLines[1]) {
          var tempPath = ""
          tempPath = nodeDataLines[parseLineCount + 2]
          tempPath = tempPath.substring(11)
          tempPath = tempPath.slice(0,-1)
          nodesArrayPaths.push(tempPath)

          parseLineCount += 6
        }
      });

      //PARSE DATA

      for (let i = 0; i < nodeCount; i++) {
        const c = mapCanvas.getContext('2d')
    
        c.fillStyle = 'blue'
      
        c.lineWidth = 1
        c.beginPath()
        c.arc(nodesArrayX[i], nodesArrayY[i], 5, 0, Math.PI * 2)
      
        c.fill()
      }

      //Draw Paths
      for (let i = 0; i < nodeCount; i++) {
        var currentPath = nodesArrayPaths[i]
        var pathStartID = currentPath.split("-")[0]
        var pathConnections = currentPath.split("-").length - 1;
        var connectingNodes = []
        var pathParse = 0
        for (let i = 0; i < pathConnections; i++) {
          pathParse += 2
          connectingNodes.push(currentPath.charAt(pathParse))
        }

        for (let i = 0; i < pathConnections; i++) {
          const c = mapCanvas.getContext('2d')
          c.beginPath()
          c.moveTo(nodesArrayX[pathStartID], nodesArrayY[pathStartID]);
          c.lineTo(nodesArrayX[connectingNodes[i]], nodesArrayY[connectingNodes[i]])
          c.closePath()
          c.stroke()
        }
      }
  
      this.setState({
        nodeXCoords: nodesArrayX,
        nodeYCoords: nodesArrayY
      })
  
    });
  
    function init() {
    }
  
  }

  changeFloor() {
    console.log("Building", this.props.building)
    switch(this.props.building) {
      case "Aiken":
        switch(parseInt(document.getElementById("interior-title").value)){
          case 1: this.setState({displayedFloor: Aiken1}); break;
          case 2: this.setState({displayedFloor: Aiken2}); break;
        }
      break;
      case "CCM":
        switch(parseInt(document.getElementById("interior-title").value)){
          case 1: this.setState({displayedFloor: CCM1}); break;
          case 2: this.setState({displayedFloor: CCM2}); break;
          case 3: this.setState({displayedFloor: CCM3}); break;
          case 4: this.setState({displayedFloor: CCM4}); break;
          case 5: this.setState({displayedFloor: CCM5}); break;
          case 6: this.setState({displayedFloor: CCM6}); break;
        }
      break;
      case "Freeman":
        switch(parseInt(document.getElementById("interior-title").value)){
          case 1: this.setState({displayedFloor: Freeman1}); break;
          case 2: this.setState({displayedFloor: Freeman2}); break;
          case 3: this.setState({displayedFloor: Freeman3}); break;
        }
      break;
      case "IDX":
        switch(parseInt(document.getElementById("interior-title").value)){
          case 1: this.setState({displayedFloor: IDX1}); break;
          case 2: this.setState({displayedFloor: IDX2}); break;
          case 3: this.setState({displayedFloor: IDX3}); break;
        }
      break
      case "Ireland":
        switch(parseInt(document.getElementById("interior-title").value)){
          case 1: this.setState({displayedFloor: Ireland1}); break;
          case 2: this.setState({displayedFloor: Ireland2}); break;
          case 3: this.setState({displayedFloor: Ireland3}); break;
        }
      break
      case "Joyce":
        switch(parseInt(document.getElementById("interior-title").value)){
          case 1: this.setState({displayedFloor: Joyce1}); break;
          case 2: this.setState({displayedFloor: Joyce2}); break;
          case 3: this.setState({displayedFloor: Joyce3}); break;
        }
      break
      case "MIC":
        switch(parseInt(document.getElementById("interior-title").value)){
          case 1: this.setState({displayedFloor: MIC1}); break;
          case 2: this.setState({displayedFloor: MIC2}); break;
          case 3: this.setState({displayedFloor: MIC3}); break;
          case 3: this.setState({displayedFloor: MIC4}); break;
          case 3: this.setState({displayedFloor: MIC5}); break;
        }
      break
      case "Perry":
        switch(parseInt(document.getElementById("interior-title").value)){
          case 1: this.setState({displayedFloor: Perry1}); break;
          case 2: this.setState({displayedFloor: Perry2}); break;
          case 3: this.setState({displayedFloor: Perry3}); break;
        }
      break
      case "West":
        switch(parseInt(document.getElementById("interior-title").value)){
          case 1: this.setState({displayedFloor: West1}); break;
          case 2: this.setState({displayedFloor: West2}); break;
          case 3: this.setState({displayedFloor: West3}); break;
        }
      break
    }  
  }

  showDropdown() {
    console.log(this.props.building);
    if (this.state.count == 0) { 
      switch(this.props.building) {
        case "CCM": this.setState({displayedFloor: CCM1}); break;
        case "Aiken": this.setState({displayedFloor: Aiken1}); break;
        case "Freeman": this.setState({displayedFloor: Freeman1}); break;
        case "IDX": this.setState({displayedFloor: IDX1}); break;
        case "Ireland": this.setState({displayedFloor: Ireland1}); break;
        case "Joyce": this.setState({displayedFloor: Joyce1}); break;
        case "MIC": this.setState({displayedFloor: MIC1}); break;
        case "Perry": this.setState({displayedFloor: Perry1}); break;
        case "West": this.setState({displayedFloor: West1}); break;
      }
      this.setState({count: 1});
    }

    switch(this.props.building){
      case "Aiken":
      case "Foster":
        return(<select id="interior-title" onChange={this.changeFloor}>
          <option value="1">{this.props.building} Floor 1</option>
          <option value="2">{this.props.building} Floor 2</option>
        </select>)
        break;
      case "MIC":
        return(<select id="interior-title" onChange={this.changeFloor}>
          <option value="1">{this.props.building} Floor 1</option>
          <option value="2">{this.props.building} Floor 2</option>
          <option value="3">{this.props.building} Floor 3</option>
          <option value="4">{this.props.building} Floor 4</option>
          <option value="5">{this.props.building} Floor 5</option>
        </select>)
        break;
      case "CCM":
        return(<select id="interior-title" onChange={this.changeFloor}>
          <option value="1">{this.props.building} Floor 1</option>
          <option value="2">{this.props.building} Floor 2</option>
          <option value="3">{this.props.building} Floor 3</option>
          <option value="4">{this.props.building} Floor 4</option>
          <option value="5">{this.props.building} Floor 5</option>
          <option value="6">{this.props.building} Floor 6</option>
        </select>)
        break;
      default: 
        return(<select id="interior-title" onChange={this.changeFloor}>
          <option value="1">{this.props.building} Floor 1</option>
          <option value="2">{this.props.building} Floor 2</option>
          <option value="3">{this.props.building} Floor 3</option>
        </select>)
    }
  }

  render(){
    return (
      <div className="App">
        <data id="nodeData" value="test"></data>
        <header className="App-header">

        <div id="options">
          <div id="debugOpenIntDisplay">OPEN INTERIOR MAP</div>
          <button id="closeButton" onClick={this.props.onCloseHandler}>Clear</button>
        </div>

        <div id="interior-map-container">

          <div id="interior-button-close">X</div>
          <div id="interior-button-follow"></div>
          <div id="interior-button-settings"></div>

          <div id="slider-container">
            <div class="slidecontainer">
              <input type="range" min="2" max="200" defaultValue="100" class="slider" id="myRange"/>
            </div>
          </div>

          {this.showDropdown()}
          <div id="interior-curent-loc"></div>

          <div id="interior-map-transform-box">
            <div id="nodesCanvas-transform-box">
              <canvas id="nodesCanvas" width="400" height="400"></canvas>
            </div>
            <img id="interior-map" src= {this.state.displayedFloor}/>
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
