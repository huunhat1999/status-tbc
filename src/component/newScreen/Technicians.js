import React, { Component } from 'react';
import Footer from './general/Footer';
import Header from './general/Header';
import axios from 'axios';
import Moment from 'react-moment';
import {functionTech} from '../../LisTechnicians'
import _, { isEmpty } from "lodash"
import { apiTechnicians } from '../../api/Api';
import {socket} from '../../socket/Socket'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import ActionBranch from './ActionBranch';;
 
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
class Technicians extends Component {
  chatContainer = React.createRef();
  constructor(props) {
    super(props);
    document.title="BÁC SĨ";
    this.state={
      bookingWaiting :[
    ],
    isLoading:false,
    bookingTreatment:[],
    openBranch : true,
  }
  }

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
    let from = new Date().setHours(0,0)
    let to = new Date().setHours(23,59)
     const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTVjNjI3ZjUzMWM4MzAwMTM0ZDJlY2MiLCJlbXBsb3llZUNvZGUiOiJERVZfVSIsImVtcGxveWVlSWQiOiI2MTVjNjIxZTUzMWM4MzAwMTM0ZDJlY2IiLCJuYW1lIjoiRGV2IEFjY291bnQiLCJ1c2VyTmFtZSI6ImRldmFjYyIsInVzZXJUeXBlIjoiY2xpZW50IiwiYnJhbmNoQ29kZUFyciI6WyJDTjMyIiwiQkgiXSwiYXBwTmFtZSI6Ik1OR19BUFAiLCJpYXQiOjE2MzY5Njc1MDIsImV4cCI6NDc5MDU2NzUwMn0.2oLm_rnWPigZRpo6upLSAVC0eVG5knl4IT3BT5ZfiyU'
    // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmZkMTY4ZDE0YmI3ZDI1ZGNlNDc1ZDIiLCJlbXBsb3llZUNvZGUiOiJURUNILjAyIiwiZW1wbG95ZWVJZCI6IjVmZmQxNWQzMTRiYjdkMjVkY2U0NzVkMCIsImVtYWlsIjoidHJhbmh1dW5oYXQyMkBnbWFpbC5jb20iLCJuYW1lIjoiVHLhuqduIE5o4bqtdCIsInVzZXJOYW1lIjoibmhhdHRoIiwidXNlclR5cGUiOiJjbGllbnQiLCJicmFuY2hDb2RlQXJyIjpbIkNhblRob0JyYW5jaCIsIkdaUlpxTVJSIiwiVHNHZ0pubWgiXSwiYXBwTmFtZSI6IkJJX0FQUCIsImlhdCI6MTYzNzA3NzI5MSwiZXhwIjoxNjM3MTYzNjkxfQ.kUJZuHohbNNXiqWnTFIub5jgLaGqchej3zBqhNYS988'
    axios.defaults.headers.token = token
    axios.get(apiTechnicians,{params:{
      "condition": {
        "created": {
          "from": from,
          "to":to, 
        },
        branchCode:{
          in: [branchCode]
      },
      },

      "sort": {
        "indexNumber":1
    },
      "limit": 1000,
      "page": 1
  }})
      .then(res => {  
        this.setState({bookingWaiting:res.data.data,bookingTreatment:res.data})
        console.log("booking",res.data);
    })
      
  }

  componentWillMount(){
    var branchCode = localStorage.getItem('branch')
    let from = new Date().setHours(0,0)
    let to = new Date().setHours(23,59)
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTVjNjI3ZjUzMWM4MzAwMTM0ZDJlY2MiLCJlbXBsb3llZUNvZGUiOiJERVZfVSIsImVtcGxveWVlSWQiOiI2MTVjNjIxZTUzMWM4MzAwMTM0ZDJlY2IiLCJuYW1lIjoiRGV2IEFjY291bnQiLCJ1c2VyTmFtZSI6ImRldmFjYyIsInVzZXJUeXBlIjoiY2xpZW50IiwiYnJhbmNoQ29kZUFyciI6WyJDTjMyIiwiQkgiXSwiYXBwTmFtZSI6Ik1OR19BUFAiLCJpYXQiOjE2MzY5Njc1MDIsImV4cCI6NDc5MDU2NzUwMn0.2oLm_rnWPigZRpo6upLSAVC0eVG5knl4IT3BT5ZfiyU'
  //  const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmZkMTY4ZDE0YmI3ZDI1ZGNlNDc1ZDIiLCJlbXBsb3llZUNvZGUiOiJURUNILjAyIiwiZW1wbG95ZWVJZCI6IjVmZmQxNWQzMTRiYjdkMjVkY2U0NzVkMCIsImVtYWlsIjoidHJhbmh1dW5oYXQyMkBnbWFpbC5jb20iLCJuYW1lIjoiVHLhuqduIE5o4bqtdCIsInVzZXJOYW1lIjoibmhhdHRoIiwidXNlclR5cGUiOiJjbGllbnQiLCJicmFuY2hDb2RlQXJyIjpbIkNhblRob0JyYW5jaCIsIkdaUlpxTVJSIiwiVHNHZ0pubWgiXSwiYXBwTmFtZSI6IkJJX0FQUCIsImlhdCI6MTYzNzA3NzI5MSwiZXhwIjoxNjM3MTYzNjkxfQ.kUJZuHohbNNXiqWnTFIub5jgLaGqchej3zBqhNYS988'
    axios.defaults.headers.token = token
    axios.get(apiTechnicians,{params:{
      "condition": {
        "created": {
          "from": from,
          "to":to, 
        },
        branchCode:{
          in: [branchCode]
      },
      },
      "sort": {
        "indexNumber":1
    },
      "limit": 1000,
      "page": 1
  }})
      .then(res => {  
        this.setState({bookingWaiting:res.data.data,bookingTreatment:res.data})
        console.log("booking",res.data);
    })
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
     let tempListBookingWaiting = [...this.state.bookingWaiting,queue.queue];
     this.setState({
       bookingWaiting: tempListBookingWaiting
     });
     console.log("----SSC_TREATMENT_QUEUE_CREATE----",tempListBookingWaiting);
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
        return (
            <div id="page">
            <div id="header">
              <Header></Header>
              </div>
              {this.state.openBranch === true&&<ActionBranch reload={this.reload} doneChoose={this.doneChoose} close = {this.closeBranch}/>}
              <div id="content" ref={this.chatContainer} onScroll={this.onScroll}>
            <div className="main">
              <div className="container">
                <div className="main-page">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="main-right">
                        <TableContainer component={Paper} ref={this.chatContainer} onScroll={this.onScroll} className="tableContainer">
                            <Table aria-label="simple table" style={{minWidth:650}} >
                              <TableHead>
                                <TableRow>
                                  <TableCell >#</TableCell>
                                  <TableCell align="left" style={{Width:65}}>Khách hàng</TableCell>
                                  <TableCell align="left">Điện thoại</TableCell>
                                  <TableCell align="left">Trạng thái</TableCell>
                                  <TableCell align="left" >Bác sĩ</TableCell>
                                  <TableCell align="left">Thời gian</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {this.state.bookingWaiting.map((item,i)=>{
                                  var status = findStatus(functionTech, item.status)
                                  return (item.status==="WAIT" ||  item.status==="IS_CALLING" ||  item.status==="IN_PROGRESS" || item.status==="COMPLETE") && <TableRow  key={i}>
                                    <TableCell >
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
                                        <li className="td-li" >{item.booking.partnerPhoneNumber.replace(item.booking.partnerPhoneNumber.slice(3,9,10),"ₓₓₓₓₓ")}</li>
                                      </div>
                                    </TableCell>
                                    <TableCell style={{width:190}}>
                                    <div className="td-dv">
                                        <li className="td-li"style={{color:`${status!==null && status.color}`}}>
                                          {status!==null?status.returnStatus:item.status}</li>
                                      </div> 
                                    </TableCell>
                                    <TableCell>
                                      <div className="td-tech">
                                        <li className="td-li" >{ item.treatmentServices.length > 1 ? item.treatmentServices.map((item,i)=>{
                                          return  <div className="bookingLT" style={{backgroundColor: 'rgb(48, 63, 159'}} key={i}>{_.get(item,'assignedTreatmentDoctor.name','')}</div>
                                        })
                                        : item.treatmentServices.map((item,i)=>{
                                          return  <div className="bookingLT" style={{backgroundColor: 'rgb(48, 63, 159'}} key={i}>{_.get(item,'assignedTreatmentDoctor.name','')}</div>
                                        })}</li>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="td-time">
                                      <li className="td-li"><Moment format="hh:mm">{item.updated}</Moment> - <Moment format="DD/MM/YYYY">{item.booking.updated}</Moment></li>
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

export default Technicians;