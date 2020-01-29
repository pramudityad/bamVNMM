import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Row, Col, Button, input } from 'reactstrap';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import Pagination from "react-js-pagination";

const API_URL = 'https://api-dev.smart.pdb.e-dpm.com/smartapi';
const usernamePhilApi = 'pdbdash';
const passwordPhilApi = 'rtkO6EZLkxL1';

class ListOrdering extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          userRole : JSON.parse(localStorage.getItem('user_Roles')),
            Ordering_List : [],
            prevPage : 0,
            activePage : 1,
            totalData : 0,
            perPage : 10,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    
    getListOrdering(){
        const page = this.state.activePage;
        axios.get(API_URL +'/ordering_sorted?where={"deleted" : 0}&max_results='+this.state.perPage+'&page='+page, {
            headers : {'Content-Type':'application/json'},
            auth: {
                username: usernamePhilApi,
                password: passwordPhilApi
            },
        })
        .then(res => {
            const items = res.data._items;
            const totalData = res.data._meta;
            this.setState({ Ordering_List : items, totalData : totalData, prevPage : this.state.activePage});
        })
    }
    componentDidMount(){
        this.getListOrdering();
    }
    
    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber}, () => {
        this.getListOrdering();
        });
    }

    render() {
        console.log("this.state.Ordering_List", this.state.Ordering_List);
        console.log("this.state.Ordering_List", this.state.Ordering_List);
        return (
        <div>
            <Row>
            <Col xl="12">
            <Card>
            <CardHeader>
                <span style={{'position':'absolute',marginTop:'8px'}}>List Ordering</span>
                {this.state.userRole.includes('Flow-PublicInternal') !== true ? (
                <div className="card-header-actions" style={{marginRight:'5px'}}>
                    <Link to='/new-ordering'>
                    <Button className="btn-success"><i className="fa fa-plus-square" aria-hidden="true"></i>&nbsp; New</Button>
                    </Link>
                </div>
                ) : ""}
            </CardHeader>
            <CardBody className='card-UploadBoq'>
                <Table hover bordered striped responsive size="sm">
                    <thead>
                        <tr>
                            <th style={{'width' : '25px', textAlign : 'center'}}>Number</th>
                            <th>Order ID</th>
                            <th style={{'width' : '250px', textAlign : 'center'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Ordering_List.map((ord, i) =>
                            <tr>
                                <td style={{verticalAlign : 'middle', textAlign : "center"}}>{i+1}</td>
                                <td style={{verticalAlign : 'middle'}}>{ord.order_id}</td>
                                <td style={{verticalAlign : 'middle', textAlign : "center"}}>
                                    <Link to={'/detail-ordering/'+ord._id}>
                                        <Button className="btn-primary" size="sm" color="primary" style={{marginRight : '10px'}}>
                                        <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Detail
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <nav>
                    <div>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.perPage}
                        totalItemsCount={this.state.totalData.total}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
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
