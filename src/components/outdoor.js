import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper, Polyline} from 'google-maps-react';
import { locations } from "../data/Locations"
import mapStyle from "../data/mapStyle.json" 
import axios from 'axios'; 
import App from './indoor';
import curMark from '../data/greenPin.png'


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
    currentLat: 0,
    currentLng: 0,
    show: true,
  };

  getRoute(){
    axios.get(`https://maps.googleapis.com/maps/api/directions/json?destination="`+this.state.destinationLat+`,`+this.state.destinationLng+`"&origin="`+this.state.originLat+`,`+this.state.originLng+`"&mode=walking&key=AIzaSyBtX-ubyw8TF5OeJUcP_YccaTEI9eDs3Og`)
      .then(res =>
        this.setState({
          directions: res.data.routes[0].legs[0].steps
        })
      )
  }


  buildRoute(){
    var tempRoute = []
    tempRoute.push(this.state.directions[0].start_location)

    for (const step in this.state.directions){
      tempRoute.push(this.state.directions[step].end_location)
    }

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
      return <App />
    return null
  }

  render() {
    console.log(this.state.currentLat, this.state.currentLng)
    if (this.state.directions != null){
      this.buildRoute();
    }
    return (
        <Map
          id="58f3d0b518e303d3"
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
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBtX-ubyw8TF5OeJUcP_YccaTEI9eDs3Og'
})(MapContainer);
