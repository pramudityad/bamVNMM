import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardFooter, CardBody, Table, Row, Col, Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import {slideDown, slideUp} from './slidetableanim';
import './slidetablecss.css';
import './boqOrdering.css';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, inValue="", disabled= false}) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={inValue} className="checkmark-dash" disabled={disabled}/>
);

class OrderingMaterial extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
        <div>
            <Row>
            <Col xl="12">
            <Card>
            <CardHeader>
            {this.state.OrderInfo === null && this.props.match.params.id === undefined ? (
                <React.Fragment>
                Material Ordering BOQ
            </React.Fragment>) : (
                <React.Fragment>
                <span style={{lineHeight :'2', fontSize : '17px'}} >Material Ordering BOQ</span>
                </React.Fragment>
            )}
            </CardHeader>
            <CardBody className='card-UploadBoq'>
                <table  style={{width : '100%', marginBottom : '0px', fontSize : '20px', fontWeight : '500'}}>
                <tbody>
                    <tr>
                    <td colSpan="4" style={{textAlign : 'center'}}>ORDERING INFORMATION</td>
                    </tr>
                </tbody>
                </table>
                <hr style={{borderStyle : 'double', borderWidth: '0px 0px 3px 0px', borderColor : ' rgba(174,213,129 ,1)', marginTop: '5px'}}></hr>
                <table style={{width : '35%'}} className="table-header">
                <tbody>
                    <tr>
                    <td style={{minWidth : '160px'}}>Project Identifier</td>
                    <td>:</td>
                    <td style={{paddingLeft:'10px', minWidth:'180px'}}>
                        LTE 2020
                    </td>
                    </tr>
                    <tr>
                    <td style={{minWidth : '160px'}}>Commercial Identifier</td>
                    <td>: </td>
                    <td style={{paddingLeft:'10px', minWidth:'180px'}}>
                        COMBOQ-200121-0001
                    </td>
                    </tr>
                    <tr>
                    <td style={{minWidth : '160px'}}>PO Identifier</td>
                    <td>:</td>
                    <td style={{paddingLeft:'10px', minWidth:'180px'}}>
                        PO2020001
                    </td>
                    </tr>
                    <React.Fragment>
                    <tr>
                    <td style={{minWidth : '160px'}}>Order ID</td>
                    <td>:</td>
                    <td style={{paddingLeft:'10px', minWidth:'180px'}}>
                        ORDBOQ-200124-0001
                    </td>
                    </tr>
                    </React.Fragment>
                </tbody>
                </table>
                <hr className="upload-line-ordering"></hr>
                <Table hover bordered responsive size="sm">
                <thead>
                    <tr>
                    <th style={{width : '50px', backgroundColor:'#c6f569', color:'#000000'}}>
                    {this.state.OrderInfo === null && this.props.match.params.id === undefined ? (
                        <Checkbox checked={this.state.pp_selected_all} onChange={this.handleChangeChecklistPPAll}/>
                    ) : (" ")}
                    </th>
                    <th style={{width : '200px', backgroundColor:'#c6f569', color:'#000000'}}>Package</th>
                    <th style={{width : '150px', backgroundColor:'#c6f569', color:'#000000'}}>Material Code</th>
                    <th style={{backgroundColor:'#c6f569', color:'#000000'}}>Material Name</th>
                    <th style={{width : '75px', backgroundColor:'#c6f569', color:'#000000'}}>Unit</th>
                    <th style={{width : '75px', backgroundColor:'#c6f569', color:'#000000'}}>Qty per PP</th>
                    <th style={{width : '75px', backgroundColor:'#c6f569', color:'#000000'}}>Price</th>
                    <th style={{width : '100px', backgroundColor:'#c6f569', color:'#000000'}}>Total PO Qty</th>
                    <th style={{width : '100px', backgroundColor:'#c6f569', color:'#000000'}}>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{background : '#f8f6df'}}>
                        <td>Ordered</td>
                        <td colspan='5' style={{textAlign : 'left'}}>Product Test 1</td>
                        <td></td>
                        <td>2</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>Material Test 1</td>
                        <td>mattest1</td>
                        <td>pc</td>
                        <td>6</td>
                        <td>0</td>
                        <td>12</td>
                        <td>0</td>
                    </tr>
                    <tr style={{background : '#f8f6df'}}>
                        <td>Ordered</td>
                        <td colspan='5' style={{textAlign : 'left'}}>Product Test 2</td>
                        <td></td>
                        <td>3</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>Material Test 2</td>
                        <td>mattest2</td>
                        <td>pc</td>
                        <td>3</td>
                        <td>0</td>
                        <td>9</td>
                        <td>0</td>
                    </tr>
                    <tr style={{background : '#f8f6df'}}>
                        <td>Ordered</td>
                        <td colspan='3' style={{textAlign : 'left'}}>Product Test 4</td>
                        <td colspan='2' style={{textAlign : 'right', fontStyle : 'italic', borderLeft : 'none'}}>Package Only</td>
                        <td></td>
                        <td>1</td>
                        <td></td>
                    </tr>
                    <tr style={{background : '#f8f6df'}}>
                        <td>Ordered</td>
                        <td colspan='3' style={{textAlign : 'left'}}>Product Test 7</td>
                        <td colspan='2' style={{textAlign : 'right', fontStyle : 'italic', borderLeft : 'none'}}>Package Only</td>
                        <td></td>
                        <td>1</td>
                        <td></td>
                    </tr>
                </tbody>
                </Table>
            </CardBody>
            <CardFooter>
            {this.state.OrderInfo === null && this.props.match.params.id === undefined ? (
                <Button color="success" style={{ color: 'white', fontWeight : '400'}} disabled={this.state.pp_selected.size === 0} onClick={this.saveOrdering} value={this.state.comm_po_select}><i className="fa fa-shopping-cart " aria-hidden="true">&nbsp;</i>Create Order</Button>
            ) : (<div></div>)}
            </CardFooter>
            </Card>
            </Col>
            </Row>
            {/* Modal Loading */}
            <Modal isOpen={this.state.modal_loading} toggle={this.toggleLoading} className={'modal-sm ' + this.props.className}>
            <ModalBody>
                <div style={{textAlign : 'center'}}>
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
                <div style={{textAlign : 'center'}}>
                Loading ...
                </div>
                <div style={{textAlign : 'center'}}>
                System is processing ...
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.toggleLoading}>Close</Button>
            </ModalFooter>
            </Modal>
            {/* end Modal Loading */}
        </div>

        );
    }
}

export default OrderingMaterial;
