import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const SignUp=()=>{
    const {signupHandler}=useContext(AuthContext);
    const [signUpInfo,setSignUpInfo]=useState({Name:"",connectName:"",username:"", password:""})
    const navigate=useNavigate();
    const submitHandler=async(e)=>{
        
        try{
        e.preventDefault();
        const response=await signupHandler(signUpInfo);
        navigate("/");
       
    }
       catch{

       }
    }
    return(<div>
        <form onSubmit={submitHandler}>
            <input type="text" placeholder="Mayank Kumar" onChange={(e)=>setSignUpInfo({...signUpInfo,Name:e.target.value})}  required/>
            <input type="text"  placeholder="mayankkumar" onChange={(e)=>setSignUpInfo({...signUpInfo,connectName:e.target.value})} required/>
            <input type="email" placeholder="mayank@gmail.com"  onChange={(e)=>setSignUpInfo({...signUpInfo,username:e.target.value})} required/>
            <input type="password" placeholder="***"  onChange={(e)=>setSignUpInfo({...signUpInfo,password:e.target.value})} required/>
            <input type="password" placeholder="****" required/>
            <button type="submit" value="submit">Sign Up</button>
        </form>
    </div>)
}



export default SignUp;