import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Counselors from './component/newScreen/Counselors';
import Receptionist from './component/newScreen/Receptionist';
import Technicians from './component/newScreen/Technicians';
import Visit from './component/newScreen/Visit';
import Coffee from './component/newScreen/Coffee';
import jwtDecode from 'jwt-decode';
import {login} from './component/Login'

class App extends Component {
  
  componentDidMount=()=>{
    const token = localStorage.getItem('tokenGeneral')

    if(token){
      const decode = jwtDecode(token)
      console.log("decode",decode);
      if(decode.exp > new Date().getTime()/1000){
        this.getDisplay()
      }
      else {
        login()
      }
    }
    else {
      login()
    }
  };
  getDisplay=()=>{
    return <Router>
            <Route path="/" exact component={Receptionist}></Route>
            <Route path="/tu-van/" exact component={Counselors}></Route>
            <Route path="/ky-thuat-vien/" exact component={Technicians}></Route>
            <Route path="/tham-kham/" exact component={Visit}></Route>
            <Route path="/coffee/" exact component={Coffee}></Route>
          </Router>
  }
  render() {
    return (
      this.getDisplay()
    );
  }
}

export default App;