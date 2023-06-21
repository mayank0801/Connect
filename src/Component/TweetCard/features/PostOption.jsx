import React, { useContext, useState } from 'react';
import './Feature.css'; 
import { PostContext } from '../../../context/PostContext';
import { deletePosthandler, followUser, loaduserHandler, unfollow } from '../../../services/postServices';
import { AuthContext } from '../../../context/AuthContext';
import { EditPostModal } from './EditPostModal';


export const PostOption = ({ post, postUser }) => {
  const {state:{users},dispatch}=useContext(PostContext)
  const {token,updateUser,setUserInfo,userInfo}=useContext(AuthContext)
  const isUserPost = post.username === userInfo.username;
  const [editModal,setEditModal]=useState(false);




  const isUserFollowing=userInfo.following.find(({username})=>username===post.username)
  const followuserId=users.find(({username})=>username===post.username);
  console.log(followuserId)
  console.log(users)
  return (
    <React.Fragment>
        <div className="post-option-container">
        {isUserPost && (
          <>
            <p className="post-option-text" onClick={()=>setEditModal(!editModal)}>Edit</p>
            <p className="post-option-text" onClick={()=>deletePosthandler(post._id,token,dispatch)}>Delete</p>

            <div className='editModal'>
            {
              editModal&&<EditPostModal/>
            }
            </div>

            </>
            )}


        
        {
          isUserFollowing&&<p className='post-option-text' onClick={()=>unfollow(followuserId._id,token,updateUser,loaduserHandler)}>Unfollow</p>
        }

        {!isUserFollowing&&<p className='post-option-text' onClick={()=>followUser(followuserId?._id,token,updateUser,loaduserHandler)}>Follow</p>}

        </div>
    </React.Fragment>
  );
};

