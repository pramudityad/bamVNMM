/*global google*/
import React, { Component } from "react";
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from "react-google-maps";
import iconTruck from '../../assets/img/loaded-truck-side-view.png';

const propTypes = {
    dsp_lat: PropTypes.number,
    dsp_lng: PropTypes.number,
    site_lat: PropTypes.number,
    site_lng: PropTypes.number,
}

const defaultProps = {
    dsp_lat: -6.2915605,
    dsp_lng: 106.7999035,
    site_lat: -6.2626619,
    site_lng: 106.7826552,
}

class MapComponent extends Component {
  state = {
    directions: null
  };

  componentDidMount() {
    // const directionsService = new google.maps.DirectionsService();
    //
    // const origin = { lat: this.props.dsp_lat, lng: this.props.dsp_lng };
    // const destination = { lat: this.props.site_lat, lng: this.props.site_lng };
    //
    // directionsService.route(
    //   {
    //     origin: origin,
    //     destination: destination,
    //     travelMode: google.maps.TravelMode.DRIVING
    //   },
    //   (result, status) => {
    //     if (status === google.maps.DirectionsStatus.OK) {
    //       this.setState({
    //         directions: result
    //       });
    //     } else {
    //       console.error(`error fetching directions ${result}`);
    //     }
    //   }
    // );
  }

  render() {
    const GMapping = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: this.props.dsp_lat, lng: this.props.dsp_lng }}
        defaultZoom={13}
      >
      <Marker
        icon={{
          url: iconTruck
        }}
        position={{ lat: this.props.dsp_lat, lng: this.props.dsp_lng}}
      />
      </GoogleMap>
    )));

    return (
      <div>
        <GMapping
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB5mmXco3GYZhRDNY4CJcBlaENjteSC8DM"
          loadingElement={<div style={{ height: "100%" }} />}
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
