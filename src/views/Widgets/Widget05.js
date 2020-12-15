import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Progress } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  invert: PropTypes.bool,
};

const defaultProps = {
  header: '87.500',
  icon: 'icon-people',
  color: 'info',
  value: '25',
  children: 'Visitors',
  invert: false,
};

class Widget05 extends Component {
  render() {
    const { className, cssModule, header, icon, color, value, children, invert, ...attributes } = this.props;

    // demo purposes only
    const progress = { style: '', color: color, value: value };
    const card = { style: '', bgColor: '', icon: icon };

    if (invert) {
      progress.style = 'progress-white';
      progress.color = '';
      card.style = 'text-white';
    //   card.bgColor = color;
    }

    const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);
    progress.style = classNames('progress-xs mt-3 mb-0', progress.style);

    return (
      <Card className={classes} {...attributes} style={{backgroundColor:color,border:'0px'}}>
        <CardBody style={{paddingBottom:'10px',paddingTop:'10px'}}>
          <div className="text-muted float-right">
            <i className={card.icon} style={{fontSize:'50px'}}></i>
          </div>
          <div className="h4 mb-0">{header}</div>
          <small className="text-muted text-uppercase font-weight-bold" style={{fontSize:'15px'}}>{children}</small>
        </CardBody>
      </Card>
    );
  }
}

Widget05.propTypes = propTypes;
Widget05.defaultProps = defaultProps;

export default Widget05;
