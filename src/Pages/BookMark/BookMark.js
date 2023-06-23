import React, { useContext } from 'react'
import Aside from '../../Component/Aside/Aside'
import { useEffect } from 'react'
import { bookmark } from '../../services/postServices'
import { AuthContext } from '../../context/AuthContext'
import { TweetCard } from '../../Component/TweetCard/TweetCard'
import { PostContext } from '../../context/PostContext'

export const BookMark = () => {
    

const {userBookMark,userInfo,token}=useContext(AuthContext);
const {dispatch,posts}=useContext(PostContext);


console.log(posts,userBookMark,"userBookMark")
const userBookMarkPost=posts.filter(({_id})=>userBookMark.includes(_id));
console.log(userBookMarkPost,"userBookMark")

  useEffect(()=>{
  },[bookmark])
  return (
    <div className="home-Container">
    <aside className="aside">
        <Aside/>  
    </aside>
    <div className='main-content'>
      {
        userBookMarkPost.map(post=><TweetCard post={post} userInfo={userInfo} token={token} dispatch={dispatch}/>)
      }

    </div>
    </div>
  )
}
