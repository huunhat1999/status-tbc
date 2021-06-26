import React, { Component } from 'react';
import Footer from './general/Footer';
import Header from './general/Header';
import io from 'socket.io-client'
import axios from 'axios';
import Moment from 'react-moment';
import {functionCounselors} from '../../ListCounselors'
import _ from "lodash"
import { Modal,Button } from 'react-bootstrap';
import { tokenGeneral } from '../Token';
import { apiCounselors } from '../../api/Api';
import {socket} from '../../socket/Socket'

const findStatus = (data, val) => {
  var tmp = _.filter(data, {listStatus: val})
  if(tmp.length>0)
  {
    return tmp[0]
  }
  else
  {
    return null
  }
}

class Counselors extends Component {
  constructor(props) {
    super(props);
    this.state={
      bookingWaiting :[
    ],
    showPopup:false,
  }
  }
  handleShowPopup=()=>{this.setState({showPopup:true})}
  handleClosePopup=()=>{this.setState({showPopup:false})}
  modal=()=>{
    
  console.log("JJJJJJJJ");
  }
  componentDidMount(){
    let from = new Date().setHours(0,0)
    let to = new Date().setHours(23,59)
    const token = localStorage.getItem('tokenGeneral')
    console.log("tokenRes",token);
    axios.defaults.headers.token = token
    axios.post(apiCounselors,{
      "condition": {
        "created": {
          "from": from,
          "to": to
        }
      },
      "sort": {
          "created": 1
      },
      "limit": 100,
      "page": 1
  })
      .then(res => {
        console.log(res);
        this.setState({bookingWaiting: res.data.data})
        console.log("bookingTuVan", res.data.data);
    })
    socket.on('connect',function() {
        console.log('connect ok', socket.id)
    });
    socket.on('SSC_QUEUE_CONSULTATION_UPDATE', (booking)=> {
      console.log("SSC_QUEUE_CONSULTATION_UPDATE",booking);
      console.log("listbooking",this.state.bookingWaiting)

      let tempListBookingWaiting = [...this.state.bookingWaiting];
      let upDateBooking = tempListBookingWaiting.findIndex(item=>item._id === booking.queue._id)
      if(booking.queue.status==="WAIT"){
        tempListBookingWaiting.splice(upDateBooking,1)
        this.setState({bookingWaiting:tempListBookingWaiting})
        console.log("Delete",tempListBookingWaiting);
      }
      else if(upDateBooking!==-1){
        tempListBookingWaiting[upDateBooking]=booking.queue
      }
      console.log("updateIndex",booking.queue.status);
      this.setState({
        bookingWaiting: tempListBookingWaiting
      });
      console.log("----SSC_BOOKING_UPDATE---",tempListBookingWaiting);
    })
    
    socket.on('SSC_QUEUE_CONSULTATION_CREATE',(booking)=> {
      console.log("checkQueue",booking);
      let tempListBookingWaiting = [...this.state.bookingWaiting,booking.queue];
      this.setState({
        bookingWaiting: tempListBookingWaiting
      });
      console.log("----SSC_QUEUE_CONSULTATION_CREATE----",tempListBookingWaiting);
    })
    socket.on('disconnect', function(){
        console.log('disconnect', socket)
    });
  }
    render() {
        return (
            <div id="page">
              <Header></Header>
              <div className="main">
              <div className="lt">TƯ VẤN</div>
                <div className="container">
                  <div className="main-page">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="main-right">
                            <table>
                              <thead>
                                <tr>
                                  <th className="stt2">#</th>
                                  <th className="name2" onClick={this.handleShowPopup}>Khách hàng</th>
                                  <th className="phone">Điện thoại</th>
                                  <th className="service">Trạng thái</th>
                                  <th className="time">Thời gian</th>
                                </tr>
                              </thead>
                              <tbody>
                              {this.state.bookingWaiting.map((item,i)=>{
                                var status = findStatus(functionCounselors, item.status)

                                return (item.status==="WAIT" ||  item.status==="IS_CALLING" || item.status==="IN_PROGRESS" || item.status==="COMPLETE") && <tr key={i}>
                                  <td>
                                    <div className="td">
                                      <li className="td-li">{i+1}</li>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="td-name">
                                      <li className="td-li">{item.booking.partnerName}</li>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="td-phone">
                                      <li className="td-li">{item.booking.partnerPhoneNumber.replace(item.booking.partnerPhoneNumber.slice(3,9,10),"ₓₓₓₓₓ")}</li>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="td-dv">
                                      <li className="td-li" style={{color:`${status!==null && status.color}`}}>
                                       {status!==null?status.returnStatus:item.status}</li>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="td-time">
                                    <li className="td-li"><Moment format="hh:mm">{item.booking.updated}</Moment> - <Moment format="DD/MM/YYYY">{item.booking.updated}</Moment></li>
                                    </div>
                                  </td>
                                </tr>
                                })}
                              </tbody>
                              <Modal  centered={true} size="xl" show={this.state.showPopup} onHide={()=>this.handleClosePopup()}>
                                <Modal.Header closeButton>
                                </Modal.Header>
                                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                                <Modal.Footer>
                                  <Button variant="secondary" onClick={()=>this.handleClosePopup()}>
                                    Close
                                  </Button>
                                  <Button variant="primary" onClick={()=>this.handleClosePopup()}>
                                    Save Changes
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </table>

                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div> 
              <div id="footer">
                <Footer></Footer>
              </div>
            </div>
        );
    }
}

export default Counselors;