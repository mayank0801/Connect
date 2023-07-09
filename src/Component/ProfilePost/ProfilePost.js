import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import { TweetCard } from '../TweetCard/TweetCard';

export default function ProfilePost({ username }) {
  const [userPost, setUserPost] = useState([]);
  const { token, userInfo } = useContext(AuthContext);
  const { posts, dispatch } = useContext(PostContext);

  const getUserPost = async () => {
    try {
      const response = await axios.get(`/api/posts/user/${username}`);
      setUserPost(response.data.posts);
    } catch (error) {
      toast.error("Something Went Wrong")
    }
  };

  useEffect(() => {
    getUserPost();
  }, [posts, username]);
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
