import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, input } from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";

class ListOrdering extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
        <div>
            <Row>
            <Col xl="12">
            <Card>
            <CardHeader>
                <span style={{'position':'absolute',marginTop:'8px'}}>List Ordering</span>
                <div className="card-header-actions" style={{marginRight:'5px'}}>
                    {/* to='/new-ordering' */}
                    <Button className="btn-success"><i className="fa fa-plus-square" aria-hidden="true"></i>&nbsp; New</Button>
                </div>
            </CardHeader>
            <CardBody className='card-UploadBoq'>
                <Table hover bordered striped responsive size="sm">
                    <thead>
                        <tr>
                            <th>Commercial BOQ ID</th>
                            <th>Order BOQ ID</th>
                            <th style={{'width' : '250px', textAlign : 'center'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{verticalAlign : 'middle'}}>COMBOQ-200121-0001</td>
                            <td style={{verticalAlign : 'middle'}}>ORDBOQ-200124-0001</td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                                <Link to={'/ordering-detail/'+'1'}>
                                    <Button className="btn-primary" size="sm" color="primary" style={{marginRight : '10px'}}>
                                        <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Detail
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td style={{verticalAlign : 'middle'}}>COMBOQ-200121-0001</td>
                            <td style={{verticalAlign : 'middle'}}>ORDBOQ-200124-0002</td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                                <Link to={'/ordering-detail/'+'1'}>
                                    <Button className="btn-primary" size="sm" color="primary" style={{marginRight : '10px'}}>
                                        <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Detail
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td style={{verticalAlign : 'middle'}}>COMBOQ-200121-0003</td>
                            <td style={{verticalAlign : 'middle'}}>ORDBOQ-200124-0003</td>
                            <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                                <Link to={'/ordering-detail/'+'1'}>
                                    <Button className="btn-primary" size="sm" color="primary" style={{marginRight : '10px'}}>
                                        <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Detail
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <nav>
                    <div>
                    <Pagination
                        activePage={1}
                        itemsCountPerPage={10}
                        pageRangeDisplayed={5}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                    </div>
                </nav>
            </CardBody>
            </Card>
            </Col>
            </Row>
            <div>
            </div>
        </div>

        );
    }
}

export default ListOrdering;
