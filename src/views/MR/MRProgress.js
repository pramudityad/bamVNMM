import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Table } from 'reactstrap';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import debounce from 'lodash.debounce';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const API_URL = 'http://api.smart.pdb.e-dpm.com/smartapi';
const username = 'usermitt';
const password = 'Z4icVgFQp3D1';

class MRProgress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mr_list : [],
      prevPage : 0,
      activePage : 1,
      totalData : 0,
      perPage : 10,
      filter_list : new Array(5).fill(null),
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
  }

  async getDataFromAPI(url) {
    try {
      let respond = await axios.get(API_URL+url, {
        headers: {'Content-Type':'application/json'},
        auth: {
          username: username,
          password: password
        }
      });
      if(respond.status >= 200 && respond.status < 300) {
        console.log("respond data", respond);
      }
      return respond;
    } catch(err) {
      let respond = err;
      console.log("respond data", err);
      return respond;
    }
  }

  getMRList() {
    const page = this.state.activePage;
    const maxPage = this.state.perPage;
    let filter_mr_id = this.state.filter_list[0] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[0]+'", "$options" : "i"}';
    let filter_cd_id = this.state.filter_list[1] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[1]+'", "$options" : "i"}';
    let filter_current_status = this.state.filter_list[2] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[2]+'", "$options" : "i"}';
    let filter_updated_on = this.state.filter_list[3] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[3]+'", "$options" : "i"}';
    let filter_created_on = this.state.filter_list[4] === null ? '{"$exists" : 1}' : '{"$regex" : "'+this.state.filter_list[4]+'", "$options" : "i"}';
    let whereAnd = '{"mr_id": '+filter_mr_id+', "cd_id": '+filter_cd_id+', "current_status": '+filter_current_status+', "updated_on": '+filter_updated_on+', "created_on": '+filter_created_on+'}';
    this.getDataFromAPI('/mrf_sorted?where='+whereAnd+'&max_results='+maxPage+'&page='+page).then(res => {
      console.log("MRF List Sorted", res);
      if(res.data !== undefined) {
        const items = res.data._items;
        const totalData = res.data._meta;
        this.setState({mr_list : items, totalData: totalData});
      }
    })
  }

  componentDidMount() {
    this.getMRList();
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber}, () => {
      this.getMRList();
    });
  }

  handleFilterList(e) {
    const index = e.target.name;
    let value = e.target.value;
    if(value !== null && value.length === 0) {
      value = null;
    }
    let dataFilter = this.state.filter_list;
    dataFilter[parseInt(index)] = value;
    this.setState({filter_list : dataFilter, activePage: 1}, () => {
      this.onChangeDebounced(e);
    })
  }

  onChangeDebounced(e) {
    this.getMRList();
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> [MR ID Here]
              </CardHeader>
              <CardBody 
                style={{ 
                  backgroundColor: '#e3e3e3',
                }}
              >
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="December 12, 2019"
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        
                    >
                        <h3 className="vertical-timeline-element-title">MR Created</h3>
                        <h4 className="vertical-timeline-element-subtitle">Order by <span>[USER-PROJECT]</span></h4>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra ut mauris.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="December 14, 2019"
                        iconStyle={{ background: 'rgb(197, 2, 204)', color: '#fff' }}
                        
                    >
                        <h3 className="vertical-timeline-element-title">Order Received</h3>
                        <h4 className="vertical-timeline-element-subtitle">Approved by <span>[USER-LDM]</span></h4>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra ut mauris.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="December 15, 2019"
                        iconStyle={{ background: 'rgb(157, 219, 11)', color: '#fff' }}
                        
                    >
                        <h3 className="vertical-timeline-element-title">Order Processing</h3>
                        <h4 className="vertical-timeline-element-subtitle">Initiated by <span>[USER-WAREHOUSE]</span></h4>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra ut mauris.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="December 15, 2019"
                        iconStyle={{ background: 'rgb(227, 30, 16)', color: '#fff' }}
                        
                    >
                        <h3 className="vertical-timeline-element-title">Ready to Deliver</h3>
                        <h4 className="vertical-timeline-element-subtitle">Confirmed by <span>[USER-LDM]</span></h4>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra ut mauris.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="December 16, 2019"
                        iconStyle={{ background: 'rgb(227, 30, 16)', color: '#fff' }}
                        
                    >
                        <h3 className="vertical-timeline-element-title">Ready to Deliver</h3>
                        <h4 className="vertical-timeline-element-subtitle">Initiated by <span>[USER-WAREHOUSE]</span></h4>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra ut mauris.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        date="December 17, 2019"
                        iconStyle={{ background: 'rgb(33, 216, 222)', color: '#fff' }}
                        
                    >
                        <h3 className="vertical-timeline-element-title">Joint Check</h3>
                        <h4 className="vertical-timeline-element-subtitle">Initiated by <span>[USER-WAREHOUSE]</span></h4>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra ut mauris.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        date="December 18, 2019"
                        iconStyle={{ background: 'rgb(150, 203, 227)', color: '#fff' }}
                        
                    >
                        <h3 className="vertical-timeline-element-title">Loading Process</h3>
                        <h4 className="vertical-timeline-element-subtitle">Initiated by <span>[USER-WAREHOUSE]</span></h4>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra ut mauris.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        date="December 19, 2019"
                        iconStyle={{ background: 'rgb(255, 251, 130)', color: '#fff' }}
                        
                    >
                        <h3 className="vertical-timeline-element-title">Dispatch</h3>
                        <h4 className="vertical-timeline-element-subtitle">Handled by <span>[USER-DSP]</span></h4>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra ut mauris.
                        </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        iconStyle={{ background: 'rgb(97, 255, 126)', color: '#fff' }}
                        date="December 21, 2019"

                    >
                        <h3 className="vertical-timeline-element-title">Delivery Complete</h3>
                        <h4 className="vertical-timeline-element-subtitle">Mateial received by <span>[ASP NAME]</span></h4>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra ut mauris.
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MRProgress;