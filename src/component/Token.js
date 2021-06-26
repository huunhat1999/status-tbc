import axios from "axios";

const tokenGeneral = (token) =>{
    if(token){
        axios.defaults.headers.common['tokenGeneral'] = token;
    }
}
export  {tokenGeneral}