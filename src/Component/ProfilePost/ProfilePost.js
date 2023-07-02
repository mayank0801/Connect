import { useContext, useEffect, useState } from 'react';
import { getAllUserPostsHandler } from '../../backend/controllers/PostController';
import { TweetCard } from '../TweetCard/TweetCard';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { PostContext } from '../../context/PostContext';

export default function ProfilePost({ username }) {
  console.log(username, 'username');

  const [userPost, setUserPost] = useState([]);
  const { token, userInfo } = useContext(AuthContext);
  const { posts, dispatch } = useContext(PostContext);

  const getUserPost = async () => {
    try {
      const response = await axios.get(`/api/posts/user/${username}`);
      console.log(response.data);
      setUserPost(response.data.posts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserPost();
    console.log('hii');
  }, [posts]);
  return (
    <div>
      {userPost.map((post) => (
        <TweetCard
          post={post}
          userInfo={userInfo}
          token={token}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}
