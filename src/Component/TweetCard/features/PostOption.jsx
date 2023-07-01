import React, { useContext, useState } from 'react';
import './PostOption.css'; 
import { PostContext } from '../../../context/PostContext';
import { deletePosthandler, followUser, loaduserHandler, unfollow } from '../../../services/postServices';
import { AuthContext } from '../../../context/AuthContext';
import { CreatePostModal } from '../../../features/CreatePostModal';



export const PostOption = ({ post, postUser }) => {
  const {state:{users},dispatch}=useContext(PostContext)
  const {token,updateUser,userInfo}=useContext(AuthContext)
  const isUserPost = post.username === userInfo.username;
  const [isPostModal,setPostModal]=useState(false);







  const isUserFollowing=userInfo.following.find(({username})=>username===post.username)
  const followuserId=users.find(({username})=>username===post.username);
  console.log(followuserId)
  console.log(users)


 


  return (
    <div className='userPost-optionConatiner'>
        <div className="userPost-option">
        {isUserPost && (
          <>
            <p className="userPost-option-text" onClick={()=>setPostModal(!isPostModal)}>Edit</p>
            <p className="userPost-option-text" onClick={()=>deletePosthandler(post._id,token,dispatch)}>Delete</p>

            <div className='editModal'>
            {
              isPostModal&&<CreatePostModal setPostModal={setPostModal} intialPostData={{content:post.content,postImage:post.postImage}} />
            }
            </div>

            </>
            )}


        
        {
          isUserFollowing&&<p className='userPost-option-text' onClick={()=>
            unfollow(followuserId._id,token,updateUser,loaduserHandler)}>Unfollow</p>
        }

        {!isUserFollowing&&!isUserPost&&<p className='userPost-option-text' onClick={()=>followUser(followuserId?._id,token,updateUser,loaduserHandler)}>Follow</p>}

        </div>
    </div>
  );
};

