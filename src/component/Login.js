import axios from "axios";

const login = ()=>{
 axios.post(`https://stagingapi.trangbeautycenter.com/api/users/login`,{
    "userName":"nhatth",
    "password": "nhat123",
    "appName": "MNG_APP"
})
.then(res=>{
    console.log("l56151",res.data.token);
    const jsonStringify = JSON.stringify((res.data.token));
    console.log('json',jsonStringify);  
    localStorage.setItem('tokenGeneral',jsonStringify)
})
}

export {login }
