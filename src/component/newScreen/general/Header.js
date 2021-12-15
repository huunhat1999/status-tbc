import React, { Component } from 'react';
import Clock from 'react-live-clock';
import Moment from 'react-moment';
import Marquee from "react-smooth-marquee"

class Header extends Component {
    render() {
        return (
            <div className="header">
              <div className="header-page">
                <div className="container">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="img-logo" >
                        <img src="../2.png" alt="" onClick={()=>this.props.toggleFullScreen()}/>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="marquee">
                        {/* <Marquee direction="left">
                          <label > <b>Trang Beauty Center </b> chân thành cảm ơn quý đã đặt niềm tin vào  chúng tôi - Hotline: <b>037.44.66666</b></label>
                        </Marquee> */}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="time-header">
                        <Clock format='hh:mm:ss' ticking={true}></Clock>
                        {/* <Clock format={' | dddd' } ticking={true}></Clock> */}
                        <Clock format={', DD-MM-YYYY'} ticking={true}></Clock>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default Header;