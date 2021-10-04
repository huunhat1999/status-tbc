import React, { Component } from 'react';

class Content extends Component {
    render() {
        return (
            <div className="itemContent">
                <div className="contentArr">
                    <div className="contentImage">
                        <img src="../congrats7.png" alt=""/>
                    </div>
                    <div className="contentLabel">
                        <label>Chúc mừng khách hàng : {this.props.partnerName}</label>
                        <div>Cám ơn bạn đã sữ dụng dịch vụ của Trang Beauty Center</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;