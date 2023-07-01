import React, { useRef, useState } from 'react'
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai"
import {FiMoreHorizontal} from "react-icons/fi";
import { bookmark, dislikeHandler, likePostHandler, removeBookMark } from '../../services/postServices';
import { isBookMark, isLiked } from '../../utlis/utlis';
import { PostOption } from './features/PostOption';

import {BsBookmarks,BsBookmarksFill} from "react-icons/bs"
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import {FaRegComment} from "react-icons/fa";
import { EditCommentModal } from '../../features/EditCommentModal';
import { PostContext } from '../../context/PostContext';
import {FiShare} from "react-icons/fi";
import Modal from 'react-modal';
import "./TweetCard.css"
import { useClickOutside } from '../../hook/clickOutside';

export const TweetCard = ({post,userInfo,token,dispatch,isPostDetail}) => {
  // console.log(post,userInfo,token,dispatch,"di");
    const {
    _id,
    content,
    createdAt,
    likes,
    username,
    profileAvatar,
    comments
    }=post;


    const {likeCount}=likes;
    const [isOpenModal,setIsOpen]=useState(false);
    const [isOpenComment,setOpenComment]=useState(false);
 
    const {updateBookMark,userBookMark}=useContext(AuthContext);
    const {state:{users}}=useContext(PostContext);
    const navigate=useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const postRef=useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useClickOutside(postRef,setIsOpen);
  useClickOutside(postRef,setOpenComment);


    const postUser=users?.find(({username})=>username===post?.username);

  return (
    <div className='PostCard' ref={postRef}>
      <div className='postCard-profileImage'>
        <img onClick={()=>navigate(`/profile/${postUser?.username}`)} src={postUser?.profileAvatar} alt='postuserProfile'/>
      </div>

      <div className='postCard-Content' >
          <div className='postCard-userDetail'>
            <div className='postCard-userInfo' onClick={()=>navigate(`/profile/${postUser?.username}`)}>
              <p>{`${postUser?.firstName} ${postUser?.lastName}`}</p>
              <p>@{username}</p>
            </div>
            <div style={{position:"relative"}}>
              <FiMoreHorizontal size={20} className='postCard-moreIcon' onClick={()=>setIsOpen(!isOpenModal)} style={{position:"relative"}}></FiMoreHorizontal>  
              <div className='postCard-postOptions'>
              {
                isOpenModal&&<PostOption 
                post={post}
                userInfo={userInfo}
                />
              }
            </div>
            </div>
          
          </div>  
          <span className='postCard-content' onClick={()=>navigate(`/post/${_id}`)}>
            {content} 
          </span> 
          <div className='postCard-image'>

            {post?.postImage&&<img src={post?.postImage} className='postCard-image' alt='postImage' onClick={openModal} style={{height:isPostDetail?"500px":null}}/>}
            <div className='postCard-actions'>
              <div className='postCard-actions-item'>
                <span>
                  {isLiked(likes,userInfo.username)?<AiFillHeart color='red' size={20} onClick={()=>dislikeHandler(_id,token,dispatch)}/>:<AiOutlineHeart size={20} onClick={()=>likePostHandler(_id,token,dispatch)}/>}
                </span>
                <span>{likeCount?likeCount:""}</span>
              </div>
              <div className='postCard-actions-item'>
                
                <span>
                <FaRegComment size={20} onClick={()=>setOpenComment(true)}/>
                </span>
                <span>{comments.length?comments.length:""}</span>
                
              </div>
              <div className='postCard-actions-item'>
                <span>
              {isBookMark(userBookMark,post._id)?<BsBookmarksFill size={20} onClick={()=>removeBookMark(post._id,token,updateBookMark)}/>:<BsBookmarks size={20} onClick={()=>bookmark(post._id,token,updateBookMark)}/>}
              </span>
              <span>36</span>
              </div>
              <div className='postCard-actions-item'>
                <span>
              <FiShare size={20}/>
              </span>
              </div>
          </div>
          </div>
            
        </div>
       {isOpenComment&&<EditCommentModal post={post}  initalCommentData={""}  setOpenComment={setOpenComment} addCommentModal={true}/>}
       
       
    </div>
  )
}
