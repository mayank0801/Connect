import { useState } from "react"


const Login=()=>{
    const [loginInfo,setLoginInfo]=useState({email:"",password:""});

    console.log(loginInfo)
    return(
    <div>
        <form onSubmit={()=>{}}>
            <input type="email" value={loginInfo?.email} placeholder="Enter UserName" onChange={(e)=>setLoginInfo({...loginInfo,email:e.target.value})} required/>
            <input type="password" value={loginInfo?.passWord} placeholder="Enter PassWord" onChange={(e)=>setLoginInfo({...loginInfo,password:e.target.value})} required/>
            <button type="submit"></button>
        </form>
    </div>)
}

export default Login


