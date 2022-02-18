import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper, Polyline} from 'google-maps-react';
import { locations } from "./Locations"
import mapStyle from "./mapStyle.json" 
import axios from 'axios'; 
import App from './App';

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
  };

  getRoute(){
    // axios.get(`https://maps.googleapis.com/maps/api/directions/json?destination="44.473389263658824,-73.20608314784715"&origin="44.47394816197259,-73.2041640018212"&key=AIzaSyBtX-ubyw8TF5OeJUcP_YccaTEI9eDs3Og`)
    //   .then(res =>
    //     this.setState({
    //       data: res.data
    //     })
    //   )
    this.setState({
      route: [
        {"lat": this.state.originLat, "lng": this.state.originLng},
        {"lat": this.state.destinationLat, "lng": this.state.destinationLng}
      ]
      // [ 
      //   {"lat": 44.47366347350147, "lng": -73.20418545949217},
      //   {"lat": 44.47396347350147, "lng": -73.20418545949217},
      //   {"lat": 44.4739072, "lng": -73.2063915},
      //   {"lat": 44.4735558, "lng": -73.20615289999999},
      //   {"lat": 44.4735558, "lng": -73.20593289999999},
      //   {"lat": 44.4733558, "lng": -73.20593289999999},
      // ]
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
    }
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
    this.getRoute();
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
 
 setOrigin() {
    console.log("Origin Set")
 }

 setDestination(){

 }

  render() {
    console.log("Origin:", this.state.originLat, ",", this.state.originLng)
    console.log("Destination:", this.state.destinationLat, ",", this.state.destinationLng)
    console.log("Route:", this.state.route)
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
          <App />
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBtX-ubyw8TF5OeJUcP_YccaTEI9eDs3Og'
})(MapContainer);
