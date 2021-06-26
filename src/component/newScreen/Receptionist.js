import React, { Component } from 'react';
import '../design/style.css'
import Footer from './general/Footer';
import Header from './general/Header';
import axios from 'axios';
import Moment from 'react-moment';
import {functionColorStatus} from '../../ListReceptionist'
import _ from "lodash"
import {tokenGeneral} from '../Token'
import {socket} from '../../socket/Socket'
import { apiReceptionist } from '../../api/Api';
console.log("FC",functionColorStatus);

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


class Receptionist extends Component {
  constructor(props) {
    super(props);
    this.state={
      bookingWaiting :[
    ],
  }
}
// scrollToBottom = () => {
//   const scroll = this.chatContainer.current.scrollHeight - this.chatContainer.current.clientHeight;
//   this.chatContainer.current.scrollTo(0, scroll);
//   console.log("scroll",croll);
// };

  componentDidMount(){
    let from = new Date().setHours(0,0)
    let to = new Date().setHours(23,59)
    const token=JSON.parse(localStorage.getItem(`tokenGeneral`))
    console.log("tokenRes",token);
    axios.defaults.headers.token = token
    axios.post(apiReceptionist,{
              branchCode:{
                in: ['GZRZqMRR']
            },
            status: {
              in: ['1']
          },
          partnerId: {
              equal: "98das6v87a87avd6v78vads68da"
          },
            appointmentDateFinal: {
                object: {
                  date: {
                      from: from,
                      to: to
                  }
                }
            },
            sort: {
              "created": 1 
          },
        "limit": 100,
        "page": 1
    })
      .then(res => {
        this.setState({bookingWaiting:res.data.data})
        console.log("bookingFilter",res.data.data);
    })
    socket.on('connect',function() {
        console.log('connect ok', socket.id)
    });
    socket.on('SSC_BOOKING_UPDATE', (booking)=> {
        console.log("check",booking);

        let tempListBookingWaiting = [...this.state.bookingWaiting];
        let indexBooking = tempListBookingWaiting.findIndex(item=> item._id === booking.booking._id);
        if(indexBooking !==-1){
          tempListBookingWaiting[indexBooking] = booking.booking;
        }
        this.setState({
          bookingWaiting: tempListBookingWaiting
        })
        console.log("----SSC_BOOKING_UPDATE----",tempListBookingWaiting)
    });
    socket.on('SSC_QUEUE_CONSULTATION_CREATE',(booking)=> {
      console.log("checkQueue",booking);
      let tempListBookingWaiting = [...this.state.bookingWaiting,booking.queue.booking];
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

       console.log("color",functionColorStatus);
        return (
            <div id="page">
              <div id="header">
                <Header></Header>
              </div>
              <div id="content">
                <div className="main">
                  <div className="lt">LỄ TÂN</div>
                  <div className="container">
                    <div className="main-page">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="main-right">
                            <div className="thead">
                              <table>
                                <thead>
                                  <tr>
                                    <th className="stt2">#</th>
                                    <th className="name2">Khách hàng</th>
                                    <th className="phone">Điện thoại</th>
                                    <th className="service">Trạng thái</th>
                                    <th className="time">Thời gian</th>
                                  </tr>
                                </thead>
                                </table>
                                </div>
                                <div className="tbody">
                                <table className="tbody">
                                <tbody>
                                {this.state.bookingWaiting.map((item,i)=>{
                                  var status = findStatus(functionColorStatus, item.status)
                              
                                    return item.status !=="WAIT" && <tr key={i}>
                                    <td>
                                      <div className="td">
                                        <li className="td-li">{i+1}</li>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="td-name">
                                        <li className="td-li">{item.partnerName}</li>
                                        {/* <li className="td-li">{"0"+item.partnerPhone.phoneNumber.replace(item.partnerPhone.phoneNumber.slice(6,10),"***")}</li> */}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="td-phone">
                                        <li className="td-li">{item.partnerPhoneNumber.replace(item.partnerPhoneNumber.slice(3,9,10),"ₓₓₓₓₓ")}</li>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="td-dv" >
                                        <li className="td-li" style={{color:`${status!==null && status.color}`}}>
                                       {status!==null?status.returnStatus:item.status}</li>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="td-time">
                                        <div className="row">
                                          <div className="col-md-4">
                                          <label className="td-times" style={{color:'blue'}}><Moment format="hh:mm">{item.checkInAt}</Moment></label>
                                          </div>
                                          <div className="col-md-4">
                                          <label className="td-date" style={{color:'#640e9a'}}><Moment className="date" format="DD/MM/YYYY">{item.checkInAt}</Moment></label>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                    })} 
                                </tbody>
                              </table>
                              </div>
                            </div>
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

export default Receptionist;