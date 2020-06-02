import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Input,
  CardFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { connect } from "react-redux";

class CreatePRPO extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Dataform: {
        siteID: "",
        siteName: "",
        approvalBy: "",
        projectName: "",
        qty1: "",
      },
    };
    // bind
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(
      (prevState) => ({
        Dataform: {
          ...prevState.Dataform,
          [name]: value,
        },
      }),
      () => console.log(this.state.Dataform)
    );
  }

  render() {
    const { Dataform } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <span style={{ lineHeight: "2", fontSize: "17px" }}>
                  <i className="fa fa-edit" style={{ marginRight: "8px" }}></i>
                  PR/PO Creation
                </span>
              </CardHeader>
              <CardBody>
                <Row xs="2">
                  {/* general info */}
                  <Col>
                    <h5>General Information</h5>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>Site ID</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Site ID"
                            name={"siteID"}
                            value={Dataform.siteID}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Site Name</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Site Name"
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Quotation Number</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Quotation Number"
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Signum PM</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Signum PM"
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Approval By</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder="Select Approval by"
                            name={"approvalBy"}
                            value={Dataform.approvalBy}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select Approval by
                            </option>
                            <option value="user1">user1</option>
                            <option value="user2">user2</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Project Name</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Project Name"
                            name={"projectName"}
                            value={Dataform.projectName}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Area</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Area"
                            name={"qty1"}
                            value={Dataform.qty1}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                  {/* prpo info */}
                  <Col>
                    <h5>PRPO Information</h5>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>Purchase Group</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Site ID"
                            name={"siteID"}
                            value={Dataform.siteID}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>ASP Name</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="ASP Name"
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Term of Payment</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder=""
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select TOP
                            </option>
                            <option value=""></option>
                            <option value=""></option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Network Number</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Network Number"
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Activity Code</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder="Activity Code"
                            name={"approvalBy"}
                            value={Dataform.approvalBy}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Action Point</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder="Project Name"
                            name={"projectName"}
                            value={Dataform.projectName}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select Action Point
                            </option>
                            <option value="">New Assignment</option>
                            <option value="">Revise Assignment</option>
                            <option value="">Cancel Assignment</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Currency</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder="Area"
                            name={"qty1"}
                            value={Dataform.qty1}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select Currency
                            </option>
                            <option value="">New Assignment</option>
                            <option value="">Revise Assignment</option>
                            <option value="">Cancel Assignment</option>
                          </Input>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                {/* ssow */}
                <h5>SSOW Detail</h5>
                <Row xs="3">
                  <Col>
                    SSOW
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    {/* &nbsp;&nbsp;&nbsp; */}
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                  </Col>
                  <Col>
                    Service Code
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                  </Col>
                  <Col>
                    QTY
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                  </Col>
                </Row>
                <FormGroup row>
                  <Label sm={2}>Total Price</Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      placeholder=""
                      name={"siteID"}
                      value={Dataform.siteID}
                      onChange={this.handleInput}
                    />
                  </Col>
                </FormGroup>
                {/* pr status */}
                <Row xs="2">
                  <Col>
                    <h5>PR Status</h5>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>Site ID</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Site ID"
                            name={"siteID"}
                            value={Dataform.siteID}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Site Name</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Site Name"
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Quotation Number</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Quotation Number"
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Signum PM</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Signum PM"
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Approval By</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder="Select Approval by"
                            name={"approvalBy"}
                            value={Dataform.approvalBy}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select Approval by
                            </option>
                            <option value="user1">user1</option>
                            <option value="user2">user2</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Project Name</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Project Name"
                            name={"projectName"}
                            value={Dataform.projectName}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Area</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Area"
                            name={"qty1"}
                            value={Dataform.qty1}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                  {/* prpo info */}
                  <Col>
                    <h5>GR Information</h5>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>Purchase Group</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Site ID"
                            name={"siteID"}
                            value={Dataform.siteID}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>ASP Name</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="ASP Name"
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Term of Payment</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder=""
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select TOP
                            </option>
                            <option value=""></option>
                            <option value=""></option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Network Number</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Network Number"
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Activity Code</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder="Activity Code"
                            name={"approvalBy"}
                            value={Dataform.approvalBy}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Action Point</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder="Project Name"
                            name={"projectName"}
                            value={Dataform.projectName}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select Action Point
                            </option>
                            <option value="">New Assignment</option>
                            <option value="">Revise Assignment</option>
                            <option value="">Cancel Assignment</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Currency</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder="Area"
                            name={"qty1"}
                            value={Dataform.qty1}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select Currency
                            </option>
                            <option value="">New Assignment</option>
                            <option value="">Revise Assignment</option>
                            <option value="">Cancel Assignment</option>
                          </Input>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                {/* gr information */}
                <Row>
                  <Col>
                    <h5>GR Information</h5>
                    <Form>
                      <FormGroup row>
                        <Label sm={2}>Purchase Group</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Site ID"
                            name={"siteID"}
                            value={Dataform.siteID}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>ASP Name</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="ASP Name"
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Term of Payment</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder=""
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select TOP
                            </option>
                            <option value=""></option>
                            <option value=""></option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Network Number</Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            placeholder="Network Number"
                            name={"siteName"}
                            value={Dataform.siteName}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Activity Code</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder="Activity Code"
                            name={"approvalBy"}
                            value={Dataform.approvalBy}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Action Point</Label>
                        <Col sm={10}>
                          <Input
                            type="select"
                            placeholder="Project Name"
                            name={"projectName"}
                            value={Dataform.projectName}
                            onChange={this.handleInput}
                          >
                            <option value="" disabled selected hidden>
                              Select Action Point
                            </option>
                            <option value="">New Assignment</option>
                            <option value="">Revise Assignment</option>
                            <option value="">Cancel Assignment</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={2}>Revision Done</Label>
                        <Col sm={10}>
                          <Input
                            type="checkbox"
                            placeholder="Area"
                            name={""}
                            value={Dataform.qty1}
                            onChange={this.handleInput}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
			  <CardFooter>
                <Button type="submit" color="success" style={{float: "right"}} ><i className="fa fa-plus" style={{marginRight: "8px"}}></i> Create</Button>
              </CardFooter>
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

export default connect(mapStateToProps)(CreatePRPO);
