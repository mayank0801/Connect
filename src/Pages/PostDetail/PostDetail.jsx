import React from 'react';
import Aside from '../../Component/Aside/Aside';
import { useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { PostOption } from '../../Component/TweetCard/features/PostOption';
import { useContext } from 'react';
import { PostContext } from '../../context/PostContext';
import { getUserId, isBookMark, isLiked } from '../../utlis/utlis';
import { IoMdMore } from 'react-icons/io';
import {
  bookmark,
  dislikeHandler,
  likePostHandler,
  removeBookMark,
} from '../../services/postServices';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs';
import { AuthContext } from '../../context/AuthContext';
import { Comment } from '../../features/Comment';
import { CommentCard } from '../../Component/CommentCard/CommentCard';
import { AsideRight } from '../../Component/AsideRight/AsideRIght';
import './PostDetail.css';
import { TweetCard } from '../../Component/TweetCard/TweetCard';

export const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [postDetail, setPosDetail] = useState(null);
  const [postUser, setPostUser] = useState(null);
  const [isOpenModal, setIsOpen] = useState(false);
  const {
    state: { users, post },
  } = useContext(PostContext);
  const { token, userBookMark, updateBookMark, userInfo } =
    useContext(AuthContext);
  const { dispatch } = useContext(PostContext);

  const postUserId = getUserId(postDetail?.username, users);

  const getPostUser = async () => {
    try {
      const response = await axios.get(`/api/users/${postUserId}`);
      setPostUser(response.data.user);
      console.log(response.data.user, 'res');
    } catch (error) {
      console.log(error, 'res');
    }
  };
  const getPost = async () => {
    try {
      const response = await axios.get(`/api/posts/${postId}`);
      setPosDetail(response.data.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [postId, post]);
  useEffect(() => {
    getPostUser();
  }, [postUserId]);

  console.log(postUser, 'postUser');

  return (
    <div className='home-Container'>
      <aside className='aside'>
        <Aside />
      </aside>
      <div className='main-content'>
        <div className='page-Title page-TitleContainer'>
          <BiArrowBack onClick={() => navigate(-1)} />
          <h3 className='title'>Post</h3>
        </div>

        <div>
          {postDetail && postUser && (
            <TweetCard
              post={postDetail}
              userInfo={userInfo}
              token={token}
              dispatch={dispatch}
              isPostDetail={true}
            />
          )}
        </div>
        <div className='comment-section'>
          <div>
            <Comment post={postDetail} />
          </div>
          {postDetail?.comments?.map((comment) => (
            <CommentCard
              comment={comment}
              post={postDetail}
              dispatch={dispatch}
            />
          ))}
        </div>
      </div>

      <div className='aside-right'>
        <AsideRight />
      </div>
    </div>
  );
};
