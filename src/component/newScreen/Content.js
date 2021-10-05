import React, { Component } from 'react';

class Content extends Component {
    render() {
        return (
            <div className="alertCheckout">
                <div className="dialogCheckout">
                    <div className="dialogImage">
                        <img src="../congrats7.png" alt=""/>
                    </div>
                    <div className="contentLabel">
                        <label>Chúc mừng khách hàng : {this.props.partnerName}</label>
                        <div>Cám ơn bạn đã sử dụng dịch vụ của Trang Beauty Center</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;