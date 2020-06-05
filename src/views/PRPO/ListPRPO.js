import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Row,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

import { connect } from "react-redux";
import { getDatafromAPINODE } from "../../helper/asyncFunction";

class ListPRPO extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userRole: this.props.dataLogin.role,
        userId: this.props.dataLogin._id,
        userName: this.props.dataLogin.userName,
        userEmail: this.props.dataLogin.email,
        tokenUser: this.props.dataLogin.token,
        all_data : [],
        prevPage: 0,
        activePage: 1,
        totalData: 0,
        perPage: 10,
    };
    // bind
  }

  // function

  componentDidMount() {
    this.getPRTList()
    document.title = 'PRT List | BAM';
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.getPRTList();
    });
  }

  getPRTList(){
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    getDatafromAPINODE('/prt/getPrt?'+ 'lmt=' + maxPage + '&pg=' + page, this.props.dataLogin.token).then(res => {
        if(res.data !== undefined){
            const items = res.data.data;
            const totalData = res.data.totalResults;
            this.setState({ all_data: items, totalData: totalData });
        }
    })
  }

  loopSearchBar = () => {
    let searchBar = [];
    for (let i = 0; i < 8; i++) {
      searchBar.push(
        <td>
          <div className="controls" style={{ width: "150px" }}>
            <InputGroup className="input-prepend">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-search"></i>
                </InputGroupText>
              </InputGroupAddon>
              {/* <Input type="text" placeholder="Search" onChange={this.handleFilterList} value={this.state.filter_list[i]} name={i} size="sm" /> */}
              <Input type="text" placeholder="Search" size="sm" />
            </InputGroup>
          </div>
        </td>
      );
    }
    return searchBar;
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    const downloadAssignment = {
      float: "right",
      marginRight: "10px",
    };

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: "2" }}>
                  <i
                    className="fa fa-align-justify"
                    style={{ marginRight: "8px" }}
                  ></i>{" "}
                  PRT List
                </span>
                <Link to={"/prt-creation"}>
                  <Button color="success" style={{ float: "right" }} size="sm">
                    <i
                      className="fa fa-plus-square"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Create PRT
                  </Button>
                </Link>
                <Link to={"/bulk-assignment-creation"}>
                  <Button
                    color="success"
                    style={{ float: "right", marginRight: "8px" }}
                    size="sm"
                  >
                    <i
                      className="fa fa-plus-square"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Create PRT Bulk
                  </Button>
                </Link>
                <Button
                  style={downloadAssignment}
                  outline
                  color="success"
                  size="sm"
                >
                  <i
                    className="fa fa-download"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Download PRT List
                </Button>
                {/* <Button style={downloadAssignment} outline color="success" onClick={this.downloadAllAssignment} size="sm"><i className="fa fa-download" style={{ marginRight: "8px" }}></i>Download PRT List</Button> */}
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                        Action
                      </th>
                      <th>PRT ID</th>
                      <th>Site Id</th>
                      <th>Site Name</th>
                      <th>Quotation number</th>
                      <th>SIGNUM PM</th>
                      <th>Approval By</th>
                      <th>Project Name</th>
                      <th>Area</th>
                    </tr>
                    <tr>{this.loopSearchBar()}</tr>
                  </thead>
                  <tbody>
                    {this.state.all_data.length === 0 && (
                          <tr>
                            <td colSpan="10">No Data Available</td>
                          </tr>
                        )}
                        {this.state.all_data.map((list, i) =>
                          <tr key={list._id}>
                            <td>
                              {/* <Link to={'/assignment-detail/' + list._id}>
                                <Button style={{ width: "90px" }} outline color="info" size="sm">Detail</Button>
                              </Link> */}
                            </td>
                            <td>{list.prt_id}</td>
                            <td>{list.site_id}</td>
                            <td>{list.site_name}</td>
                            <td>{list.quotation_number}</td>
                            <td>{list.signum_pm}</td>
                            <td>{list.approval_by}</td>
                            <td>{list.project_name}</td>
                            <td>{list.area}</td>
                          </tr>
                        )}
                  </tbody>
                </Table>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={this.state.perPage}
                  totalItemsCount={this.state.totalData}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
    SidebarMinimize: state.minimizeSidebar,
  };
};

export default connect(mapStateToProps)(ListPRPO);
