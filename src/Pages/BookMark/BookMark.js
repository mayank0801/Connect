import React, { useContext } from 'react';
import Aside from '../../Component/Aside/Aside';
import { useEffect } from 'react';
import { bookmark } from '../../services/postServices';
import { AuthContext } from '../../context/AuthContext';
import { TweetCard } from '../../Component/TweetCard/TweetCard';
import { PostContext } from '../../context/PostContext';
import { AsideRight } from '../../Component/AsideRight/AsideRIght';

export const BookMark = () => {
  const { userBookMark, userInfo, token } = useContext(AuthContext);
  const { dispatch, posts } = useContext(PostContext);

  console.log(posts, userBookMark, 'userBookMark');
  const userBookMarkPost = posts.filter(({ _id }) =>
    userBookMark.includes(_id)
  );
  console.log(userBookMarkPost, 'userBookMark');

  useEffect(() => {}, [bookmark]);
  return (
    <div className='home-Container'>
      <aside className='aside'>
        <Aside />
      </aside>
      <div className='main-content'>
        <div className='page-Title'>
          <h3 className='title'>BookMark</h3>
        </div>

        {userBookMark.length === 0 ? (
          <h3 className='mainTitle'>No BookMark Post</h3>
        ) : (
          userBookMarkPost.map((post) => (
            <TweetCard
              key={post?._id}
              post={post}
              userInfo={userInfo}
              token={token}
              dispatch={dispatch}
            />
          ))
        )}
      </div>
      <div className='aside-right'>
        <AsideRight />
      </div>
    </div>
  );
};
