import React, { Component } from 'react';
import axios from "axios";
import RoomIcon from '@material-ui/icons/Room';
// import { Icon } from '@iconify/react';
// import refreshIcon from '@iconify/icons-mdi-light/refresh';

class Footer extends Component {


    render() {
        return (
          <div className="container" style={{position:'relative'}}>
              <div className="row">

              <div className="col-md-3">
                <div className="branch-item">
                  <ul>  
                    <div><RoomIcon className="RoomIcon"/><b>CHI NHÁNH BA THÁNG HAI</b></div>
                    <li>294 Ba Tháng Hai, Phường 12, Quận 10, Tp HCM</li>
                    <li>037.44.66666</li>
                  </ul>
                </div>
              </div> 

              <div className="col-md-3">
                <div className="branch-item">
                  <ul>  
                    <div><RoomIcon className="RoomIcon"/><b>CHI NHÁNH GÒ VẤP</b></div>
                    <li>672 A40 Đường Phan Văn Trị, Phường 10, Quận Gò Vấp, Tp HCM</li>
                    <li>037.44.66666</li>

                  </ul>
                </div>
              </div>  

              <div className="col-md-3">
                <div className="branch-item">
                  <ul>  
                    <div><RoomIcon className="RoomIcon"/><b>CHI NHÁNH BIÊN HÒA</b></div>
                    <li>PG02 Vincom Biên Hòa – 1096 Đường Phạm Văn Thuận, Phường Tân Mai, Tp Biên Hòa</li>
                    <li>037.44.66666</li>
                  
                  </ul>
                </div>
              </div>  


              <div className="col-md-3">
                <div className="branch-item">
                  <ul>  
                    <div><RoomIcon className="RoomIcon"/><b>CHI NHÁNH CẦN THƠ</b></div>
                    <li> 99 Đường Nguyễn Việt Hồng, Phường An Phú, Quận Ninh Kiều, Tp Cần Thơ</li>
                    <li>037.44.66666</li>

                  </ul>
                </div>
              </div>  

            {/* <div 
            onClick={()=>this.reLogin()}
            style={{fontSize: 24,
              position: 'absolute',
              right: 8,
              top: 0,
              cursor: 'pointer',}}>
            <Icon icon={refreshIcon} />
            </div> */}

            </div>
          </div>
        );
    }
}

export default Footer;