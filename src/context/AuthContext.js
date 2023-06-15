import { createContext,useEffect,useState } from "react";
import axios from "axios"


export const AuthContext=createContext();


export default function AuthContextProvider({children}){
    const user=JSON.parse(localStorage?.getItem("user"));
    const [token,setToken]=useState(user?.encodedToken);
    const [userInfo,setUserInfo]=useState(user?.userInfo)
    const loginHandler=async(username,password)=>{
        try {
            const response=await axios.post("/api/auth/login",{username,password})
            localStorage.setItem("user", JSON.stringify({encodedToken: response.data.encodedToken, userInfo: response.data.foundUser}));
            setToken(response.data.encodedToken);
            setUserInfo(response.data.userInfo);
        } 
        catch (e) {
            console.log(e);
        }
    }


    const signupHandler=async(Name,connectName,username, password)=>{
        try {
            const response=await axios.post("/api/auth/signup",{Name,connectName,username,password})
            localStorage.setItem("user", JSON.stringify({encodedToken: response.data.encodedToken, userInfo: response.data.createdUser}));
            setToken(response.data.encodedToken);
            setUserInfo(response.data.userInfo);
            return response;  
        } catch (error) {
            console.error(error)
        }
    }




    return(
        <AuthContext.Provider value={{loginHandler,signupHandler,token,userInfo}}>{children}</AuthContext.Provider>
    )
}