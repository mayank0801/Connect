import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import Aside from '../../Component/Aside/Aside';
import { AsideRight } from '../../Component/AsideRight/AsideRIght';
import { CommentCard } from '../../Component/CommentCard/CommentCard';
import Loader from '../../Component/Loader/Loader';
import { TweetCard } from '../../Component/TweetCard/TweetCard';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import { Comment } from '../../features/Comment';
import { getUserId } from '../../utlis/utlis';
import './PostDetail.css';

export const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [postDetail, setPosDetail] = useState(null);
  const [postUser, setPostUser] = useState(null);
  const [isOpenModal, setIsOpen] = useState(false);
  const {
    state: { users, post },
  } = useContext(PostContext);
  const { token,  userInfo } =
    useContext(AuthContext);
  const { dispatch,setLoading,loading } = useContext(PostContext);

  const postUserId = getUserId(postDetail?.username, users);

  const getPostUser = async () => {
    try {
      const response = await axios.get(`/api/users/${postUserId}`);
      setLoading(true)
      setPostUser(response.data.user);
      console.log(response.data.user, 'res');
    } catch (error) {
      console.log(error, 'res');
    }
    finally{
      setLoading(false);
    }
  };
  const getPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/posts/${postId}`);
      setPosDetail(response.data.post);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
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

      {

      }
      <div className='main-content'>

        
        <div className='page-Title page-TitleContainer'>
          <BiArrowBack onClick={() => navigate(-1)} />
          <h3 className='title'>Post</h3>
        </div>
{loading?<Loader/>:
<>
        <div className='post-detail-container'>
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
          <div style={{borderBottom:"1px solid #2f3336;"}}>
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
    </>
}

      </div>

      <div className='aside-right'>
        <AsideRight />
      </div>
    </div>
  );
};
