import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardFooter, Table, Row, Col, Button, Input, Nav, NavItem, NavLink } from 'reactstrap';
import { Map, GoogleApiWrapper, Marker, Polyline, Polygon } from 'google-maps-react';

const mapStyles = {
    width: '96%',
    height: '73%',
};

const propTypes = {
    dsp_lat: PropTypes.number,
    dsp_lng: PropTypes.number,
    site_lat: PropTypes.number,
    site_long: PropTypes.number,
}

const defaultProps = {
    dsp_lat: -6.2697656,
    dsp_lng: 106.7824432,
    site_lat: -6.2624253,
    site_lng: 106.7820742,
}

const CustomMarker = ({ text }) => (
    <div style={{
      color: 'white', 
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
);

const google = window.google;

class MapView extends Component {
    render() {
        const {dsp_lat, dsp_lng, site_lat, site_lng} = this.props;

        const coordinates = [
            { lat: dsp_lat, lng: dsp_lng },
            { lat: site_lat, lng: site_lng }
        ];
        
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{ lat: site_lat, lng: site_lng }}
                    yesIWantToUseGoogleMapApiInternals
                    // onGoogleApiLoaded={({map, maps}) => apiIsLoaded(map, maps)}
                >
                    <Marker 
                    position={{ lat: site_lat, lng: site_lng}} 
                    />
                    <Marker 
                    position={{ lat: dsp_lat, lng: dsp_lng}} 
                    // icon={{
                    //     url: "./src/assets/img/brand/custom_icons/dsp_truck_icon.png",
                    //     anchor: new google.maps.Point(32,32),
                    //     scaledSize: new google.maps.Size(64,64)
                    // }} 
                    />
                    
                    <Polyline
                        path={coordinates}
                        strokeColor="#0000FF"
                        strokeOpacity={.8}
                        strokeWeight={2}
                    />
                </Map>
            </div>
        );
    }
}

MapView.propTypes = propTypes;
MapView.defaultProps = defaultProps;

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAoCmcgwc7MN40js68RpcZdSzh9yLrmLF4'
})(MapView);
  
