import { createContext,useEffect,useState } from "react";
import axios from "axios"
import { json } from "react-router-dom";
import { useReducer } from "react";


export const AuthContext=createContext();


export default function AuthContextProvider({children}){
    const usertoken=JSON.parse(localStorage?.getItem("userToken"));
    const userInfoo=JSON.parse(localStorage?.getItem("userInfo"));

    const [token,setToken]=useState(usertoken);
    const [userInfo,setUserInfo]=useState(userInfoo)






    const updateUser=(updatedUser)=>{
        setUserInfo(updatedUser);
        console.log("checkpoint 2 user locally updated with",updateUser)
    }
    const loginHandler=async(username,password)=>{
        try {
            const response=await axios.post("/api/auth/login",{username,password})
            console.log(response);
            localStorage.setItem("userToken", JSON.stringify(response.data.encodedToken));
            localStorage.setItem("userInfo",JSON.stringify(response.data.foundUser));
            setToken(response.data.encodedToken);
            setUserInfo(response.data.foundUser);
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




    // useEffect(()=>{

    // },[userInfo])
    
    useEffect(() => {
        
        console.log('User info updated:', userInfo);
      }, []);


    return(
        <AuthContext.Provider value={{loginHandler,signupHandler,token,userInfo,updateUser,setUserInfo}}>{children}</AuthContext.Provider>
    )
}