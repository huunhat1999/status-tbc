import React, { Component } from 'react';
import Footer from './general/Footer';
import Header from './general/Header';
import io from 'socket.io-client'
import axios from 'axios';
import Moment from 'react-moment';
import {functionTech} from '../../LisTechnicians'
import {functionDoctor} from '../../LisTechnicians'
import _ from "lodash"
 
const findStatus = (data, val) => {
  var tmp = _.filter(data, {listStatus: val})
  console.log(tmp);
  if(tmp.length>0)
  {
    return tmp[0]
  }
  else
  {
    return null
  }
}

// const doctor = (data, val) => {
//   console.log("ssss",data);
//   console.log("val",val);
//   var tmp = _.filter(data, {listDoctor: val})
//   console.log(tmp);
//   if(tmp.length>0)
//   {
//     return tmp[0]
//   }
//   else
//   {
//     return null
//   }
// }
class Technicians extends Component {
  constructor(props) {
    super(props);
    this.state={
      bookingWaiting :[
    ],
  }
  }
  componentWillMount(){
    let from = new Date().setHours(0,0)
    let to = new Date().setHours(23,59)
    axios.defaults.headers.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmZkMTY4ZDE0YmI3ZDI1ZGNlNDc1ZDIiLCJlbXBsb3llZUNvZGUiOiJURUNILjAyIiwiZW1wbG95ZWVJZCI6IjVmZmQxNWQzMTRiYjdkMjVkY2U0NzVkMCIsImVtYWlsIjoibmhhdC50cmFuQHRhbmhvbmdteWdyb3VwLmNvbSIsIm5hbWUiOiJUcuG6p24gSOG7r3UgTmjhuq10IiwidXNlck5hbWUiOiJuaGF0dGgiLCJ1c2VyVHlwZSI6ImNsaWVudCIsImJyYW5jaENvZGVBcnIiOltdLCJhcHBOYW1lIjoiQklfQVBQIiwiaWF0IjoxNjI0NTg0MTAxLCJleHAiOjE2MjQ2NzA1MDF9.RjeaeCP4NwqN1m7XoFxmC7SASLx_EhsQYtns23RLJ8k'
    axios.get(`https://stagingapi.trangbeautycenter.com/api/treatment-queue`,{params:{
      "condition": {
        "created": {
          "from": from,
          "to":to, 
        }
      },
      "sort": {
          "created": 1
      },
      "limit": 10,
      "page": 1
  }})
      .then(res => {  
        this.setState({bookingWaiting:res.data.data})
        console.log("booking",res.data.data);
    })
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmZkMTY4ZDE0YmI3ZDI1ZGNlNDc1ZDIiLCJlbXBsb3llZUNvZGUiOiJURUNILjAyIiwiZW1wbG95ZWVJZCI6IjVmZmQxNWQzMTRiYjdkMjVkY2U0NzVkMCIsImVtYWlsIjoibmhhdC50cmFuQHRhbmhvbmdteWdyb3VwLmNvbSIsIm5hbWUiOiJUcuG6p24gSOG7r3UgTmjhuq10IiwidXNlck5hbWUiOiJuaGF0dGgiLCJ1c2VyVHlwZSI6ImNsaWVudCIsImJyYW5jaENvZGVBcnIiOltdLCJhcHBOYW1lIjoiQklfQVBQIiwiaWF0IjoxNjI0NTg0MTAxLCJleHAiOjE2MjQ2NzA1MDF9.RjeaeCP4NwqN1m7XoFxmC7SASLx_EhsQYtns23RLJ8k';
    const host = 'https://stagingapi.trangbeautycenter.com/mng-app'
    const socket = io(host, {
      query: {
        accessToken: token
      },
      transports: ['websocket']
    });
    
    socket.on('connect',function() {
        console.log('connect ok', socket.id)
    });
    socket.on('SSC_TREATMENT_QUEUE_UPDATE', (booking)=> {
      console.log("checkTre",booking);
      console.log("listbooking",this.state.bookingWaiting)

      let tempListBookingWaiting = [...this.state.bookingWaiting];
      let upDateBooking = tempListBookingWaiting.findIndex(item=>item._id === booking.queue._id);
      if(upDateBooking!==-1){
        tempListBookingWaiting[upDateBooking]=booking.queue
      }
      this.setState({
        bookingWaiting: tempListBookingWaiting
      });
      console.log("----SSC_TREATMENT_QUEUE_UPDATE---",tempListBookingWaiting);
    })

    socket.on('SSC_TREATMENT_QUEUE_CREATE', (queue)=> {
     console.log("createTreatment",queue);
     let tempListBookingWaiting = [queue.queue,...this.state.bookingWaiting];
     this.setState({
       bookingWaiting: tempListBookingWaiting
     });
     console.log("----SSC_TREATMENT_QUEUE_CREATE----",tempListBookingWaiting);
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
            <div className="lt">BÁC SĨ</div>
              <div className="container">
                <div className="main-page">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="main-right">
                          <table>
                            <thead>
                              <tr>
                              <th className="stt2">#</th>
                                <th className="name2">Khách hàng</th>
                                <th className="phone">Điện thoại</th>
                                <th className="service">Trạng thái</th>
                                <th className="technical">Bác sĩ</th>
                                <th className="time">Thời gian</th>
                              </tr>
                            </thead>
                            <tbody>
                            {this.state.bookingWaiting.map((item,i)=>{
                              // if(item.booking!==null){
                              var status = findStatus(functionTech, item.status)
                              return (item.status==="WAIT" ||  item.status==="IS_CALLING" ||  item.status==="IN_PROGRESS" || item.status==="COMPLETE") && <tr key={i}>
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
                                     <li className="td-li" >{item.booking.partnerPhoneNumber.replace(item.booking.partnerPhoneNumber.slice(3,9,10),"ₓₓₓₓₓ")}</li>
                                  </div>
                                </td>
                                <td>
                                <div className="td-dv">
                                     <li className="td-li"style={{color:`${status!==null && status.color}`}}>
                                       {status!==null?status.returnStatus:item.status}</li>
                                  </div> 
                                </td>
                                <td>
                                  <div className="td-tech">
                                    <li className="td-li" >{item.treatmentServices.map((item,i)=>{
                                      return  <div style={{backgroundColor:`${status!==null && status.color}`}} key={i}><label className="divDV">{" Liệu trình "+(i+1)+" :"  }</label> { item.assignedTreatmentDoctorCode}</div>
                                    })}</li>
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

export default Technicians;