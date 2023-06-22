import React, { useState } from 'react'
import { addComment, editComment } from '../services/postServices';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';

export const EditCommentModal = ({post,comment,initalCommentData,setOpenComment,addCommentModal}) => {
const {token}=useContext(AuthContext);
const {dispatch}=useContext(PostContext);
console.log(initalCommentData,post,addCommentModal,"initail");
    const [commentData,setCommendata]=useState(initalCommentData);
    const submitHandler=async()=>{
        console.log(post?._id,addCommentModal,"initail")
        addCommentModal?await addComment(post?._id,commentData,token,dispatch):await editComment(post._id,comment._id,commentData,token,dispatch);
        setCommendata("");
        setOpenComment(false);
    }

  return (
    <div style={{position:"absolute",top:"10%"}}>
        <div>
            <img alt="userProfile"/>
            <input type="text" value={commentData} onChange={(e)=>setCommendata(e.target.value)}></input>
            <div>
                <button onClick={()=>setOpenComment(false)}>Cancel</button>
                <button onClick={()=>submitHandler()}>Save</button>
            </div>
        </div>
    </div>
  )
}
