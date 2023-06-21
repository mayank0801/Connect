import React from 'react'
import Aside from '../../Component/Aside/Aside'
import { useNavigate, useParams } from 'react-router-dom'
import {BiArrowBack} from "react-icons/bi";
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { PostOption } from '../../Component/TweetCard/features/PostOption';
import { useContext } from 'react';
import { PostContext } from '../../context/PostContext';
import { getUserId, isBookMark, isLiked } from '../../utlis/utlis';
import {IoMdMore} from "react-icons/io"
import { bookmark, dislikeHandler, likePostHandler, removeBookMark } from '../../services/postServices';
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai"
import {BsBookmarks,BsBookmarksFill} from "react-icons/bs"
import { AuthContext } from '../../context/AuthContext';




export const PostDetail = () => {

    const [postDetail,setPosDetail]=useState(null);
    const [postUser,setPostUser]=useState(null);
    const [isOpenModal,setIsOpen]=useState(false);
    const {state:{users,post}}=useContext(PostContext);
    const {postId}=useParams();
    const navigate=useNavigate();
    const {token}=useContext(AuthContext);
    const {userBookMark,updateBookMark,userInfo}=useContext(AuthContext);
    const {dispatch}=useContext(PostContext);
    
    console.log(isLiked(postDetail?.likes,userInfo?.username),post,postDetail,"PostDetail")
    // console.log(users)
    const postUserId=getUserId(postDetail?.username,users);
    // console.log(postUserId)
    const getPostUser=async()=>{
        try {
            const response=await axios.get(`/api/users/${postUserId}`);
            setPostUser(response.data.user);
            // console.log(response.data.user);
        } catch (error) {
            
        }
    }
    const getPost=async()=>{
        try {
            const response=await axios.get(`/api/posts/${postId}`)
            setPosDetail(response.data.post)
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(()=>{
        getPost();
    },[postId,post])
    useEffect(()=>{
        getPostUser();
    },[postUserId])



  return (
    <div className="home-Container">
      <aside className="aside">
                <Aside/>  
        </aside>  
        <div className="main-content">
            <div style={{display:"flex",alignItems:"center"}}>
                <BiArrowBack  onClick={()=>navigate(-1)}/>
                <h3 className="title">Post</h3>
            </div>

            <div>
                <img src={postUser?.profileAvatar} alt="postuserprofile"/>
                <p>{postUser?.firstName}</p>
                <p>{postUser?.username}</p>
                <div>
                    <IoMdMore size={30} onClick={()=>setIsOpen(!isOpenModal)}/>
                   {isOpenModal&&<PostOption post={postDetail} userInfo={postUser}/>}
                </div>
                <p style={{ cursor:"pointer",  overflow:"hidden",textOverflow: "ellipsis", whiteSpace: "nowrap", width: "200px" }}>
          
          {isLiked(postDetail?.likes,userInfo?.username)?<AiFillHeart color='red' onClick={()=>dislikeHandler(postDetail?._id,token,dispatch)}/>:<AiOutlineHeart onClick={()=>likePostHandler(postDetail?._id,token,dispatch)}/>}
          {isBookMark(userBookMark,postDetail?._id)?<BsBookmarksFill onClick={()=>removeBookMark(postDetail?._id,token,updateBookMark)}/>:<BsBookmarks onClick={()=>bookmark(postDetail?._id,token,updateBookMark)}/>}
       {postDetail?.content}  
        </p>
            </div>


        </div>
    </div>
  )
}
