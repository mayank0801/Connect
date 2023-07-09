import React, { useRef, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  bookmark,
  dislikeHandler,
  likePostHandler,
  removeBookMark,
} from '../../services/postServices';
import { formatDate, isBookMark, isLiked } from '../../utlis/utlis';
import { PostOption } from './features/PostOption';

import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import { EditCommentModal } from '../../features/EditCommentModal';
import { useClickOutside } from '../../hook/clickOutside';
import './TweetCard.css';

export const TweetCard = ({
  post,
  userInfo,
  token,
  dispatch,
  isPostDetail,
}) => {

  const { _id, content, createdAt, likes, username, profileAvatar, comments } =
    post;

  const { likeCount } = likes;
  const [isOpenModal, setIsOpen] = useState(false);
  const [isOpenComment, setOpenComment] = useState(false);

  const { updateBookMark, userBookMark } = useContext(AuthContext);
  const {
    state: { users },
  } = useContext(PostContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const postRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useClickOutside(postRef, setIsOpen);
  useClickOutside(postRef, setOpenComment);

  const postUser = users?.find(({ username }) => username === post?.username);

  return (
    <div className='PostCard' ref={postRef}>
      <div className='postCard-profileImage'>
        <img
          onClick={() => navigate(`/profile/${postUser?.username}`)}
          src={postUser?.profileAvatar}
          alt='postuserProfile'
        />
      </div>

      <div className='postCard-Content'>
        <div className='postCard-userDetail'>
          <div
            className='postCard-userInfo'
            onClick={() => navigate(`/profile/${postUser?.username}`)}
          >
            <p>{`${postUser?.firstName} ${postUser?.lastName}`}</p>
            <p>{formatDate(createdAt)}</p>
          </div>
          
          <div style={{ position: 'relative' }}>
            {!isPostDetail && (
              <FiMoreHorizontal
                size={20}
                className='postCard-moreIcon'
                onClick={() => setIsOpen(!isOpenModal)}
                style={{ position: 'relative' }}
              ></FiMoreHorizontal>
            )}
            <div className='postCard-postOptions'>
              {isOpenModal && !isPostDetail && (
                
                <PostOption post={post} userInfo={userInfo} />
         
              )}
            </div>
          </div>
        </div>
        <div className='date-text'>@{postUser?.username}</div>
        <p
          className='post-content-text'
          style={{ wordWrap: 'break-word' }}
          onClick={() => navigate(`/post/${_id}`)}
        >
          {content}
        </p>
        <div
          className='postCard-image'
          onClick={() => navigate(`/post/${_id}`)}
        >
          {post?.postImage && (
            <img
              src={post?.postImage}
              className='postCard-image'
              alt='postImage'
              onClick={openModal}
              style={{ height: isPostDetail ? '500px' : null }}
            />
          )}
          {
            post?.postVideo&&<
            video src={post?.postVideo}
            className='postCard-image'
            controls
            >
            Your Browser Doesnt Support This Video Type
            </video>
          }
        </div>
        <div className='postCard-actions'>
          <div className='postCard-actions-item'>
            <span>
              {isLiked(likes, userInfo.username) ? (
                <AiFillHeart
                  color='red'
                  size={20}
                  onClick={() => dislikeHandler(_id, token, dispatch)}
                />
              ) : (
                <AiOutlineHeart
                  size={20}
                  onClick={() => likePostHandler(_id, token, dispatch)}
                />
              )}
            </span>
            <span>{likeCount ? likeCount : ''}</span>
          </div>
          <div className='postCard-actions-item'>
            <span>
              <FaRegComment size={20} onClick={() => setOpenComment(true)} />
            </span>
            <span>{comments?.length ? comments?.length : ''}</span>
          </div>
          <div className='postCard-actions-item'>
            <span>
              {isBookMark(userBookMark, post._id) ? (
                <BsBookmarksFill
                  size={20}
                  onClick={() =>
                    removeBookMark(post._id, token, updateBookMark, dispatch)
                  }
                />
              ) : (
                <BsBookmarks
                  size={20}
                  onClick={() =>
                    bookmark(post._id, token, updateBookMark, dispatch)
                  }
                />
              )}
            </span>
            
          </div>
          
        </div>
      </div>

      {isOpenComment && (
        <div className='Modal-wrapper'>
          <div className='Modal'>
            <EditCommentModal
          post={post}
          initalCommentData={''}
          setOpenComment={setOpenComment}
          addCommentModal={true}
        />
        </div>
        </div>
      )}
    </div>
  );
};
