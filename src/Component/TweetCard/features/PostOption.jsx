import React, { useContext } from 'react';
import './Feature.css'; 
import { PostContext } from '../../../context/PostContext';
import { deletePosthandler } from '../../../services/postServices';
import { AuthContext } from '../../../context/AuthContext';


export const PostOption = ({ post, userInfo }) => {
  const {dispatch}=useContext(PostContext)
  const {token}=useContext(AuthContext)
  const isUserPost = post.username === userInfo.username;

  return (
    <>
      {isUserPost && (
        <div className="post-option-container">
          <p className="post-option-text">Edit</p>
          <p className="post-option-text" onClick={()=>deletePosthandler(post._id,token,dispatch)}>Delete</p>
        </div>
      )}
    </>
  );
};
