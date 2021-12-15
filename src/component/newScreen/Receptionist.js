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
import { Grid } from '@material-ui/core';
import {data} from './data'

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
  chatContainer2 = React.createRef();
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
    bookingStatusConsultant:{},
    bookingStatusTreatment:{},
    openBranch : true,
    bookingCheckout:[],
    bookingTreatment:[],
    bookingConsultant:[],
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
  if(!isEmpty(this.chatContainer1.current))
  {
      const scroll = this.chatContainer1.current?.scrollHeight - this.chatContainer1.current.clientHeight;
     
      this.chatContainer1.current.scrollTo(0,scroll);
      console.log("scroll1",scroll);
  }
  
};
scrollToBottom2 = () => {
  if(!isEmpty(this.chatContainer2.current))
  {
      const scroll = this.chatContainer2.current?.scrollHeight - this.chatContainer2.current.clientHeight;
     
      this.chatContainer2.current.scrollTo(0,scroll);
      console.log("scroll2",scroll);
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
      this.scrollToBottom2();  
      }
  console.log('componentDidUpdate scroll')
  this.scrollToBottom(); 
  this.scrollToBottom1(); 
  this.scrollToBottom2(); 
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
 
onScroll2 = () => {
  const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
  const scrollTop = this.chatContainer2.current.scrollTop
  if(scrollTop===0)
  {
  }
} 
reload = () =>{
  var branchCode = localStorage.getItem('branch')
    let from = new Date().setHours(0,0)
    let to = new Date().setHours(23,59)
    axios.defaults.headers.token = token
    // axios.post(apiReceptionist,{
    //   "condition":{
    //         checkInAt: {
    //           from: from,
    //           to: to
    //         },
    //         branchCode:{
    //           in: [branchCode]
    //        },
    //        status:{
    //         notIn:['WAS_CHECK_OUT']
    //       }
    //     },
    //     "sort": {
    //       "checkInAt":1
    //   },
    //     "limit": 1000,
    //     "page": 1
    // })
    // .then(res => {
    //     this.setState({bookingWaiting:res.data.data})
    // })
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
             in:['WAIT_CONSULTATION','IS_CONSULTING','WAS_CONSULTED'] 
           }
        },
        "sort": {
          "checkInAt":1
      },
        "limit": 1000,
        "page": 1
    })
    .then(res => {
      console.log(res);
        this.setState({bookingConsultant:res.data.data})
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
             in:['WAIT_PROGRESS','IN_PROGRESS','COMPLETE_PROGRESS'] 
           }
        },
        "sort": {
          "checkInAt":1
      },
        "limit": 1000,
        "page": 1
    })
    .then(res => {
      console.log(res);
        this.setState({bookingTreatment:res.data.data})
    })
}
  componentDidMount(){
    var branchCode = localStorage.getItem('branch')
    let from = new Date().setHours(0,0)
    let to = new Date().setHours(23,59)
    axios.defaults.headers.token = token
    // axios.post(apiReceptionist,{
    //   "condition":{
    //         checkInAt: {
    //           from: from,
    //           to: to
    //         },
    //         branchCode:{
    //           in: [branchCode]
    //        },
    //        status:{
    //         notIn:['WAS_CHECK_OUT']
    //       }
    //     },
    //     "sort": {
    //       "checkInAt":1
    //   },
    //     "limit": 1000,
    //     "page": 1
    // })
    // .then(res => {
    //     this.setState({bookingWaiting:res.data.data})
    // })
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
             in:['WAIT_CONSULTATION','IS_CONSULTING','WAS_CONSULTED'] 
           }
        },
        "sort": {
          "checkInAt":1
      },
        "limit": 1000,
        "page": 1
    })
    .then(res => {
      console.log(res);
        this.setState({bookingConsultant:res.data.data})
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
             in:['WAIT_PROGRESS','IN_PROGRESS','COMPLETE_PROGRESS'] 
           }
        },
        "sort": {
          "checkInAt":1
      },
        "limit": 1000,
        "page": 1
    })
    .then(res => {
      console.log(res);
        this.setState({bookingTreatment:res.data.data})
    })
    socket.on('connect',function() {
    });
    socket.on('SSC_BOOKING_UPDATE', (booking)=> {
      var branchCodeChill = localStorage.getItem('branch')
        let tempListBookingConsultant = [...this.state.bookingConsultant];
        let tempListBookingWaiting1 = [...this.state.bookingCheckout,booking.booking];
        let indexConsultant = tempListBookingConsultant.findIndex(item=> item._id === booking.booking._id);
        let tempListBookingTreatment = [...this.state.bookingTreatment];
        let indexTreatment = this.state.bookingTreatment.findIndex(item=>item._id===booking.booking._id)
        if(localStorage.getItem('branch')===booking?.booking?.branchCode){
        if(indexConsultant >-1){
          tempListBookingConsultant[indexConsultant] = booking.booking;
          this.setState({bookingConsultant:tempListBookingConsultant})
          this.scrollToBottom()
        }

        if(booking.booking.status==="WAIT_PROGRESS"){
          tempListBookingConsultant.splice(indexConsultant,1)
         let treatmentTemp = [...tempListBookingTreatment,booking.booking]
          this.setState({bookingConsultant:tempListBookingConsultant , bookingTreatment:treatmentTemp})
          this.scrollToBottom()
        }

        if(indexTreatment>-1){
          tempListBookingTreatment[indexTreatment] = booking.booking
          this.setState({bookingTreatment:tempListBookingTreatment})
          this.scrollToBottom()
        }
        
        if(booking.booking.status === "WAS_CHECK_OUT" &&  indexTreatment>-1){
          tempListBookingTreatment.splice(indexTreatment,1)
          this.setState({bookingTreatment:tempListBookingTreatment,bookingCheckout:tempListBookingWaiting1,partnerArr:booking.booking,openContent:true},()=>{
            setTimeout(() => {
              this.setState({openContent:false})
            },5000);
          }) 
          this.scrollToBottom()
        }
        if(booking.booking.status==="WAIT_CONSULTATION" || booking.booking.status==="IS_CONSULTING" || booking.booking.status==="WAS_CONSULTED" ){
          let tempConsultant = this.state.bookingConsultant.filter(x=>x._id===booking.booking._id)
          console.log("tempConsultant",tempConsultant);
          if(tempConsultant.length>0){
          this.setState({bookingStatusConsultant:tempConsultant[0],partnerArr:booking.booking})
        }
        }
        if(booking.booking.status==="WAIT_PROGRESS" || booking.booking.status==="IN_PROGRESS" ||booking.booking.status==="COMPLETE_PROGRESS" ){
          let tempTreatment = this.state.bookingTreatment.filter(x=>x._id===booking.booking._id)
          console.log("tempTreatment",tempTreatment);
          if(tempTreatment.length>0){
          this.setState({bookingStatusTreatment:tempTreatment[0],partnerArr:booking.booking})
          }
        }
        // if(booking.booking.status==="WAIT_PROGRESS" ){
        //   let tempConsultant = this.state.bookingConsultant.filter(x=>x._id===booking.booking._id)
        //   tempConsultant.splice(indexConsultant,1)
        //   if(tempConsultant.length>0){
        //     this.setState({bookingStatusConsultant:tempConsultant[0],partnerArr:booking.booking})
        //   }
        // }
      }
        // else if(branchCodeChill === booking?.booking?.branchCode){
        //   this.setState({partnerArr:booking.booking})
        //   // this.scrollToBottom()
        // }
        // this.setState({
        //   bookingWaiting: tempListBookingWaiting , partnerArr:booking.booking ,bookingStatus:booking.booking
        // })
        this.scrollToBottom()
        console.log("----SSC_BOOKING_UPDATE----",this.state.bookingConsultant)
        console.log("----SSC_BOOKING_UPDATE----",this.state.bookingTreatment)
    });
    socket.on('SSC_QUEUE_CONSULTATION_CREATE',(booking)=> {
      var branchCodeCreate = localStorage.getItem('branch')
      var tmp = booking.queue.booking
      tmp.queueConsultation=booking.queue
      let tempListBookingConsultant = [...this.state.bookingConsultant,tmp];
      if(branchCodeCreate === booking?.queue?.booking?.branchCode){
        this.setState({bookingStatusConsultant:booking.queue.booking,bookingConsultant:tempListBookingConsultant})
      }
      this.scrollToBottom()
      console.log("----SSC_QUEUE_CONSULTATION_CREATE----",tempListBookingConsultant);
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
shuffleArray=(array) =>{
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
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
renderStatusConsultant = () =>{
  const {bookingStatusConsultant} = this.state
  var status = findStatus(functionColorStatus, bookingStatusConsultant.status)
  switch (bookingStatusConsultant.status) {
    case "IS_CONSULTING":
        return  <>
        <span className="pop-status"
         style={{
         display: 'block',
            width: 'fit-content',
            padding: '0px 8px',
            fontSize: 14,
                }}>
              {status!==null?status.returnStatus:bookingStatusConsultant.status} 
          </span> - <span className="pop-contact">{bookingStatusConsultant?.queueConsultation?.consultingRoom?.name}</span>
          {/* <span className="pop-position">
            Tư vấn viên
          </span> */}
 
        </>
    default:
      return  <span className="pop-status"
      style={{
      display: 'block',
         width: 'fit-content',
         padding: '0px 8px',
         fontSize: 14,
             }}>
           {status!==null?status.returnStatus:bookingStatusConsultant.status}
       </span>
  }
}
renderStatusTreatment = () =>{
  const {bookingStatusTreatment} = this.state
  var status = findStatus(functionColorStatus, bookingStatusTreatment.status)
  switch (bookingStatusTreatment.status) {
    case "IN_PROGRESS":
        return  <>
         <span className="pop-status"
         style={{
         display: 'block',
            width: 'fit-content',
            padding: '0px 8px',
            fontSize: 14,
                }}>
              {status!==null?status.returnStatus:bookingStatusTreatment.status}  
          </span> - <span className="pop-contact">{bookingStatusTreatment?.latestTreatmentQueue?.treatmentDoctor?.name}</span>
          {/* <span className="pop-position">
            Bác sĩ
          </span> */}
        </>
  
    default:
      return  <span className="pop-status"
      style={{
      display: 'block',
         width: 'fit-content',
         padding: '0px 8px',
         fontSize: 14,
             }}>
           {status!==null?status.returnStatus:bookingStatusTreatment.status}
       </span>
  }
}


render() {
  const {bookingStatusConsultant,bookingStatusTreatment,bookingCheckout,bookingConsultant,bookingTreatment} = this.state
  let bookingRandom=bookingCheckout
  // var d = new Date()
  // var date = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
  // var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  // var dateTime = date+' '+time;
  // console.log(dateTime);
  // // let timeStart = 
  // if(localStorage.getItem('branch')!=='GZRZqMRR' && new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours() + 1, 0, 0, 0)!==dateTime){
  //   bookingRandom = [...data,...bookingCheckout]
  // }
//  let tmpBookingWaiting = bookingWaiting.filter((item)=> {
//    if(item.status !=="WAIT" && 
//    item.status !=="WAS_CHECK_IN" && 
//    item.status!=='CANCEL'&&
//    item.status!=="WAS_CHECK_OUT")
//     {
//       return item
//     }
//  })
  return (
    <div id="page">
      <div id="header">
        <Header toggleFullScreen ={this.toggleFullScreen}></Header>
      </div>
      {this.state.openBranch === true&&<ActionBranch reload={this.reload} doneChoose={this.doneChoose} close = {this.closeBranch}/>}
      {this.state.openContent === true ? <Content partnerName = {this.state.partnerArr.partnerName}/> : ""}
      <div id="content" >
        <Grid container spacing={2} >
          <Grid item xs={12} md={4}>
            <div className='containMain'>
              <div className="consultant">❀ <span style={{fontWeight:500}}>Tư vấn</span> <br/>
                <div className="popup"style={{
                  display: 'flex',
                  paddingLeft: 0,
                  position:'relative'
                }} >
                  {  !isEmpty(bookingStatusConsultant.status) &&
                    (bookingStatusConsultant.status!=='WAIT'&&
                    bookingStatusConsultant.status!=='WAS_CHECK_IN'&&
                    bookingStatusConsultant.status!=='CANCEL'&&
                    bookingStatusConsultant.status!=='WAS_CHECK_OUT')&&
                    bookingStatusConsultant.status!=="WAIT_PROGRESS" && 
                    bookingStatusConsultant.status!=="IN_PROGRESS" && 
                    bookingStatusConsultant.status!=="COMPLETE_PROGRESS"&&
                  <div className="marquee">
                
                  <div className="pop-name">
                    {bookingStatusConsultant.partnerName}
                  </div>
                  <div className="pop-des" >
                    {this.renderStatusConsultant()}
                    </div>
              
                    </div>
                    }
                        
                </div> 
              </div>
            </div>
            <div className="mainConsultant" >
              <div className='mainHead'>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={1}>
                    <div className='chillStt' >#</div>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <div className='chillName' align="left">Khách hàng</div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className='chillStatus' align="left">Trạng thái</div>
                  </Grid>
                </Grid>
              </div>
              <div className='mainBody' ref={this.chatContainer} onScroll={this.onScroll} >
                {bookingConsultant.length>0&&bookingConsultant.map((item,i)=>{
                  var status = findStatus(functionColorStatus, item.status)
                    return item.status !=="WAIT" && 
                    item.status !=="WAS_CHECK_IN" && 
                    bookingStatusConsultant.status!=='CANCEL'&&
                    item.status!=="WAS_CHECK_OUT" && 
                    item.status!=="WAIT_PROGRESS" && 
                    item.status!=="IN_PROGRESS" && 
                    item.status!=="COMPLETE_PROGRESS"&&
                    <div className='chillBody'>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={1}>
                          <div className='chillStt' key={i}>
                            <div className='itemStt'>{i+1}</div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={7}>
                          <div className='chillName'>
                            <div className='itemName'>{item.partnerName}</div>
                            <div className='itemPhone'>{item.partnerPhoneNumber.replace(item.partnerPhoneNumber.slice(3,9,10),"••••••")}</div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <div className='chillStatus'>
                            <div className='itemStatus' style={{color:`${status!==null && status.color}`}}>
                              {status!==null?status.returnStatus:item.status}
                            </div>
                            <div className='itemCheckin' style={{
                              fontSize: '12px',
                              color: '#9e9e9e',
                              marginBottom: 0,
                              fontStyle:'italic'
                            }}>
                             <Moment format="HH:mm">{item.checkInAt}</Moment> - <span style={{color:'#03a9f4'}}><Moment format="HH:mm">{item.updated}</Moment> </span> 

                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    })} 
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className='containMain'>
              <div className="treatment">❀ <span style={{fontWeight:500}}>Điều trị</span> <br/> 
              <div className="popup"style={{
                  display: 'flex',
                  paddingLeft: 0,
                  position:'relative'
                }} >
                                {  !isEmpty(bookingStatusTreatment.status) &&
                          (bookingStatusTreatment.status!=='WAIT'&&
                          bookingStatusTreatment.status!=='WAS_CHECK_IN'&&
                          bookingStatusTreatment.status!=='CANCEL'&&
                          bookingStatusTreatment.status!=='WAS_CHECK_OUT')&&
                          bookingStatusTreatment.status!=="WAIT_CONSULTATION" && 
                          bookingStatusTreatment.status!=="IS_CONSULTING" && 
                          bookingStatusTreatment.status!=="WAS_CONSULTED" &&
                                  <div className="marquee">
                                
                                  <div className="pop-name">
                                    {bookingStatusTreatment.partnerName}
                                  </div>
                                  <div className="pop-des" >
                                    {this.renderStatusTreatment()}
                                    </div>
                              
                                    </div>
                                    }
                        
                </div> 
            </div>
            </div>
            <div className='mainTreatment' >
              <div className='mainHead'>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={1}>
                    <div className='chillStt' >#</div>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <div className='chillName' align="left">Khách hàng</div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className='chillStatus' align="left">Trạng thái</div>
                  </Grid>
                </Grid>
              </div>
              <div className='mainBody' ref={this.chatContainer1} onScroll={this.onScroll1}>
                {bookingTreatment.length>0&&bookingTreatment.map((item,i)=>{
                var status = findStatus(functionColorStatus, item.status)
                  return item.status !=="WAIT" && 
                  item.status !=="WAS_CHECK_IN" && 
                  bookingStatusTreatment.status!=='CANCEL'&&
                  item.status!=="WAS_CHECK_OUT" && 
                  item.status!=="WAIT_CONSULTATION" && 
                  item.status!=="IS_CONSULTING" && 
                  item.status!=="WAS_CONSULTED" &&
                  <div className='chillBody'>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={1}>
                        <div className='chillStt' key={i}>
                          <div className='itemStt'>{i+1}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <div className='chillName'>
                          <div className='itemName'>{item.partnerName}</div>
                          <div className='itemPhone'>{item.partnerPhoneNumber.replace(item.partnerPhoneNumber.slice(3,9,10),"••••••")}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <div className='chillStatus'>
                          <div className='itemStatus' style={{color:`${status!==null && status.color}`}}>
                            {status!==null?status.returnStatus:item.status}
                          </div>
                          <div className='itemCheckin' style={{
                            fontSize: '12px',
                            color: '#9e9e9e',
                            marginBottom: 0,
                            fontStyle:'italic'
                          }}>
                             <Moment format="HH:mm">{item.checkInAt}</Moment> - <span style={{color:'#03a9f4'}}><Moment format="HH:mm">{item.updated}</Moment> </span> 
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                })} 
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className='containMain'>
              <div className="complete">❀ <span style={{fontWeight:500}}>Chúc mừng</span> <br/> 
              <span className="chillSize" >{bookingRandom.length}</span> khách hàng đã hoàn thành điều trị </div>
            </div>
            <div className="statusCheckout"  ref={this.chatContainer2} onScroll={this.onScroll2}>
              {bookingRandom.length>0&&bookingRandom.map((checkout,iii)=>{
                // checkout.status==="WAS_CHECK_OUT" &&
                return <div className="itemCheckout" key={iii}>
                  <div className="chillCheckout">
                    <div className="nameCheckout">{iii+1}. {checkout?.partnerName}</div>
                    <div className="timeCheckout"><Moment format="HH:mm">{checkout?.checkOutAt}</Moment></div>
                  </div>
                    <p>{checkout?.partnerPhoneNumber.replace(checkout.partnerPhoneNumber.slice(3,9,10),"••••••")}</p>
                </div>
              })}
            </div>
          </Grid>
        </Grid>
      </div>
      <div id="footer">
        <Footer></Footer>
      </div>
    </div>  
  );
}}

export default ( Receptionist);