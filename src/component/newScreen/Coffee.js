import React, { Component } from 'react';
import Footer from './general/Footer';
import Header from './general/Header';
import io from 'socket.io-client'
import axios from 'axios';
import Moment from 'react-moment';  

class Coffee extends Component {
  constructor(props) {
    super(props);
    this.state={
      bookingWaiting :[
    ],
    data:{}
  }
  }
  componentWillMount(){
    axios.defaults.headers.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTVjNjI3ZjUzMWM4MzAwMTM0ZDJlY2MiLCJlbXBsb3llZUNvZGUiOiJERVZfVSIsImVtcGxveWVlSWQiOiI2MTVjNjIxZTUzMWM4MzAwMTM0ZDJlY2IiLCJuYW1lIjoiRGV2IEFjY291bnQiLCJ1c2VyTmFtZSI6ImRldmFjYyIsInVzZXJUeXBlIjoiY2xpZW50IiwiYnJhbmNoQ29kZUFyciI6WyJDTjMyIiwiQkgiXSwiYXBwTmFtZSI6Ik1OR19BUFAiLCJpYXQiOjE2MzY5Njc1MDIsImV4cCI6NDc5MDU2NzUwMn0.2oLm_rnWPigZRpo6upLSAVC0eVG5knl4IT3BT5ZfiyU'
    axios.post(`https://stagingapi.trangbeautycenter.com/api/bookings/get-data-with-filter`)
      .then(res => {
        let booking = res.data.data
        this.setState({bookingWaiting:booking})
        console.log("booking",booking);
    })
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTVjNjI3ZjUzMWM4MzAwMTM0ZDJlY2MiLCJlbXBsb3llZUNvZGUiOiJERVZfVSIsImVtcGxveWVlSWQiOiI2MTVjNjIxZTUzMWM4MzAwMTM0ZDJlY2IiLCJuYW1lIjoiRGV2IEFjY291bnQiLCJ1c2VyTmFtZSI6ImRldmFjYyIsInVzZXJUeXBlIjoiY2xpZW50IiwiYnJhbmNoQ29kZUFyciI6WyJDTjMyIiwiQkgiXSwiYXBwTmFtZSI6Ik1OR19BUFAiLCJpYXQiOjE2MzY5Njc1MDIsImV4cCI6NDc5MDU2NzUwMn0.2oLm_rnWPigZRpo6upLSAVC0eVG5knl4IT3BT5ZfiyU'
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
    socket.on('SSC_BOOKING_UPDATE', (booking)=> {
        console.log("check",booking);
        console.log("listbooking",this.state.bookingWaiting)

        let tempListBookingWaiting = [...this.state.bookingWaiting];
        let indexBooking = tempListBookingWaiting.findIndex(item=> item._id === booking.booking._id);
        if(indexBooking !==-1){
          tempListBookingWaiting[indexBooking] = booking.booking;
        }
        this.setState({
          bookingWaiting: tempListBookingWaiting
        })
        console.log("index",indexBooking);
    });

    socket.on('SSC_QUEUE_CONSULTATION_CREATE', (booking)=> {
      var bookingCreate = [booking.booking,...this.state.bookingWaiting]
      this.setState({bookingWaiting:bookingCreate})
      console.log("bookingCreate",bookingCreate);
  });
    socket.on('disconnect', function(){
        console.log('disconnect', socket)
    });
  }
    render() {
      const {bookingWaiting}=this.state
      bookingWaiting.forEach(item=>{
        if(item.status==="WAIT_CONSULTATION"){
           item.status="Chờ tư vấn"
        }
        else if(item.status==="WAS_CONSULTED"){
          item.status="Đang tư vấn"
        }
        else if(item.status==="IS_CONSULTING"){
          item.status="Đã tư vấn"
        }
        else if(item.status==="WAIT_PROGRESS"){
          item.status="Chờ điều trị"
       }
       else if(item.status==="IN_PROGRESS"){
         item.status="Đang điều trị"
       }
       else if(item.status==="COMPLETE_PROGRESS"){
         item.status="Hoàn thành điều trị"
        }
      })
        return (
            <div id="page">
            <Header></Header>
            <div className="main">
              <div className="container">
                <div className="main-page">
                  <div className="lt">MÀN HÌNH CHỜ COFFEE</div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="main-right">
                          <table>
                            <thead>
                              <tr>
                                <th className="stt2">STT</th>
                                <th className="name2">KHÁCH HÀNG</th>
                                <th className="phone">SỐ ĐIỆN THOẠI</th>
                                <th className="service">TRẠNG THÁI</th>
                                <th className="time">THỜI GIAN THĂM KHÁM</th>
                              </tr>
                            </thead>
                            <tbody>
                            {this.state.bookingWaiting.map((item,i)=>(
                              <tr key={i}>
                              <td>
                                <div className="td">
                                  <li className="td-li">{i+1}</li>
                                </div>
                              </td>
                              <td>
                                <div className="td-name">
                                  <li className="td-li">{item.partnerName}</li>
                                </div>
                              </td>
                              <td>
                                <div className="td-phone">
                                  <li className="td-li">{item.partnerPhoneNumber}</li>
                                </div>
                              </td>
                              <td>
                                <div className="td-dv" >
                                  <li className="td-li">{item.status}</li>
                                </div>
                              </td>
                              <td>
                                <div className="td-time">
                                  <li className="td-li"><Moment format="hh:mm">{item.checkInAt}</Moment> - <Moment format="DD/MM/YYYY">{item.checkInAt}</Moment></li>
                                </div>
                              </td>
                            </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div> 
            {/* <footer>
              <Footer></Footer>
            </footer> */}
          </div>
        );
    }
}

export default Coffee;