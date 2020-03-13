/*global google*/
import React, { Component } from "react";
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

const propTypes = {
    dsp_lat: PropTypes.number,
    dsp_lng: PropTypes.number,
    site_lat: PropTypes.number,
    site_lng: PropTypes.number,
}

const defaultProps = {
    dsp_lat: -6.2915605,
    dsp_lng: 106.7999035,
    site_lat: -6.2915605,
    site_lng: 106.7999035,
}

class MapComponent extends Component {
  state = {
    directions: null
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    const origin = { lat: this.props.dsp_lat, lng: this.props.dsp_lng };
    const destination = { lat: this.props.site_lat, lng: this.props.site_lng };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const GMapping = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: this.props.site_lat, lng: this.props.site_lng }}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
    ));

    return (
      <div>
        <GMapping
          containerElement={<div style={{ height: `600px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

MapComponent.propTypes = propTypes;
MapComponent.defaultProps = defaultProps;

export default MapComponent;