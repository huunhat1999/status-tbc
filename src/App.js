import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Counselors from './component/newScreen/Counselors';
import Receptionist from './component/newScreen/Receptionist';
import Technicians from './component/newScreen/Technicians';
import Visit from './component/newScreen/Visit';
import Coffee from './component/newScreen/Coffee';
import jwtDecode from 'jwt-decode';
import {login} from './component/Login'
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    document.title="LỄ TÂN";
    this.state={
      // token: null
  }
}
  
  // componentDidMount=()=>{
  //   const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTVjNjI3ZjUzMWM4MzAwMTM0ZDJlY2MiLCJlbXBsb3llZUNvZGUiOiJERVZfVSIsImVtcGxveWVlSWQiOiI2MTVjNjIxZTUzMWM4MzAwMTM0ZDJlY2IiLCJuYW1lIjoiRGV2IEFjY291bnQiLCJ1c2VyTmFtZSI6ImRldmFjYyIsInVzZXJUeXBlIjoiY2xpZW50IiwiYnJhbmNoQ29kZUFyciI6WyJDTjMyIiwiQkgiXSwiYXBwTmFtZSI6Ik1OR19BUFAiLCJpYXQiOjE2MzY5Njc1MDIsImV4cCI6NDc5MDU2NzUwMn0.2oLm_rnWPigZRpo6upLSAVC0eVG5knl4IT3BT5ZfiyU'

  //   if(token){
  //     const decode = jwtDecode(token)
  //     console.log("decode",decode);
  //     if(decode.exp > new Date().getTime()/10000000){
  //     this.setState({token: token})
  //     }
  //     else {
  //       axios.post(`https://api.trangbeautycenter.com/api/users/login`,{
  //         "userName":"devacc",
  //         "password": "dev@123",
  //         "appName": "MNG_APP"
  //       })
  //       // axios.post(`https://stagingapi.trangbeautycenter.com/api/users/login`,{
  //       //   "userName":"nhatth",
  //       //   "password": "123456",
  //       //   "appName": "MNG_APP"
  //       // })  
  //       .then(res=>{
  //         console.log('token', res.data)     
  //         this.setState({token: res.data.token})
  //       })
  //     }
  //   }
  //   else {
  //     axios.post(`https://api.trangbeautycenter.com/api/users/login`,{
  //       "userName":"devacc",
  //       "password": "dev@123",
  //       "appName": "MNG_APP"
  //     })
  //     // axios.post(`https://stagingapi.trangbeautycenter.com/api/users/login`,{
  //     //   "userName":"nhatth",
  //     //   "password": "123456",
  //     //   "appName": "MNG_APP"
  //     // }) 
  //     .then(res=>{
  //       console.log('token2', res.data)
  //     this.setState({token: res.data.token})
  //     })
  //   }
  // };
  getDisplay=()=>{
    return <Router>
            <Route path="/" exact component={Receptionist}></Route>
            <Route path="/tu-van/" exact component={Counselors}></Route>
            <Route path="/dieu-tri/" exact component={Technicians}></Route>
            <Route path="/tham-kham/" exact component={Visit}></Route>
            <Route path="/coffee/" exact component={Coffee}></Route>
          </Router>
  }
  render() {
    // const {token} = this.state;
    return  (
      this.getDisplay()
    )
  }
}

export default App;