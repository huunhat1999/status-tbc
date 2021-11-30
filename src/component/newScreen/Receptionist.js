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
// import autoscroll from 'autoscroll-react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Content from './Content';
import ActionBranch from './ActionBranch';
import {token} from '../Token'
import Marquee from "react-fast-marquee";

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
  chatContainer1 = React.createRef();
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
    bookingCheckout:[]
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
scrollToBottom1 = () => {
  if(!isEmpty(this.chatContainer.current))
  {
      const scroll = this.chatContainer1.current?.scrollHeight - this.chatContainer1.current.clientHeight;
     
      this.chatContainer1.current.scrollTo(0,scroll);
      console.log("scroll1",scroll);
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
      this.scrollToBottom1();  
      }
  console.log('componentDidUpdate scroll')
  this.scrollToBottom(); 
  this.scrollToBottom1(); 
}

onScroll = () => {
  const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
  const scrollTop = this.chatContainer.current.scrollTop
  if(scrollTop===0)
  {
  }
} 
onScroll1 = () => {
  const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
  const scrollTop = this.chatContainer1.current.scrollTop
  if(scrollTop===0)
  {
  }
} 
 
reload = () =>{
  var branchCode = localStorage.getItem('branch')
    let from = new Date().setHours(0,0)
    let to = new Date().setHours(23,59)
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
           status:{
            notIn:['WAS_CHECK_OUT']
          }
        },
        "sort": {
          "checkInAt":1
      },
        "limit": 1000,
        "page": 1
    })
    .then(res => {
        this.setState({bookingWaiting:res.data.data})
    })
    axios.post(apiReceptionist,{
      "condition":{
            checkInAt: {
              from: from,
              to: to
            },
            branchCode:{
              in: [branchCode]
           },
           status:{
             in:['WAS_CHECK_OUT']
           }
        },
        "sort": {
          "checkInAt":1
      },
        "limit": 1000,
        "page": 1
    })
    .then(res => {
        this.setState({bookingCheckout:res.data.data})
    })
    
}
  componentDidMount(){
    var branchCode = localStorage.getItem('branch')
    let from = new Date().setHours(0,0)
    let to = new Date().setHours(23,59)
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
           status:{
            notIn:['WAS_CHECK_OUT']
          }
        },
        "sort": {
          "checkInAt":1
      },
        "limit": 1000,
        "page": 1
    })
    .then(res => {
        this.setState({bookingWaiting:res.data.data})
    })
    axios.post(apiReceptionist,{
      "condition":{
            checkInAt: {
              from: from,
              to: to
            },
            branchCode:{
              in: [branchCode]
           },
           status:{
             in:['WAS_CHECK_OUT']
           }
        },
        "sort": {
          "checkInAt":1
      },
        "limit": 1000,
        "page": 1
    })
    .then(res => {
        this.setState({bookingCheckout:res.data.data})
    })
    socket.on('connect',function() {
    });
    socket.on('SSC_BOOKING_UPDATE', (booking)=> {
      var branchCodeChill = localStorage.getItem('branch')
        let tempListBookingWaiting = [...this.state.bookingWaiting];
        let tempListBookingWaiting1 = [...this.state.bookingCheckout,booking.booking];
        let indexBooking = tempListBookingWaiting.findIndex(item=> item._id === booking.booking._id);
        console.log("indexBooking",indexBooking);

        if(booking.booking.status === "WAS_CHECK_OUT" && indexBooking >-1){
          tempListBookingWaiting.splice(indexBooking,1)
          this.setState({bookingWaiting:tempListBookingWaiting,bookingCheckout:tempListBookingWaiting1,partnerArr:booking.booking,openContent:true},()=>{
            setTimeout(() => {
              this.setState({openContent:false})
            },5000);
          }) 
          this.scrollToBottom()
        }
        // if(booking.booking.status === "WAS_CHECK_OUT"){
        //   this.setState({bookingCheckout:tempListBookingWaiting1})
        //   this.scrollToBottom1(); 
        // }
        else if(indexBooking >-1 && branchCodeChill === booking?.booking?.branchCode){
          tempListBookingWaiting[indexBooking] = booking.booking;
          this.setState({bookingStatus:booking.booking,bookingWaiting: tempListBookingWaiting,partnerArr:booking.booking})
          this.scrollToBottom()
        }
        // this.setState({
        //   bookingWaiting: tempListBookingWaiting , partnerArr:booking.booking ,bookingStatus:booking.booking
        // })
        this.scrollToBottom()
        console.log("----SSC_BOOKING_UPDATE----",tempListBookingWaiting)
    });
    socket.on('SSC_QUEUE_CONSULTATION_CREATE',(booking)=> {
      var branchCodeCreate = localStorage.getItem('branch')
      var tmp = booking.queue.booking
      tmp.queueConsultation=booking.queue
      let tempListBookingWaiting = [...this.state.bookingWaiting,tmp];
      if(branchCodeCreate === booking?.queue?.booking?.branchCode){
        this.setState({bookingStatus:booking.queue.booking,bookingWaiting: tempListBookingWaiting ,})
      }
      this.scrollToBottom()
      console.log("----SSC_QUEUE_CONSULTATION_CREATE----",tempListBookingWaiting);
    })
    socket.on('disconnect', function(){
        console.log('disconnect', socket)
    });

  }
  doneChoose = (branch) =>{
    var branchCode = localStorage.getItem('branch')
    if(branchCode!==branch)
    {
      this.reload()
    }
    this.setState({done:true})
}

