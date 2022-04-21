import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper, Polyline} from 'google-maps-react';
import { locations } from "../data/Locations"
import mapStyle from "../data/mapStyle.json" 
import axios from 'axios'; 
import App from './indoor';
import curMark from '../data/greenPin.png'
import "../styles/outdoor.css"


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {},         // Shows the InfoWindow to the selected place upon a marker
    originLat: null,
    originLng: null,
    destinationLat: null,
    destinationLng: null,
    directions: null,
    route: null,
    room: null,
    building: null,
    currentLat: 0,
    currentLng: 0,
    show: false,
  };

  constructor(props) {
    super(props);
    this.setRoute = this.setRoute.bind(this)
    this.onCloseHandler = this.onCloseHandler.bind(this)
  }

  getRoute() {
    console.log('dlat', this.state.destinationLat)
    console.log('dlng', this.state.destinationLng)

    if (this.state.destinationLat == "44.47327567286289" && this.state.destinationLng == "-73.20589387668262"){
      console.log("Offline Route")
      this.setState({
        route: [{lat: 44.4733761, lng: -73.2030435},
                {lat: 44.4733338, lng: -73.20336},
                {lat: 44.4733934, lng: -73.20345180000001},
                {lat: 44.4735258, lng: -73.2034491},
                {lat: 44.4735234, lng: -73.2035009},
                {lat: 44.4736017, lng: -73.2035083},
                {lat: 44.4735969, lng: -73.20376040000001},
                {lat: 44.4739993, lng: -73.2037912},
                {lat: 44.47392079999999, lng: -73.2059774},
                {lat: 44.4733386, lng: -73.20593029999999}]
      })
    }
    else if (this.state.destinationLat == "44.473198780008346" && this.state.destinationLng == "-73.20450179833591"){
      console.log("Offline Route")
      this.setState({
        route: [{lat: 44.4733392, lng: -73.2058962},
                {lat: 44.473351, lng: -73.20542739999999},
                {lat: 44.47280200000001, lng: -73.2048892},
                {lat: 44.4731185, lng: -73.204954},
                {lat: 44.4732084, lng: -73.2046254},
                {lat: 44.4732017, lng: -73.2044982}]
      })
    }
    else {
      axios.get(`https://maps.googleapis.com/maps/api/directions/json?destination="`+this.state.destinationLat+`,`+this.state.destinationLng+`"&origin="`+this.state.originLat+`,`+this.state.originLng+`"&mode=walking&key=AIzaSyBtX-ubyw8TF5OeJUcP_YccaTEI9eDs3Og`)
        .then(res =>
          this.setState({
            directions: res.data.routes[0].legs[0].steps
          })
        )
    }
  }


  buildRoute(){
    var tempRoute = []
    tempRoute.push(this.state.directions[0].start_location)

    for (const step in this.state.directions){
      tempRoute.push(this.state.directions[step].end_location)
    }

    console.log(tempRoute)

    this.setState({
      directions: null,
      route: tempRoute
    })
  }

  markerHandler(props, marker){
    if (this.state.originLat != null && this.state.destinationLat != null){
      this.setState({
        originLat: null,
        originLng: null,
        destinationLat: null,
        destinationLng: null,
        route: null,
        show: false,
      })
    }
    if (this.state.originLat == null){
      this.setState({
        originLat: parseFloat(props.position.lat),
        originLng: parseFloat(props.position.lng),
      })
    }
    else if (this.state.destinationLat == null){
      this.setState({
        destinationLat: parseFloat(props.position.lat),
        destinationLng: parseFloat(props.position.lng),
        show: true
      })
      this.getRoute()
    }
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onMarkerClick = (props, marker) => this.markerHandler(props, marker)

  onCloseHandler(props){
    if (this.state.originLat != null && this.state.destinationLat != null){
      this.setState({
        originLat: null,
        originLng: null,
        destinationLat: null,
        destinationLng: null,
        route: null,
        show: false,
      })
    }
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  onClose = props => this.onCloseHandler(props)


  _mapLoaded(mapProps, map) {
    map.setOptions({
       styles: mapStyle
    })
 }

 checkStop() {
   if (this.state.currentLat == this.state.destinationLat && this.state.currentLng == this.state.destinationLng){
     this.setState({show: true})
   }
 }

 getCurrentLocation() {
  console.log("setting current location")
  navigator.geolocation.getCurrentPosition((position) => {
    this.setState({
      currentLat: position.coords.latitude,
      currentLng: position.coords.longitude
    })
  })
  this.checkStop();
 }
  
  componentDidMount() {
    this.getCurrentLocation();
  }

  showIndoor(){
    if (this.state.show)
      return <App onCloseHandler={this.onCloseHandler} building={this.state.building}/>
    return null
  }

  setRoute() {
    let destination = document.getElementById("building").value;
    let roomNum = document.getElementById("roomNum").value;
    var dLat, dLng;

    switch (destination) {
      case 'CCM':
        dLat = locations.CCM.lat;
        dLng = locations.CCM.lng;
        break;
      case 'Perry':
        dLat = locations.Perry.lat;
        dLng = locations.Perry.lng;
        break;
      case 'Ireland':
          dLat = locations.Ireland.lat;
          dLng = locations.Ireland.lng;
          break;
      case 'Joyce':
        dLat = locations.Joyce.lat;
        dLng = locations.Joyce.lng;
        break;
      case 'Freeman':
        dLat = locations.Freeman.lat;
        dLng = locations.Freeman.lng;
        break;
      case 'IDX':
        dLat = locations.IDX.lat;
        dLng = locations.IDX.lng;
        break;
      case 'Foster':
        dLat = locations.Foster.lat;
        dLng = locations.Foster.lng;
        break;
      case 'MIC':
        dLat = locations.MIC.lat;
        dLng = locations.MIC.lng;
        break;
      case 'Aiken':
        dLat = locations.Aiken.lat;
        dLng = locations.Aiken.lng;
        break;
      case 'West':
        dLat = locations.West.lat;
        dLng = locations.West.lng;
        break;
    }
    
    console.log('dlat1', dLat)
    console.log('dlng1', dLng)
    this.setState({
      originLat: this.state.currentLat,
      originLng: this.state.currentLng,
      destinationLat: parseFloat(dLat),
      destinationLng: parseFloat(dLng),
      room: roomNum,
      building: destination,
      show: true
    }, this.getRoute )
  }

  showRouteMenu() {
    if (!this.state.show)
      return( 
      <div id="input">
        <select name="building" id="building">
          <option value="none" selected disabled hidden></option>
          <option value="CCM">CCM</option>
          <option value="Perry">Perry</option>
          <option value="Ireland">Ireland</option>
          <option value="Joyce">Joyce</option>
          <option value="Freeman">Freeman</option>
          <option value="IDX">IDX</option>
          <option value="MIC">MIC</option>
          <option value="Aiken">Aiken</option>
          <option value="West">West</option>
        </select>

        <input id="roomNum"></input>
        <button id="routeButton" onClick={this.setRoute}>Route</button>
      </div>)
    return null
  }

  render() {
    console.log(this.state.currentLat, this.state.currentLng)
    if (this.state.directions != null){
      this.buildRoute();
    }
    return (
      <div>
        <Map
          id="map"
          google={this.props.google}
          zoom={18.45}
          initialCenter={
            {
              lat: 44.47322749043961,
              lng: -73.20418379908438
            }
          }
          onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
        >
          <Marker
            position={{lat: this.state.currentLat, lng: this.state.currentLng}}
            onClick={this.onMarkerClick}
            icon={{
              url: curMark,
            }}
            name="Current Location"
          />
          <Marker
            position={{lat: locations.CCM.lat, lng: locations.CCM.lng}}
            onClick={this.onMarkerClick}
            name={locations.CCM.name}
          />
          <Marker
            position={{lat: locations.Perry.lat, lng: locations.Perry.lng}}
            onClick={this.onMarkerClick}
            name={locations.Perry.name}
          />
          <Marker
            position={{lat: locations.Ireland.lat, lng: locations.Ireland.lng}}
            onClick={this.onMarkerClick}
            name={locations.Ireland.name}
          />
          <Marker
            position={{lat: locations.Joyce.lat, lng: locations.Joyce.lng}}
            onClick={this.onMarkerClick}
            name={locations.Joyce.name}
          />
          <Marker
            position={{lat: locations.Freeman.lat, lng: locations.Freeman.lng}}
            onClick={this.onMarkerClick}
            name={locations.Freeman.name}
          />
          <Marker
            position={{lat: locations.IDX.lat, lng: locations.IDX.lng}}
            onClick={this.onMarkerClick}
            name={locations.IDX.name}
          />
          <Marker
            position={{lat: locations.Foster.lat, lng: locations.Foster.lng}}
            onClick={this.onMarkerClick}
            name={locations.Foster.name}
          />
          <Marker
            position={{lat: locations.MIC.lat, lng: locations.MIC.lng}}
            onClick={this.onMarkerClick}
            name={locations.MIC.name}
          />
          <Marker
            position={{lat: locations.Aiken.lat, lng: locations.Aiken.lng}}
            onClick={this.onMarkerClick}
            name={locations.Aiken.name}
          />
          <Marker
            position={{lat: locations.West.lat, lng: locations.West.lng}}
            onClick={this.onMarkerClick}
            name={locations.West.name}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
          <Polyline
            path={this.state.route}
            strokeColor="#FF0000"
            strokeOpacity={0.8}
            strokeWeight={2} 
          />
          {this.showIndoor()}
          {this.showRouteMenu()}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBtX-ubyw8TF5OeJUcP_YccaTEI9eDs3Og'
})(MapContainer);
