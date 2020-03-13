import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Loader from 'react-loader-spinner';

class LoadLoader extends Component {
    render() {
        return(
            <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}

            />
        );
    }
}

export default LoadLoader