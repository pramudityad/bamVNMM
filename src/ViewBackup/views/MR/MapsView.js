// import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
// import { Card, CardHeader, CardBody, CardFooter, Table, Row, Col, Button, Input, Nav, NavItem, NavLink } from 'reactstrap';
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// const propTypes = {
//     dsp_lat: PropTypes.number,
//     dsp_lng: PropTypes.number,
//     site_lat: PropTypes.number,
//     site_long: PropTypes.number,
// }

// const defaultProps = {
//     dsp_lat: -6.2697656,
//     dsp_lng: 106.7824432,
//     site_lat: -6.2624253,
//     site_lng: 106.7820742,
// }

// const MyMapComponent = (props) =>
//     <GoogleMap
//         defaultZoom={14}
//         defaultCenter={{lat: site_lat, lng: site_lng }}
//     >
//         {props.isMarkerShown && <Marker position={{ lat: site_lng, lng: site_lng}} /> }
//     </GoogleMap>

// // const MapsView = (props) =>
// //   <GoogleMap
// //     defaultZoom={14}
// //     defaultCenter={{ lat: site_lat, lng: site_lng }}
// //   >
// //     {props.isMarkerShown && <Marker position={{ lat: site_lat, lng: site_lng }} />}
// //   </GoogleMap>

// // class MapsView extends Component {
// //     render() {
// //         const {dsp_lat, dsp_lng, site_lat, site_lng} = this.props;

// //         const GoogleMapView = withGoogleMap(props => (
// //             <GoogleMap
// //               defaultCenter = {{ lat: site_lat, lng: site_lng }}
// //               defaultZoom = { 14 }
// //             >
// //                 {props.isMarkerShown && <Marker position={{ lat: site_lat, lng: site_lng }} />}
// //             </GoogleMap>
// //          ));

// //          return (
// //             <div style={{ height: '100vh', width: '100%' }}>
// //                 <GoogleMapView
// //                 googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAoCmcgwc7MN40js68RpcZdSzh9yLrmLF4&v=3.exp&libraries=geometry,drawing,places"
// //                 containerElement={ <div style={{ height: '500px', width: '500px' }} /> }
// //                 mapElement={ <div style={{ height: '100%' }} /> }
// //                 />
// //             </div>
// //         );
// //     }
// // }

// // MyMapComponent.propTypes = propTypes;
// // MyMapComponent.defaultProps = defaultProps;

// // export default (MyMapComponent);

// {/* <MapsView 
//     isMarkerShown 
//     googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
//     loadingElement={<div style={{ height: '100%' }} />}
//     containerElement={<div style={{ height: '400px' }} />}
//     mapElement={<div style={{ height: '100%' }} />}
// /> */}