import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Counselors from './component/newScreen/Counselors';
import Receptionist from './component/newScreen/Receptionist';
import Technicians from './component/newScreen/Technicians';
import Visit from './component/newScreen/Visit';
import Coffee from './component/newScreen/Coffee';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Receptionist}></Route>
        <Route path="/tu-van/" exact component={Counselors}></Route>
        <Route path="/ky-thuat-vien/" exact component={Technicians}></Route>
        <Route path="/tham-kham/" exact component={Visit}></Route>
        <Route path="/coffee/" exact component={Coffee}></Route>
      </Router>
    );
  }
}

export default App;