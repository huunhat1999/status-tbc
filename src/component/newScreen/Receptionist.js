import React, { Component } from 'react';
import '../design/style.css'
import Footer from './general/Footer';
import Header from './general/Header';
import axios from 'axios';
import Moment from 'react-moment';
import {functionColorStatus} from '../../ListReceptionist'
import _ from "lodash"
import {socket} from '../../socket/Socket'
import { apiReceptionist } from '../../api/Api';
import autoscroll from 'autoscroll-react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Content from './Content';

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
  chatContainer = React.createRef();
  constructor(props) {
    super(props);
    document.title="LỄ TÂN";
    this.state={
      bookingWaiting :[
    ],
    isLoading:false,
    openCongratulation:false,
    openContent:false,
    partnerArr : [],
  }
}

closeDel = () => this.setState({openCongratulation: false});
scrollToBottom = () => {
  const scroll = this.chatContainer.current.scrollHeight - this.chatContainer.current.clientHeight;
  this.chatContainer.current.scrollTo(0, scroll);
  console.log("scroll",scroll);
};

componentDidUpdate(prevProps, prevState) {
          
  if (this.state.isLoading===false && prevState.isLoading === false) 
  {
     this.scrollToBottom(); 
  }
}
onScroll = () => {
  const scrollTop = this.chatContainer.current.scrollTop
  if(scrollTop===0)
  {
      this.setState({isLoading: true})
  }
} 
  componentDidMount(){
    let from = new Date().setHours(0,0)
    let to = new Date().setHours(23,59)
    console.log("from",to);
    const token=localStorage.getItem(`tokenGeneral`)
    console.log("tokenRes",token);
    axios.defaults.headers.token = token
    axios.post(apiReceptionist,{
      "condition":{
            checkInAt: {
              from: from,
              to: to
            },
          },
              branchCode:{
                in: ['GZRZqMRR']
            },
            sort: {
              "created": -1 
          },
        "limit": 1000,
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
        if(booking.booking.status === "WAS_CHECK_OUT"){
          tempListBookingWaiting.splice(indexBooking,1)
          this.setState({bookingWaiting:tempListBookingWaiting, openContent:true},()=>{
            setTimeout(() => {
              this.setState({openContent:true})
            });
          }) 
        }
        else if(indexBooking !==-1){
          tempListBookingWaiting[indexBooking] = booking.booking;
        }
        this.setState({
          bookingWaiting: tempListBookingWaiting , partnerArr:booking.booking
        })
        console.log("----SSC_BOOKING_UPDATE----",tempListBookingWaiting)
    });
    socket.on('SSC_QUEUE_CONSULTATION_CREATE',(booking)=> {
      console.log("checkQueue",booking);
      var tmp = booking.queue.booking
      tmp.queueConsultation=booking.queue
      let tempListBookingWaiting = [...this.state.bookingWaiting,tmp];
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
       console.log("color",this.state.partnerArr);
        return (
            <div id="page">
              <div id="header">
              <Header></Header>
              </div>
              {this.state.openContent === true ? <Content partnerName = {this.state.partnerArr.partnerName}/> : ""}
              <div id="content">
                <div className="main">
                  <div className="container">
                    <div className="main-page">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="main-right">
                            <TableContainer component={Paper} ref={this.chatContainer} onScroll={this.onScroll}>
                              <Table  aria-label="simple table" style={{minWidth:650}} >
                                <TableHead>
                                  <TableRow>
                                    <TableCell >#</TableCell>
                                    <TableCell align="left">Khách hàng</TableCell>
                                    <TableCell align="left">Điện thoại</TableCell>
                                    <TableCell align="left">Trạng thái</TableCell>
                                    <TableCell align="left">Thời gian</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                {this.state.bookingWaiting.map((item,i)=>{
                                  var status = findStatus(functionColorStatus, item.status)
                                    return item.status !=="WAIT" && item.status !=="WAS_CHECK_IN" && item.status!=="WAS_CHECK_OUT" && <TableRow key={i}>
                                    <TableCell>
                                      <div className="td">
                                        <li className="td-li">{_.get(item,'queueConsultation.indexNumber','')}</li>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="td-name">
                                        <li className="td-li">{item.partnerName}</li>
                                        {/* <li className="td-li">{"0"+item.partnerPhone.phoneNumber.replace(item.partnerPhone.phoneNumber.slice(6,10),"***")}</li> */}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="td-phone">
                                        <li className="td-li">{item.partnerPhoneNumber.replace(item.partnerPhoneNumber.slice(3,9,10),"ₓₓₓₓₓ")}</li>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="td-dv" >
                                        <li className="td-li" style={{color:`${status!==null && status.color}`}}>
                                       {status!==null?status.returnStatus:item.status}</li>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="td-time">
                                      <li className="td-li"><Moment format="hh:mm">{item.updated}</Moment> - <Moment format="DD/MM/YYYY">{item.updated}</Moment></li>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                    })} 
                                </TableBody>
                              </Table>
                              </TableContainer>
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

export default autoscroll( Receptionist);