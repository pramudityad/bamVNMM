import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://dev.bam-id.e-dpm.com/">BAM</a> &copy; 2020. With Love</span>
        <span className="ml-auto">Powered by <a href="https://dev.bam-id.e-dpm.com/">MOAI NEO Automation</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
