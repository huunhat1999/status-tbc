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
    return (
      <div>texttttttt</div>
    )
  }
}

export default App;