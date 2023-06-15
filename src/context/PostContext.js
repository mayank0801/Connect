import { createContext, useEffect, useReducer } from "react";
import reducer, { IntialState } from "../Reducer/postReducer";
import { loadPostHandler } from "../services/postServices";

export const PostContext=createContext();
export default function PostContextProvider({children}){
    
    const [state,dispatch]=useReducer(reducer,IntialState)
    useEffect(()=>{
        loadPostHandler(dispatch);
    },[])
    
    return(
        <div>
            <PostContext.Provider value={{x:4,posts:state.post}}>{children}</PostContext.Provider>
        </div>
    )
}