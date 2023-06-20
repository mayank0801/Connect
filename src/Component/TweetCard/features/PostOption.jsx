import React, { useContext } from 'react';
import './Feature.css'; 
import { PostContext } from '../../../context/PostContext';
import { deletePosthandler, loaduserHandler, unfollow } from '../../../services/postServices';
import { AuthContext } from '../../../context/AuthContext';


export const PostOption = ({ post, userInfo }) => {
  const {state:{users},dispatch}=useContext(PostContext)
  const {token,updateUser,setUserInfo}=useContext(AuthContext)
  const isUserPost = post.username === userInfo.username;




  const isUserFollowing=userInfo.following.find(({username})=>username===post.username)
  const followuserId=users.find(({username})=>username===post.username);
  console.log(followuserId)
  console.log(users)
  return (
    <React.Fragment>
        <div className="post-option-container">
        {isUserPost && (
          <>
            <p className="post-option-text">Edit</p>
            <p className="post-option-text" onClick={()=>deletePosthandler(post._id,token,dispatch)}>Delete</p>
            </>
            )}

        
        {
          isUserFollowing&&<p className='post-option-text' onClick={()=>unfollow(followuserId._id,token,updateUser,loaduserHandler)}>Unfollow</p>
        }

        </div>
    </React.Fragment>
  );
};

