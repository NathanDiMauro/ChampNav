import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
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
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBtX-ubyw8TF5OeJUcP_YccaTEI9eDs3Og'
})(MapContainer);
