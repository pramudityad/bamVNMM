import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'sweetalert2-react';

const propTypes = {
    actionMessage : PropTypes.string,
    actionStatus : PropTypes.string,
};

const defaultProps = {
    actionMessage : null,
    actionStatus : null,
};

class DefaultAlert extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          alert: null,
          show: true,
        };

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss()
    {
        this.setState({ show: false });
    }

    render()
    {
        if(this.props.actionStatus !== undefined && this.props.actionStatus !== null)
        {
            let handleToUpdate = this.props.handleToUpdate;
            if ( this.props.actionStatus === 'failed' )
            {
                return ( <div>
                    <SweetAlert
                    show={this.state.show}
                    title="Failure"
                    type="error"
                    text={this.props.actionMessage !== null ? this.props.actionMessage : "Oops! Something went wrong. Please refresh this page and try again" }
                    onConfirm={() => this.onDismiss, () => handleToUpdate()}
                    />
                </div> )
            }
            else if ( this.props.actionStatus === 'success' )
            {
                return (
                <div>
                    <SweetAlert
                    show={this.state.show}
                    title="Success"
                    type="success"
                    text={this.props.actionMessage !== null ? this.props.actionMessage : "Your action has been completed!" }
                    onConfirm={() => this.onDismiss, () => handleToUpdate()}
                    />
                </div> )
            }
            else
            {
                return ( <div>     
                    <SweetAlert
                    show={this.state.show}
                    title="Default"
                    type="Info"
                    text={this.props.actionMessage !== null ? this.props.actionMessage : "Nothing to see here! If you were expecting to see something, please contact the developer" }
                    onConfirm={() => this.onDismiss, () => handleToUpdate()}
                    />
                </div> )
            }
            
        } else {
            return (<div></div>);
        }
        
    }
}

export default DefaultAlert;