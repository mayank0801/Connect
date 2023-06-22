import React, { useContext, useEffect } from 'react'
import Aside from '../../Component/Aside/Aside'
import { PostContext } from '../../context/PostContext'
import { TweetCard } from '../../Component/TweetCard/TweetCard';
import { AuthContext } from '../../context/AuthContext';

export const Explore = () => {

const {posts,dispatch}=useContext(PostContext);
console.log(posts,"post")
const {userInfo,token}=useContext(AuthContext);

useEffect(()=>{
},[posts])
  return (
    <div className="home-Container">
    <aside className="aside">
        <Aside/>  
    </aside>
    <div className='main-content'>
      {
        posts.map(post=><TweetCard post={post} userInfo={userInfo} token={token} dispatch={dispatch}/>)
      }

    </div>
    </div>
  )
}
