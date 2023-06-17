import { createContext, useContext, useEffect, useReducer } from "react";
import reducer, { IntialState } from "../Reducer/postReducer";
import { loadPostHandler } from "../services/postServices";
import { AuthContext } from "./AuthContext";

export const PostContext=createContext();
export default function PostContextProvider({children}){
    const [state,dispatch]=useReducer(reducer,IntialState)
    // const {userInfo}=useContext(AuthContext)
    useEffect(()=>{
        loadPostHandler(dispatch);
    },[])
    
    return(
        <div>
            <PostContext.Provider value={{posts:state.post,dispatch}}>{children}</PostContext.Provider>
        </div>
    )
}