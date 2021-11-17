import React, { Component } from 'react';
import axios from "axios";
import { branch } from '../../api/Api';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { apiReceptionist } from '../../api/Api';

class ActionBranch extends Component {
    constructor(props) {
        super(props);
        this.state={
            branch:[]
      }
    }

    componentDidMount(){
       const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTVjNjI3ZjUzMWM4MzAwMTM0ZDJlY2MiLCJlbXBsb3llZUNvZGUiOiJERVZfVSIsImVtcGxveWVlSWQiOiI2MTVjNjIxZTUzMWM4MzAwMTM0ZDJlY2IiLCJuYW1lIjoiRGV2IEFjY291bnQiLCJ1c2VyTmFtZSI6ImRldmFjYyIsInVzZXJUeXBlIjoiY2xpZW50IiwiYnJhbmNoQ29kZUFyciI6WyJDTjMyIiwiQkgiXSwiYXBwTmFtZSI6Ik1OR19BUFAiLCJpYXQiOjE2MzY5Njc1MDIsImV4cCI6NDc5MDU2NzUwMn0.2oLm_rnWPigZRpo6upLSAVC0eVG5knl4IT3BT5ZfiyU'
      // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmZkMTY4ZDE0YmI3ZDI1ZGNlNDc1ZDIiLCJlbXBsb3llZUNvZGUiOiJURUNILjAyIiwiZW1wbG95ZWVJZCI6IjVmZmQxNWQzMTRiYjdkMjVkY2U0NzVkMCIsImVtYWlsIjoidHJhbmh1dW5oYXQyMkBnbWFpbC5jb20iLCJuYW1lIjoiVHLhuqduIE5o4bqtdCIsInVzZXJOYW1lIjoibmhhdHRoIiwidXNlclR5cGUiOiJjbGllbnQiLCJicmFuY2hDb2RlQXJyIjpbIkNhblRob0JyYW5jaCIsIkdaUlpxTVJSIiwiVHNHZ0pubWgiXSwiYXBwTmFtZSI6IkJJX0FQUCIsImlhdCI6MTYzNzA3NzI5MSwiZXhwIjoxNjM3MTYzNjkxfQ.kUJZuHohbNNXiqWnTFIub5jgLaGqchej3zBqhNYS988'
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