import { createContext,useEffect,useState } from "react";
import axios from "axios"
import { Navigate, json, useNavigate } from "react-router-dom";
import { useReducer } from "react";


export const AuthContext=createContext();


export default function AuthContextProvider({children}){
    const usertoken=JSON.parse(localStorage?.getItem("userToken"));
    const userInfoo=JSON.parse(localStorage?.getItem("userInfo"));

    const [token,setToken]=useState(usertoken);
    const [userInfo,setUserInfo]=useState(userInfoo)
    const [userBookMark,setuserBookMark]=useState([]);
    const navigate=useNavigate();





    const updateUser=(updatedUser)=>{
        console.log("Clicked1",updateUser)
        localStorage.setItem("userInfo",JSON.stringify(updatedUser));
        setUserInfo(updatedUser);
        console.log("checkpoint 2 user locally updated with",updateUser)
    }
    const updateBookMark=(updatedBookMark)=>{
        // localStorage.setItem("user", JSON.stringify();
        setuserBookMark(updatedBookMark);
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


    const getBookmark=async()=>{
        try {
            const response=await axios.get(`/api/users/bookmark`,{headers:{authorization:token}});
            console.log(response,"bookmark");
            setuserBookMark(response.data.bookmarks);
        } catch (error) {
            console.log(error);
        }
    }

    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userInfo");
        setuserBookMark([]);
        navigate("/landing");
    }

    // useEffect(()=>{

    // },[userInfo])
    
    useEffect(() => {
        getBookmark();
        console.log('User info updated:', userInfo);
      }, []);


    return(
        <AuthContext.Provider value={{loginHandler,signupHandler,token,userInfo,updateUser,setUserInfo,updateBookMark,userBookMark,logoutHandler}}>{children}</AuthContext.Provider>
    )
}