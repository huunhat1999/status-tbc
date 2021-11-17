import React, { Component } from 'react';
import '../design/style.css'
import Footer from './general/Footer';
import Header from './general/Header';
import axios from 'axios';
import Moment from 'react-moment';
import {functionColorStatus} from '../../ListReceptionist'
import _, { isEmpty } from "lodash"
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
import ActionBranch from './ActionBranch';

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
    bookingStatus:{},
    openBranch : true,
  }
}

closeDel = () => this.setState({openCongratulation: false});

scrollToBottom = () => {
  if(!isEmpty(this.chatContainer.current))
  {
      const scroll = this.chatContainer.current?.scrollHeight - this.chatContainer.current.clientHeight;
     
      this.chatContainer.current.scrollTo(0,scroll);
      console.log("scroll",scroll);
  }
  
};
openBranch = () => {
  this.setState({openBranch:true})
}
closeBranch = () => {
  this.setState({openBranch:false})
}
componentDidUpdate(prevProps, prevState) {
    if (this.props.isSend===false) 
      {
      this.scrollToBottom(); 
      }
  console.log('componentDidUpdate scroll')
  this.scrollToBottom(); 
}

onScroll = () => {
  const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
  const scrollTop = this.chatContainer.current.scrollTop
  if(scrollTop===0)
  {
  }
} 
reload = () =>{
  var branchCode = localStorage.getItem('branch')
  console.log(branchCode);
    let from = new Date().setHours(0,0)
    let to = new Date().setHours(23,59)
    // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTVjNjI3ZjUzMWM4MzAwMTM0ZDJlY2MiLCJlbXBsb3llZUNvZGUiOiJERVZfVSIsImVtcGxveWVlSWQiOiI2MTVjNjIxZTUzMWM4MzAwMTM0ZDJlY2IiLCJuYW1lIjoiRGV2IEFjY291bnQiLCJ1c2VyTmFtZSI6ImRldmFjYyIsInVzZXJUeXBlIjoiY2xpZW50IiwiYnJhbmNoQ29kZUFyciI6WyJDTjMyIiwiQkgiXSwiYXBwTmFtZSI6Ik1OR19BUFAiLCJpYXQiOjE2MzY5Njc1MDIsImV4cCI6NDc5MDU2NzUwMn0.2oLm_rnWPigZRpo6upLSAVC0eVG5knl4IT3BT5ZfiyU'
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmZkMTY4ZDE0YmI3ZDI1ZGNlNDc1ZDIiLCJlbXBsb3llZUNvZGUiOiJURUNILjAyIiwiZW1wbG95ZWVJZCI6IjVmZmQxNWQzMTRiYjdkMjVkY2U0NzVkMCIsImVtYWlsIjoidHJhbmh1dW5oYXQyMkBnbWFpbC5jb20iLCJuYW1lIjoiVHLhuqduIE5o4bqtdCIsInVzZXJOYW1lIjoibmhhdHRoIiwidXNlclR5cGUiOiJjbGllbnQiLCJicmFuY2hDb2RlQXJyIjpbIkNhblRob0JyYW5jaCIsIkdaUlpxTVJSIiwiVHNHZ0pubWgiXSwiYXBwTmFtZSI6IkJJX0FQUCIsImlhdCI6MTYzNzA3NzI5MSwiZXhwIjoxNjM3MTYzNjkxfQ.kUJZuHohbNNXiqWnTFIub5jgLaGqchej3zBqhNYS988'
    console.log("tokenRes",token);
    axios.defaults.headers.token = token
    axios.post(apiReceptionist,{
      "condition":{
            checkInAt: {
              from: from,
              to: to
            },
            branchCode:{
              in: [branchCode]
           },
        },
        "sort": {
          "checkInAt":1
      },
        "limit": 1000,
        "page": 1
    })
    .then(res => {
      console.log("bookingFilterssss",res.data);
        this.setState({bookingWaiting:res.data.data})
    })
    
}
  componentDidMount(){
    var branchCode = localStorage.getItem('branch')
    console.log(branchCode);
    let from = new Date().setHours(0,0)
    let to = new Date().setHours(23,59)
    // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTVjNjI3ZjUzMWM4MzAwMTM0ZDJlY2MiLCJlbXBsb3llZUNvZGUiOiJERVZfVSIsImVtcGxveWVlSWQiOiI2MTVjNjIxZTUzMWM4MzAwMTM0ZDJlY2IiLCJuYW1lIjoiRGV2IEFjY291bnQiLCJ1c2VyTmFtZSI6ImRldmFjYyIsInVzZXJUeXBlIjoiY2xpZW50IiwiYnJhbmNoQ29kZUFyciI6WyJDTjMyIiwiQkgiXSwiYXBwTmFtZSI6Ik1OR19BUFAiLCJpYXQiOjE2MzY5Njc1MDIsImV4cCI6NDc5MDU2NzUwMn0.2oLm_rnWPigZRpo6upLSAVC0eVG5knl4IT3BT5ZfiyU'
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmZkMTY4ZDE0YmI3ZDI1ZGNlNDc1ZDIiLCJlbXBsb3llZUNvZGUiOiJURUNILjAyIiwiZW1wbG95ZWVJZCI6IjVmZmQxNWQzMTRiYjdkMjVkY2U0NzVkMCIsImVtYWlsIjoidHJhbmh1dW5oYXQyMkBnbWFpbC5jb20iLCJuYW1lIjoiVHLhuqduIE5o4bqtdCIsInVzZXJOYW1lIjoibmhhdHRoIiwidXNlclR5cGUiOiJjbGllbnQiLCJicmFuY2hDb2RlQXJyIjpbIkNhblRob0JyYW5jaCIsIkdaUlpxTVJSIiwiVHNHZ0pubWgiXSwiYXBwTmFtZSI6IkJJX0FQUCIsImlhdCI6MTYzNzA3NzI5MSwiZXhwIjoxNjM3MTYzNjkxfQ.kUJZuHohbNNXiqWnTFIub5jgLaGqchej3zBqhNYS988'
    console.log("tokenRes",token);
    axios.defaults.headers.token = token
    axios.post(apiReceptionist,{
      "condition":{
            checkInAt: {
              from: from,
              to: to
            },
            branchCode:{
              in: [branchCode]
           },
        },
        "sort": {
          "checkInAt":1
      },
        "limit": 1000,
        "page": 1
    })
    .then(res => {
        this.setState({bookingWaiting:res.data.data})
        console.log("bookingFilter",res.data);
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
              this.setState({openContent:false})
            },5000);
          }) 
          this.scrollToBottom()
        }
        else if(indexBooking !==-1){
          tempListBookingWaiting[indexBooking] = booking.booking;
        }
        this.setState({
          bookingWaiting: tempListBookingWaiting , partnerArr:booking.booking ,bookingStatus:booking.booking
        })
        this.scrollToBottom()
        console.log("----SSC_BOOKING_UPDATE----",tempListBookingWaiting)
    });
    socket.on('SSC_QUEUE_CONSULTATION_CREATE',(booking)=> {
      console.log("checkQueue",booking);
      var tmp = booking.queue.booking
      tmp.queueConsultation=booking.queue
      let tempListBookingWaiting = [...this.state.bookingWaiting,tmp];
      this.setState({
        bookingWaiting: tempListBookingWaiting , bookingStatus:booking.queue.booking
      });
      this.scrollToBottom()
      console.log("----SSC_QUEUE_CONSULTATION_CREATE----",tempListBookingWaiting);
    })
    socket.on('disconnect', function(){
        console.log('disconnect', socket)
    });

  }
  doneChoose = (branch) =>{
    console.log(branch);
    var branchCode = localStorage.getItem('branch')
    if(branchCode!==branch)
    {
      this.reload()
    }
    this.setState({done:true})
}
    render() {
       console.log("color",this.state.bookingStatus);
       const {bookingStatus} = this.state
       var status = findStatus(functionColorStatus, bookingStatus.status)
        return (
            <div id="page">
              <div id="header">
              <Header></Header>
              </div>
              {this.state.openBranch === true&&<ActionBranch reload={this.reload} doneChoose={this.doneChoose} close = {this.closeBranch}/>}
              {this.state.openContent === true ? <Content partnerName = {this.state.partnerArr.partnerName}/> : ""}
              <div id="content" ref={this.chatContainer} onScroll={this.onScroll}>
                <div className="main">
                  <div className="container">
                    <div className="main-page">
                        <div className="row">
                          <div className="col-md-9">
                            <div className="main-right">
                            <TableContainer component={Paper} >
                              <Table  aria-label="simple table" style={{minWidth:650}}  >
                                <TableHead>
                                  <TableRow>
                                    <TableCell >#</TableCell>
                                    <TableCell align="left">Khách hàng</TableCell>
                                    <TableCell align="left">Điện thoại</TableCell>
                                    <TableCell align="left">Trạng thái</TableCell>
                                    <TableCell align="left">Thời gian</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody >
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
                          <div className="col-md-3" >
                          <div className="main-col3" >
                          {bookingStatus!==null?<TableContainer component={Paper} >
                              <Table  aria-label="simple table" style={{minWidth:650}}  >
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="left">Khách hàng</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody  >
                                {bookingStatus.status !=="WAIT" && bookingStatus.status !=="WAS_CHECK_IN" && bookingStatus.status!=="WAS_CHECK_OUT" && <TableRow>
                                    <TableCell>
                                      <div className="td-name">
                                        <li className="td-li">{bookingStatus.partnerName}</li>
                                      </div>
                                      <div className="td-dv" >
                                        <li className="td-li" style={{color:`${status!==null && status.color}`}}>
                                       {status!==null?status.returnStatus:bookingStatus.status}</li>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                  }
                                </TableBody>
                              </Table>
                              </TableContainer>:""}
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