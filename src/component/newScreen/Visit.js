import React, { Component } from 'react';
import Footer from './general/Footer';
import Header from './general/Header';

class Visit extends Component {
  constructor(props) {
    super(props);
    this.state={
      status:[
        {id:1,status:'Đang chờ',color:'red'},{id:2,status:'Đã Check-in',color:'red'},{id:3,status:'Đã Check-out',color:'red'},{id:4,status:'Đã chỉ định tư vấn viên',color:'red'},{id:5,status:'Đã chỉ định kỹ thuật viên',color:'red'}
        ,{id:6,status:'Đang thực hiện',color:'red'}
      ],
    }
  }
    render() {
        return (
            <div id="page">
            <Header></Header>
            <div className="main">
              <div className="container">
                <div className="main-page">
                  <div className="lt">MÀN HÌNH CHỜ THĂM KHÁM</div>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="main-right">
                          {/* <div className="height-main">
                            <label>MÀN HÌNH CHỜ TƯ VẤN</label>
                          </div> */}
                          <table>
                            <thead>
                              <tr>
                                <th className="stt2">STT</th>
                                <th className="name2">KHÁCH HÀNG</th>
                                <th className="phone">SỐ ĐIỆN THOẠI</th>
                                <th className="service">DỊCH VỤ ĐÃ HOÀN THÀNH</th>
                                <th className="time">THỜI GIAN THĂM KHÁM</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="td">
                                    <li className="td-li">1</li>
                                  </div>
                                </td>
                                <td>
                                  <div className="td-name">
                                    <li className="td-li">Nhật Trần</li>
                                  </div>
                                </td>
                                <td>
                                  <div className="td-phone">
                                    <li className="td-li">0386501426</li>
                                  </div>
                                </td>
                                <td>
                                  <div className="td-dv">
                                    <li className="td-li">Cắt mí T2020</li>
                                  </div>
                                  <div className="td-dv">
                                    <li className="td-li">Nâng cung T2020</li>
                                  </div>
                                  <div className="td-dv">
                                    <li className="td-li">Lấy bọng mỡ mí dưới</li>
                                  </div>
                                </td>
                                <td>
                                  <div className="td-time">
                                    <li className="td-li">17:00 PM - 17/05/2021</li>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            <footer>
              <Footer></Footer>
            </footer>
          </div>
        );
    }
}

export default Visit;