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
      token: null
  }
}
  
  componentDidMount=()=>{
    const token = localStorage.getItem('tokenGeneral')

    if(token){
      const decode = jwtDecode(token)
      console.log("decode",decode);
      if(decode.exp > new Date().getTime()/1000){
      this.setState({token: token})
      }
      else {
        // login()
        
        axios.post(`https://stagingapi.trangbeautycenter.com/api/users/login`,{
        "userName":"nhatth",
        "password": "123456",
        "appName": "MNG_APP"
        })
        .then(res=>{
        console.log("l56151",res.data.token);
        localStorage.setItem('tokenGeneral',res.data.token)
        console.log('json',res.data.token);  
        
        this.setState({token: res.data.token})
        })
      }
    }
    else {
      // login()
      axios.post(`https://stagingapi.trangbeautycenter.com/api/users/login`,{
      "userName":"nhatth",
      "password": "123456",
      "appName": "MNG_APP"
      })
      .then(res=>{
      console.log("l56151",res.data.token);
      localStorage.setItem('tokenGeneral',res.data.token)
      console.log('json',res.data.token);  
      this.setState({token: res.data.token})
      })
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
    const {token} = this.state;
    return token ? (
      this.getDisplay()
    ) : <div>test</div>;
  }
}

export default App;