renderStatus = () =>{
  const {bookingStatus} = this.state
  var status = findStatus(functionColorStatus, bookingStatus.status)
  
  switch (bookingStatus.status) {
    case "IS_CONSULTING":
        return  <>
        <span className="pop-status"
         style={{
         display: 'block',
            width: 'fit-content',
            padding: '0px 12px',
            borderRadius: 16,
            margin: '0px 12px 0px 12px',
            fontSize: 16,
                }}>
              {status!==null?status.returnStatus:bookingStatus.status} 
          </span> - <span className="pop-contact">{bookingStatus?.queueConsultation?.consultingRoom?.name}</span>
          {/* <span className="pop-position">
            Tư vấn viên
          </span> */}
 
        </>
    case "IN_PROGRESS":
        return  <>
         <span className="pop-status"
         style={{
         display: 'block',
            width: 'fit-content',
            padding: '0px 12px',
            borderRadius: 16,
            margin: '0px 12px 0px 12px',
            fontSize: 16,
                }}>
              {status!==null?status.returnStatus:bookingStatus.status}  
          </span> - <span className="pop-contact">{bookingStatus?.latestTreatmentQueue?.treatmentDoctor?.name}</span>
          {/* <span className="pop-position">
            Bác sĩ
          </span> */}
        </>
  
    default:
      return  <span className="pop-status"
      style={{
      display: 'block',
         width: 'fit-content',
         padding: '0px 12px',
         borderRadius: 16,
         margin: '0px 12px 0px 12px',
         fontSize: 16,
             }}>
           {status!==null?status.returnStatus:bookingStatus.status}
       </span>
  }
}


  toggleFullScreen=()=> {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

    render() {
       console.log("bookingStatus",this.state.bookingStatus);
       const {bookingStatus, bookingWaiting,bookingCheckout} = this.state
       console.log("bookingWaiting",bookingCheckout);

       let tmpBookingWaiting = bookingWaiting.filter((item)=> {
         if(item.status !=="WAIT" && 
         item.status !=="WAS_CHECK_IN" && 
         item.status!=='CANCEL'&&
         item.status!=="WAS_CHECK_OUT")
          {
            return item
          }
       })
        return (
            <div id="page">
              <div id="header">
              <Header toggleFullScreen ={this.toggleFullScreen}></Header>
              </div>
              {this.state.openBranch === true&&<ActionBranch reload={this.reload} doneChoose={this.doneChoose} close = {this.closeBranch}/>}
              {this.state.openContent === true ? <Content partnerName = {this.state.partnerArr.partnerName}/> : ""}
              <div id="content" >
                <div className="main">
                  <div className="container" style={{marginTop:12}}>
                        <div className="row" >
                          <div className="col-md-9"  >
                              <div className="popup"style={{
                                display: 'flex',
                                paddingLeft: 0,
                                position:'relative',height:66
                              }} >
                                   
                                              <div className="popUpPartnerTop">
                                              <div className="waitPopup">❀ Hàng chờ</div>
                                              {  !isEmpty(bookingStatus.status) &&
                                        (bookingStatus.status!=='WAIT'&&
                                            bookingStatus.status!=='WAS_CHECK_IN'&&
                                            bookingStatus.status!=='CANCEL'&&
                                            bookingStatus.status!=='WAS_CHECK_OUT')&&
                                             
                                                 <Marquee direction="left" speed={40} delay={0} gradientColor={0}>
                                                <div className="marquee">
                                               
                                                <div className="pop-name">
                                                  {bookingStatus.partnerName}
                                                </div>
                                                <div className="pop-des" >
                                                  {this.renderStatus()}
                                                  </div>
                                             
                                                  </div>
                                                  </Marquee>   
                                                  }
                                              </div>
                                      
                              </div>
                            <div className="main-right" style={{height: 'calc(100vh - 270px)',overflowY: 'scroll',marginTop:8}} ref={this.chatContainer} onScroll={this.onScroll}>
                            <TableContainer component={Paper} >
                              <Table  aria-label="simple table" style={{minWidth:650}}  >
                                <TableHead>
                                  <TableRow>
                                    <TableCell >#</TableCell>
                                    <TableCell align="left">Khách hàng</TableCell>
                                    {/* <TableCell align="left">Điện thoại</TableCell> */}
                                    <TableCell align="left">Trạng thái</TableCell>
                                    <TableCell align="left">Thời gian</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody >
                                {tmpBookingWaiting.length>0&&tmpBookingWaiting.map((item,i)=>{
                                  var status = findStatus(functionColorStatus, item.status)
                                    return item.status !=="WAIT" && 
                                    item.status !=="WAS_CHECK_IN" && 
                                    bookingStatus.status!=='CANCEL'&&
                                    item.status!=="WAS_CHECK_OUT" && 
                                    <TableRow key={i}>
                                    <TableCell>
                                      <div className="td">
                                        <li className="td-li">{i+1}</li>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="td-name">
                                        <li className="td-li">{item.partnerName}
                                        <div className="phoneLeftTable">{item.partnerPhoneNumber.replace(item.partnerPhoneNumber.slice(3,9,10),"••••••")}</div>
                                        </li>
                                        {/* <li className="td-li">{"0"+item.partnerPhone.phoneNumber.replace(item.partnerPhone.phoneNumber.slice(6,10),"***")}</li> */}
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
                                      <p className="td-li" style={{
                                        fontSize: '0.9rem',
                                        marginBottom: 0
                                      }}>
                                        <Moment format="hh:mm">{item.updated}</Moment> 
                                      </p>
                                      <p className="td-li" style={{
                                        fontSize: '12px',
                                        color: '#9e9e9e',
                                        marginBottom: 0,
                                        fontStyle:'italic'
                                      }}>
                                        Check In: <Moment format="hh:mm">{item.checkInAt}</Moment> 
                                      </p>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                    })} 
                                </TableBody>
                              </Table>
                              </TableContainer>
                            </div>
                          </div>
                          <div className ="col-md-3" >
                            <div className="complete">❀ <span style={{fontWeight:500}}>Chúc mừng</span> <br/> 
                            <span className="chillSize" >{bookingCheckout.length}</span> khách hàng đã hoàn thành điều trị </div>
                            {/* <div className="row" > */}
                            <div className="statusCheckout" style={{height: 'calc(100vh - 270px)',overflowY: 'scroll',marginTop:8}} ref={this.chatContainer1} onScroll={this.onScroll1}>
                              {bookingCheckout.length>0&&bookingCheckout.map((checkout,iii)=>{
                                return checkout.status==="WAS_CHECK_OUT" &&<div className="itemCheckout" key={iii}>
                                  <div className="chillCheckout">
                                    <div className="nameCheckout">{iii+1}. {checkout?.partnerName}</div>
                                    <div className="timeCheckout"><Moment format="HH:ss">{checkout?.checkOutAt}</Moment></div>
                                  </div>
                                   <p>{checkout?.partnerPhoneNumber.replace(checkout.partnerPhoneNumber.slice(3,9,10),"••••••")}</p>
                             
                                </div>
                              })}
                            {/* </div> */}
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

export default ( Receptionist);