import React, { Component } from 'react';
import Footer from './general/Footer';
import Header from './general/Header';
import axios from 'axios';
import Moment from 'react-moment';
import {functionCounselors} from '../../ListCounselors'
import _ from "lodash"
import { Modal,Button } from 'react-bootstrap';
import { apiCounselors } from '../../api/Api';
import {socket} from '../../socket/Socket'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
  chatContainer = React.createRef();
  constructor(props) {
    super(props);
    document.title="TƯ VẤN";
    this.state={
      bookingWaiting :[
    ],
    showPopup:false,
    isLoading:false,
  }
  }
  // handleShowPopup=()=>{this.setState({showPopup:true})}
  // handleClosePopup=()=>{this.setState({showPopup:false})}

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
    const token=localStorage.getItem(`tokenGeneral`)
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
                <div className="container">
                  <div className="main-page">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="main-right">
                          <TableContainer component={Paper} ref={this.chatContainer} onScroll={this.onScroll}>
                            <Table aria-label="simple table" style={{minWidth:650}}>
                              <TableHead>
                                <TableRow>
                                  <TableCell>#</TableCell>
                                  <TableCell align="left" style={{Width:65}} onClick={this.handleShowPopup}>Khách hàng</TableCell>
                                  <TableCell align="left">Điện thoại</TableCell>
                                  <TableCell align="left">Trạng thái</TableCell>
                                  <TableCell align="left">Thời gian</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                              {this.state.bookingWaiting.map((item,i)=>{
                                var status = findStatus(functionCounselors, item.status)
                                return (item.status==="WAIT" ||  item.status==="IS_CALLING" || item.status==="IN_PROGRESS" || item.status==="COMPLETE") && <TableRow key={i}>
                                  <TableCell>
                                    <div className="td">
                                      <li className="td-li">{item.indexNumber}</li>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="td-name">
                                      <li className="td-li">{item.booking.partnerName}</li>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="td-phone">
                                      <li className="td-li">{item.booking.partnerPhoneNumber.replace(item.booking.partnerPhoneNumber.slice(3,9,10),"ₓₓₓₓₓ")}</li>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="td-dv">
                                      <li className="td-li" style={{color:`${status!==null && status.color}`}}>
                                       {status!==null?status.returnStatus:item.status}</li>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="td-time">
                                    <li className="td-li"><Moment format="hh:mm">{item.booking.updated}</Moment> - <Moment format="DD/MM/YYYY">{item.booking.updated}</Moment></li>
                                    </div>
                                  </TableCell>
                                </TableRow>
                                })}
                              </TableBody>
                              {/* <Modal  centered={true} size="xl" show={this.state.showPopup} onHide={()=>this.handleClosePopup()}>
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
                              </Modal> */}
                            </Table>
                            </TableContainer>
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