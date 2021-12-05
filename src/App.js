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
      </header>

      <AstarComponent />
    </div>
  );
}

window.onload=function() {
  var btn = document.getElementById("moveup");
  btn.addEventListener("click", moveUp)
}

function moveUp() {
  var currentMap = document.getElementById("interior-map");
  var currentTransform = currentMap.style.transform
  var currentX = ""
  var currentY= ""

  for (let i = 0; i < currentTransform.length; i++) {
    
  }

  currentMap.style.transform = "translate(-50px, -50px)"
}

export default App;
