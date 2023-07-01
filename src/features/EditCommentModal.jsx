import React, { useState } from 'react'
import { addComment, editComment } from '../services/postServices';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';
import { useRef } from 'react';
import { useClickOutside } from '../hook/clickOutside';

export const EditCommentModal = ({post,comment,initalCommentData,setOpenComment,addCommentModal}) => {
const {token,userInfo}=useContext(AuthContext);
const {dispatch}=useContext(PostContext);

console.log(initalCommentData,post,addCommentModal,"initail");
    const [commentData,setCommendata]=useState(initalCommentData);
    const submitHandler=async()=>{
        console.log(post?._id,addCommentModal,"initail")
        addCommentModal?await addComment(post?._id,commentData,token,dispatch):await editComment(post._id,comment._id,commentData,token,dispatch);
        setCommendata("");
        setOpenComment(false);
    }

    const handleChange=(event)=>{
        setCommendata(event.target.value)
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`
    }

    const postRef=useRef(null);
    useClickOutside(postRef,setOpenComment)

  return (
<div className="comment-modal-container" ref={postRef}>
      <img src={userInfo?.profileAvatar} className="user-profile" alt="userProfile" />
    <div className="comment-modal">
    <textarea
    className='comment-input'
        value={commentData}
        name="content"
        rows="1"
        placeholder="What is Happening?!"
        onChange={(e)=>handleChange(e)}
    />
     
      <div className="button-container">
        <button className="cancel-button" onClick={() => setOpenComment(false)}>Cancel</button>
        <button className="save-button" onClick={() => submitHandler()}>Save</button>
      </div>
    </div>
  </div>
  
  )
}
