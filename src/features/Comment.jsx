import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';
import { addComment } from '../services/postServices';
import './Feature.css';

export const Comment = ({ post }) => {
  const [commentContent, setcommentContent] = useState('');
  const { token, userInfo } = useContext(AuthContext);
  const { dispatch } = useContext(PostContext);

  const handleChange = (event) => {
    setcommentContent(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };
  const handleSubmit = async () => {
    await addComment(post._id, commentContent, token, dispatch);
    setcommentContent('');
  };

  return (
    <>
      <div className='userComment-input'>
        <div className='comment-userProfile'>
          <img src={userInfo?.profileAvatar} alt='profile' />
        </div>

        <div className='comment-content'>
          <textarea
            name='content'
            rows='1'
            value={commentContent}
            onChange={(e) => handleChange(e)}
            placeholder='Post a Comment'
          />
          <button
            className='commentbtn'
            onClick={() => handleSubmit()}
            disabled={commentContent.length === 0}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
};
