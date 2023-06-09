import React, { useContext, useEffect } from 'react';
import Aside from '../../Component/Aside/Aside';
import { AsideRight } from '../../Component/AsideRight/AsideRIght';
import { TweetCard } from '../../Component/TweetCard/TweetCard';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';

export const Explore = () => {
  const { posts, dispatch } = useContext(PostContext);
  const { userInfo, token } = useContext(AuthContext);

  useEffect(() => {}, [posts]);
  return (
    <div className='home-Container'>
      <aside className='aside'>
        <Aside />
      </aside>
      <div className='main-content'>
        <div className='page-Title'>
          <h3 className='title'>Explore</h3>
        </div>
        <div style={{marginTop:"70px"}}>
        {posts.map((post) => (
          <TweetCard
            post={post}
            userInfo={userInfo}
            token={token}
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
