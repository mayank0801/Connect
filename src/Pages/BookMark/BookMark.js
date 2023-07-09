import React, { useContext } from 'react';
import Aside from '../../Component/Aside/Aside';
import { AsideRight } from '../../Component/AsideRight/AsideRIght';
import { TweetCard } from '../../Component/TweetCard/TweetCard';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';

export const BookMark = () => {
  const { userBookMark, userInfo, token } = useContext(AuthContext);
  const { dispatch, posts } = useContext(PostContext);

 
  const userBookMarkPost = posts.filter(({ _id }) =>
    userBookMark.includes(_id)
  );



  return (
    <div className='home-Container' style={{overflowY:"scroll"}}>
      <aside className='aside'>
        <Aside />
      </aside>
      <div className='main-content'>
        <div className='page-Title' style={{width:"44%"}}>
          <p className='title'>BookMark</p>
        </div>
<div style={{marginTop:"70px"}}>
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
</div>
      <div className='aside-right'>
        <AsideRight />
      </div>
    </div>
  );
};
