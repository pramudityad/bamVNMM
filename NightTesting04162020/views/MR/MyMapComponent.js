import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import DirectionRenderComponent from "../utility/DirectionRenderComponent";
import { createLocationObject } from "../utility/helper";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { compose, withProps } from "recompose"

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

const directions = [
    {
      from: {latLng: defaultProps.dsp_lat+', '+defaultProps.dsp_lng, title: "DSP"},
      to: {latLng: defaultProps.site_lat+', '+defaultProps.site_lng, title:"Site"},
      strokeColor: "#0000FF"
    }
]

const Routing = directions.map(elem => {
    return createLocationObject(
      elem.from.latLng,
      elem.from.title,
      elem.to.latLng,
      elem.to.title,
      elem.strokeColor
    );
});

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAoCmcgwc7MN40js68RpcZdSzh9yLrmLF4&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={13}
        center={{ lat: defaultProps.site_lat, lng: defaultProps.site_lng }}
    >
        {Routing.map((elem, index) => {
          return (
            <DirectionRenderComponent
              key={index}
              index={index + 1}
              strokeColor={elem.strokeColor}
              from={elem.from}
              to={elem.to}
            />
          );
        })}
    </GoogleMap>
)

class MyFComponent extends React.PureComponent {
    state = {
        isMarkerShown: false,
    }
    
    // componentDidMount() {
    //     this.delayedShowMarker()
    // }

    // delayedShowMarker = () => {
    //     setTimeout(() => {
    //         this.setState({ isMarkerShown: true })
    //     }, 3000)
    // }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

    render() {
        return (
            <MyMapComponent
                // isMarkerShown={this.state.isMarkerShown}
                // onMarkerClick={this.handleMarkerClick}
            />
        )
    }
}

MyFComponent.propTypes = propTypes;
MyFComponent.defaultProps = defaultProps;

export default (MyFComponent)