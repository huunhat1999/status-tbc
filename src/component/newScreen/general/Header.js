import React, { Component } from 'react';
import Clock from 'react-live-clock';
import Marquee from "react-smooth-marquee"

class Header extends Component {
    render() {
        return (
            <div className="header">
              <div className="header-page">
                <div className="container">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="img-logo">
                        <img src="../2.png" alt="" width="100%" />
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="marquee">
                        <Marquee direction="left">
                          <label > <b>Trang Beauty Center </b> chân thành cảm ơn quý đã tin tưởng & sử dụng dịch vụ của chúng tôi - Hotline <b>089.61.62668</b></label>
                        </Marquee>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="time-header">
                        <Clock format={'LTS' } ticking={true}></Clock>
                        <Clock format={' | dddd' } ticking={true}></Clock>
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