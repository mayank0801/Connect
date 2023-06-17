import React from 'react'
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai"
import { dislikeHandler, likePostHandler } from '../../services/postServices';
import { isLiked } from '../../utlis/utlis';
export const TweetCard = ({post,userInfo,token,dispatch}) => {
    const {
    _id,
    content,
    createdAt,
    likes,
    username
    }=post;

    
  return (
    <div style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
        <h4>{username}{likes.likeCount}</h4>
        <p style={{overflow:"hidden",textOverflow: "ellipsis", whiteSpace: "nowrap", width: "200px"}}>
          {console.log(isLiked(likes,userInfo.username),_id,"liked")}
          {isLiked(likes,userInfo.username)?<AiFillHeart color='red' onClick={()=>dislikeHandler(_id,token,dispatch)}/>:<AiOutlineHeart onClick={()=>likePostHandler(_id,token,dispatch)}/>}
       
  {content}
</p>
    </div>
  )
}
