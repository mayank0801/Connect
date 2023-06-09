import { createContext } from "react";
import axios from "axios"


export const AuthContext=createContext();


export default function AuthContextProvider({children}){


    const loginHandler=async(username,password)=>{
        try {
            const response=await axios.post("/api/auth/login",{username,password})
            console.log(response);
        } catch (e) {
            console.log(e);
            
        }
    }


    const signupHandler=async(Name,connectName,username, password)=>{
        try {
        
            const response=await axios.post("/api/auth/signup",{Name,connectName,username, password})
            console.log(response);
            
        } catch (error) {
            console.error(error)
            
        }
    }




    return(
        <AuthContext.Provider value={{x:4,loginHandler,signupHandler}}>{children}</AuthContext.Provider>
    )
}