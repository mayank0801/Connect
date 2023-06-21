import React, { useContext } from 'react'
import { useState } from 'react'
import {FiMoreHorizontal} from "react-icons/fi"
import { AuthContext } from '../../context/AuthContext';
import { deleteComment } from '../../services/postServices';

export const CommentCard = ({comment,post,dispatch}) => {
    const [isOpen,setOpen]=useState(false);
    const {userInfo,token}=useContext(AuthContext)
    const isCurrentLoggedInComment=comment.username===userInfo.username;
  return (
    <div style={{border:"1px solid black"}}>
        <div>
        <img alt="commentUserProfile" ></img>
        <FiMoreHorizontal size={30} onClick={()=>setOpen(!isOpen)}/>
        {
            isCurrentLoggedInComment&&isOpen&&<div>
                <p>Edit</p>
                <p onClick={()=>deleteComment(post._id,comment._id,token,dispatch)}>Delete</p>
            </div>
        }
        </div>
        <h1>{comment.comment}</h1>
    </div>
  )
}
