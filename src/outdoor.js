import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper, Polyline, Polygon } from 'google-maps-react';
import { locations } from "./Locations"
import axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '100%'
};
 

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {},         // Shows the InfoWindow to the selected place upon a marker
    directions: null,
    origin: locations.CCM.latLng,
    destination: locations.Perry.latLng,
    route: null
    // [   
    //   {"lat": 44.47366347350147, "lng": -73.20418545949217},
    //   {"lat": 44.4739072, "lng": -73.2063915},
    //   {"lat": 44.4735558, "lng": -73.20615289999999},
    // ]
  };

  onClickHandler(props, marker){
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      route: [ 
          {"lat": 44.47366347350147, "lng": -73.20418545949217},
          {"lat": 44.47396347350147, "lng": -73.20418545949217},
          {"lat": 44.4739072, "lng": -73.2063915},
          {"lat": 44.4735558, "lng": -73.20615289999999},
          {"lat": 44.4735558, "lng": -73.20593289999999},
          {"lat": 44.4732558, "lng": -73.20593289999999},
          {"lat": 44.47303567286289, "lng": -73.20579387668263}
        ]
    });
  }

  onMarkerClick = (props, marker, e) => this.onClickHandler(props, marker)

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        route: null,
      });
    }
  };

  render() {
    // console.log("origin:", this.state.origin)
    // console.log("destination:", this.state.destination)
    // axios.get(`https://maps.googleapis.com/maps/api/directions/json?destination="44.473389263658824,-73.20608314784715"&origin="44.47394816197259,-73.2041640018212"&key=AIzaSyBtX-ubyw8TF5OeJUcP_YccaTEI9eDs3Og`)
    //   .then(res =>
    //     console.log("Response:", res.data)
    //     // this.state.directions = res.data
    //   )
    // console.log("Directions:", this.state.directions)
    console.log("Route:", this.state.route)
    return (
        <Map
          google={this.props.google}
          zoom={18.25}
          style={mapStyles}
          initialCenter={
            {
              lat: 44.47322749043961,
              lng: -73.20418379908438
            }
          }
        >
          <Marker
            position={{lat: 44.47366347350147, lng: -73.20418545949217}}
            onClick={this.onMarkerClick}
            name={'CCM'}
          />
          <Marker
            position={{lat: 44.47303567286289, lng: -73.20579387668263}}
            onClick={this.onMarkerClick}
            name={'Perry Hall'}
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
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2} 
          />
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBtX-ubyw8TF5OeJUcP_YccaTEI9eDs3Og'
})(MapContainer);
