import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Progress } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  numberIcon: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  invert: PropTypes.bool,
};

const defaultProps = {
  header: '87.500',
  color: 'info',
  value: '25',
  children: '',
  numberIcon : null,
  invert: false,
};

class Widget06 extends Component {
  render() {
    const { className, cssModule, header, icon, color, value, numberIcon, children, invert, ...attributes } = this.props;

    // demo purposes only
    const progress = { style: '', color: color, value: value };
    const card = { style: '', bgColor: '', icon: icon, numberIcon : numberIcon };

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
            <i style={{fontSize:'20px', fontWeight: 600, color : 'rgba(255, 255, 255, 1)'}}>{card.numberIcon}</i>
          </div>
          <div className="h4 mb-0">{header}</div>
          <small className="text-muted text-uppercase font-weight-bold" style={{fontSize:'15px'}}>{children}</small>
        </CardBody>
      </Card>
    );
  }
}

Widget06.propTypes = propTypes;
Widget06.defaultProps = defaultProps;

export default Widget06;
