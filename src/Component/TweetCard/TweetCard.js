import React, { useState } from 'react'
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai"
import {FiMoreHorizontal} from "react-icons/fi";
import { dislikeHandler, likePostHandler } from '../../services/postServices';
import { isLiked } from '../../utlis/utlis';
import { PostOption } from './features/PostOption';
import { Center } from '@chakra-ui/react';

export const TweetCard = ({post,userInfo,token,dispatch}) => {
    const {
    _id,
    content,
    createdAt,
    likes,
    username
    }=post;
    const [isOpenModal,setIsOpen]=useState(false);
   
    
  return (
    <div className='tweetCard'>
      <div style={{display:'flex',alignItems:"center",justifyContent:'space-between',position:"relative"}}>
        <h4>{username}</h4>
        <FiMoreHorizontal onClick={()=>setIsOpen(!isOpenModal)}></FiMoreHorizontal>  
        <div className='postOptions' style={{position:'absolute',top:"60%",bottom:0,right:0,backgroundColor:'white',color:'black',boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}>
        {
          isOpenModal&&<PostOption 
          post={post}
          userInfo={userInfo}
          />
        }
        </div>
        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        <p style={{overflow:"hidden",textOverflow: "ellipsis", whiteSpace: "nowrap", width: "200px"}}>
          
          {isLiked(likes,userInfo.username)?<AiFillHeart color='red' onClick={()=>dislikeHandler(_id,token,dispatch)}/>:<AiOutlineHeart onClick={()=>likePostHandler(_id,token,dispatch)}/>}
       {content}  
        </p>
    </div>
  )
}
