import React, { Component } from 'react';
import Marquee from "react-smooth-marquee"

class Footer extends Component {
    render() {
        return (
          <div className="container">
            <div className="text-footer">
              <div className="row">
                <div className="col-md-6">
                  <div className="text-id">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="cty"> 
                          <img src="logo-footer.png" alt="" width="100%"></img>
                        </div>
                      </div>
                      <div className="col-md-9">
                      <label>CTY CỔ PHẦN TM DV TRANG BEAUTY CENTER</label>
                        <div className="list-info">
                          <ul>  
                            <li>Địa chỉ: 294 Ba Tháng Hai, Phường 12, Quận 10, Tp HCM</li>
                            <li>Hotline: 037.44.66666</li>
                            <li>Email: info@trangbeautycenter.com</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="brach-id">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="branch-item">
                          <ul>  
                            <div><i className="fi-rr-location-alt"></i><b>CHI NHÁNH BA THÁNG HAI</b></div>
                            <li><b>- </b> 294 Ba Tháng Hai, Phường 12, Quận 10, Tp HCM</li>
                            <div><i className="fi-rr-location-alt"></i><b>CHI NHÁNH GÒ VẤP</b></div>
                            <li><b>- </b> 672 A40 Đường Phan Văn Trị, Phường 10, Quận Gò Vấp, Tp HCM</li>
                          </ul>
                        </div>
                      </div>  
                      <div className="col-md-7">
                        <div className="branch-item">
                          <ul>  
                            <div><i className="fi-rr-location-alt"></i><b>CHI NHÁNH BIÊN HÒA</b></div>
                            <li><b>- </b> PG02 Vincom Biên Hòa – 1096 Đường Phạm Văn Thuận, Phường Tân Mai, Tp Biên Hòa</li>
                            <div><i className="fi-rr-location-alt"></i><b>CHI NHÁNH CẦN THƠ</b></div>
                            <li><b>- </b> 99 Đường Nguyễn Việt Hồng, Phường An Phú, Quận Ninh Kiều, Tp Cần Thơ</li>
                          </ul>
                        </div>
                      </div>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default Footer;