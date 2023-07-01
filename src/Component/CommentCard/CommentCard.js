import React, { useContext, useRef } from 'react'
import { useState } from 'react'
import {FiMoreHorizontal} from "react-icons/fi"
import { AuthContext } from '../../context/AuthContext';
import { deleteComment } from '../../services/postServices';
import { EditCommentModal } from '../../features/EditCommentModal';
import "./CommentCard.css"
import { useOutsideClick } from '@chakra-ui/react';
import { useClickOutside } from '../../hook/clickOutside';
import { useNavigate } from 'react-router-dom';
export const CommentCard = ({comment,post,dispatch}) => {
    const [isOpen,setOpen]=useState(false);
    const [isOpenComment,setOpenComment]=useState(false);
    const {userInfo,token}=useContext(AuthContext);
    const isCurrentLoggedInComment=comment.username===userInfo.username;
  const postRef=useRef();
  useClickOutside(postRef,setOpen)
  const navigate=useNavigate();
    
  return (
    <div className="comment-card" >
          <img className="user-profile" src={userInfo?.profileAvatar} alt="commentUserProfile" onClick={()=>navigate(`/profile/${comment?.username}`)}/>
          <div style={{width:"100%"}}>
      <div className="comment-header">
        <span className='comment-detail'>
          <p>{`${comment?.firstName} ${comment?.lastName}`}</p>
          <p>@{comment?.username}</p>
        </span>
        <div ref={postRef}>
          <FiMoreHorizontal className="more-icon" size={30} onClick={() => setOpen(!isOpen)}  />
          
          {isCurrentLoggedInComment && isOpen && (
              <div className="dropdown-menu" >
                  <p onClick={() => setOpenComment(true)}>Edit</p>
                  <p onClick={() => deleteComment(post._id, comment._id, token, dispatch)}>Delete</p>
              </div>
          )}
          </div>
      </div>
    <p className="comment-text">{comment.comment}</p>
   
    {isOpenComment && (
        <EditCommentModal
            post={post}
            comment={comment}
            initalCommentData={comment.comment}
            setOpenComment={setOpenComment}
        />
    )}
 
    </div>
</div>

  )
}
