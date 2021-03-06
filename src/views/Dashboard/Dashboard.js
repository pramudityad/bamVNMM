import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import logoEricsson from '../../assets/img/brand/Econ-White.svg';
import axios from "axios";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));
const Widget05 = React.lazy(() => import('../../views/Widgets/Widget05'));

const API_URL_NODE = 'https://api2-dev.bam-id.e-dpm.com/bamidapi';
const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New Clients',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring Clients',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Pageviews',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Organic',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const month = ['July', 'August', 'September', 'October', 'November', 'Desember'];
console.log("month", month.map(e => e));

const bar = {
  labels: month,
  datasets: [
    {
      label: 'MoS',
      backgroundColor: 'rgba(121,134,203,0.4)',
      borderColor: 'rgba(121,134,203,0.7)',
      borderWidth: 0.5,
      hoverBackgroundColor: 'rgba(63,81,181,0.7)',
      hoverBorderColor: 'rgba(63,81,181,1)',
      data: month.map(e => getRandomInt(65,100)),
    },
    {
      label: 'Installed',
      backgroundColor: 'rgba(79,195,247,0.5)',
      borderColor: 'rgba(79,195,247,1)',
      borderWidth: 0.5,
      hoverBackgroundColor: 'rgba(3,169,244,0.7)',
      hoverBorderColor: 'rgba(3,169,244,1)',
      data: month.map(e => getRandomInt(45,75)),
    },
    {
      label: 'On Air',
      backgroundColor: 'rgba(0, 184, 148,0.4)',
      borderColor: 'rgba(0, 184, 148,1)',
      borderWidth: 0.5,
      hoverBackgroundColor: 'rgba(0, 184, 148,0.7)',
      hoverBorderColor: 'rgba(0, 184, 148,1)',
      data: month.map(e => getRandomInt(20,65)),
    },
  ],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      tokenUser: this.props.dataLogin.token,
      dropdownOpen: false,
      radioSelected: 2,
      pendingBOQ : 0,
      pendingMR : 0,
      pendingASG : 0,
      POExpired : 0,
      queryPOExpired : '',
    };
  }

  async getDataFromAPINODE(url) {
    try {
      let respond = await axios.get(API_URL_NODE+url, {
        headers : {
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+this.state.tokenUser
        },
      });
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond data dash", respond);
      }
      return respond;
    } catch(err) {
      let respond = err;
      return respond;
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  componentDidMount(){
    this.getPendingTaskBOQ();
    this.getPendingTaskMR();
    this.getPendingTaskASG();
    this.getPODataListPending();
  }

  async getPendingTaskBOQ(){
    let count = 0;
    let dataTech = await this.getDataFromAPINODE('/techBoqList?srt=_id:-1&q={"approval_status":{"$regex" : "Approved", "$options" : "i"}}&lmt=1&pg=1&v={"_id" : 1}');
    let dataComm = await this.getDataFromAPINODE('//commBoq?srt=_id:-1&q={"current_status":{"$regex" : "COMM BOQ CREATED", "$options" : "i"}}&lmt=1&pg=1&v={"_id" : 1}');
    if(dataTech !== undefined && dataComm !== undefined && dataTech.data !== undefined && dataComm.data !== undefined){
      count = dataTech.data.totalResults - dataComm.data.totalResults;
      this.setState({pendingBOQ : count});
    }
  }

  async getPendingTaskMR(){
    let count = 0;
    let dataPendingLDM = await this.getDataFromAPINODE('/matreq?srt=_id:-1&q={"current_mr_status":"MR REQUESTED"}&lmt=1&pg=1&v={"_id" : 1}');
    if(dataPendingLDM !== undefined && dataPendingLDM.data !== undefined){
      count = dataPendingLDM.data.totalResults;
      this.setState({pendingMR : count});
    }
  }

  async getPendingTaskASG(){
    let count = 0;
    let dataPendingTPM = await this.getDataFromAPINODE('/aspAssignment/aspassign?srt=_id:-1&q={"Current_Status":"REQUEST PM APPROVAL"}&lmt=10&pg=1&v={"_id" : 1}');
    if(dataPendingTPM !== undefined && dataPendingTPM.data !== undefined){
      count = dataPendingTPM.data.totalResults;
      this.setState({pendingASG : count});
    }
  }

  getPODataListPending() {
    let count = 0;
    let today = new Date();
    today.setDate(today.getDate()-120);
    let dateExpired = today.getFullYear().toString()+"-"+(today.getMonth()+1).toString().padStart(2, '0')+"-"+today.getDate().toString().padStart(2, '0');
    this.setState({queryPOExpired : 'q={"date" : {"$lte":"'+dateExpired+' 0:0:0"}}'});
    this.getDataFromAPINODE('/cpodb/getCpoDb?srt=_id:-1&lmt=1&pg=1&q={"date" : {"$lte":"'+dateExpired+' 0:0:0"}}')
      .then(res => {
        if (res.data !== undefined) {
          count = res.data.totalResults;
          this.setState({POExpired : count});
        } else {
          this.setState({POExpired : 0});
        }
      })
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>

          <Col xs="12" sm="6" lg="3">
          <Link to={'/order-created'}>
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.pendingMR}</div>
                <div>Pending Task MR Module</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChartData2} options={cardChartOpts2} height={70} />
              </div>
            </Card>
            </Link>
          </Col>
          <Col xs="12" sm="6" lg="3">
          <Link to={'/assignment-list-approval'}>
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.pendingASG}</div>
                <div>Pending Task ASP Assingment</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChartData1} options={cardChartOpts1} height={70} />
              </div>
            </Card>
            </Link>
          </Col>
          <Col xs="12" sm="6" lg="3">
          <Link to={'/list-commercial/creation'}>
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.pendingBOQ}</div>
                <div>Pending Task BOQ</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
            </Link>
          </Col>

          <Col xs="12" sm="6" lg="3">
          <Link to={'/cpo-database/'}>
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.POExpired}</div>
                <div>PO to Be Expired & Expired</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
              </div>
            </Card>
            </Link>
          </Col>
        </Row>

        <hr style={{borderStyle : 'solid', borderWidth: '0px 0px 1px 0px', borderColor : '#0073b7', marginTop: '5px'}}></hr>
        <div style={{marginTop : '25px'}}>
        <Row>
          <Col xs="6" sm="4" lg="4">
            <a style={{textDecoration:"none"}} href="#"><Widget05 icon="fa fa-pencil-square-o" color='#0073b7' header="BAM" value="25" invert>BOQ Assignment Material</Widget05></a>
          </Col>
          <Col xs="6" sm="4" lg="4">
            <a style={{textDecoration:"none"}} href="https://act.e-dpm.com"><Widget05 icon="fa fa-cogs" color="#00c0ef" header="ACT" value="25" invert>ASP Action</Widget05></a>
          </Col>
          <Col xs="6" sm="4" lg="4">
            <a style={{textDecoration:"none"}} href="https://xl.pdb.e-dpm.com/"><Widget05 icon="fa fa-database" color="rgb(255, 193, 7)" header="PDB" value="25" invert>Setup and Plan</Widget05></a>
          </Col>
          <Col xs="6" sm="4" lg="4">
            <a style={{textDecoration:"none"}} href="https://apac.erisite.ericsson.net/apac1/pwa/"><Widget05 icon="fa fa-list-alt" color="#3d9970" header="Erisite" value="25" invert>Global Tools</Widget05></a>
          </Col>
          <Col xs="6" sm="4" lg="4">
            <a style={{textDecoration:"none"}} href="https://appcodeplatform.internal.ericsson.com/EPOD/Dashboard.aspx"><Widget05 icon="fa fa-list-alt" color="#3d9970" header="LH3 / EPOD" value="25" invert>Global Tools</Widget05></a>
          </Col>
          <Col xs="6" sm="4" lg="4">
            <a style={{textDecoration:"none"}} href="https://apac.erisite.ericsson.net/apac1/pwa/"><Widget05 icon="fa fa-list-alt" color="#3d9970" header="TRACY" value="25" invert>Global Tools</Widget05></a>
          </Col>
        </Row>
        </div>
        {/*<Row>
          <Col>
            <Card>
              <CardHeader>
                CD Chart
                <div className="card-header-actions">
                  <a href="http://www.chartjs.org" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Bar data={bar} options={options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/*}
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Approval Rate</CardTitle>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 400 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
              <CardFooter>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Visits</div>
                    <strong>29.703 Users (40%)</strong>
                    <Progress className="progress-xs mt-2" color="success" value="40" />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Unique</div>
                    <strong>24.093 Users (20%)</strong>
                    <Progress className="progress-xs mt-2" color="info" value="20" />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Pageviews</div>
                    <strong>78.706 Views (60%)</strong>
                    <Progress className="progress-xs mt-2" color="warning" value="60" />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">New Users</div>
                    <strong>22.123 Users (80%)</strong>
                    <Progress className="progress-xs mt-2" color="danger" value="80" />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Bounce Rate</div>
                    <strong>Average Rate (40.15%)</strong>
                    <Progress className="progress-xs mt-2" color="primary" value="40" />
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.loginData,
  };
};

export default connect(mapStateToProps)(Dashboard);
