import React, { Component } from 'react';
import axios from "axios";
import { branch } from '../../api/Api';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { apiReceptionist } from '../../api/Api';
import {token} from '../Token'

class ActionBranch extends Component {
    constructor(props) {
        super(props);
        this.state={
            branch:[]
      }
    }

    componentDidMount(){
      console.log("tokenRes",token);
      axios.defaults.headers.token = token
        axios.get(branch)
        .then(res=>{
          console.log(res);
          this.setState({branch:res.data.data})
        })
      }
      close = ()=>{
        this.props.close()
    }

      setBranch = (code) =>{
        console.log(code);
        var old = localStorage.getItem('branch')
        console.log(old);
        localStorage.setItem('branch', code)
        this.setState({code},()=>{
            this.props.doneChoose(old)
        })
    }
    render() {
        var branchCode = localStorage.getItem('branch')
        const {branch} =this.state
        return (
            <React.Fragment>
            <Dialog
            maxWidth="xs"
            fullScreen={false}
            open={true} 
            // onClose={this.props.close}
            aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title">{"Chọn chi nhánh"}</DialogTitle>
            <DialogContent>
                 <div className="allCheckBranch" >
                    {branch.length>0&& branch.map((item,index)=>{
                        return  <div className={`itemCheckBranch ${branchCode===item.code&&'active'}`} 
                        key={index} onClick={()=>this.setBranch(item.code)}>{item.name}</div>
                    })} 
                 </div>
                 <Button onClick={()=>this.close()}>Đóng</Button>
            </DialogContent>
            
          </Dialog>
          </React.Fragment>
        );
    }
}

export default ActionBranch;