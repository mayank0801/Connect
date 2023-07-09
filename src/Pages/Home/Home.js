import { useContext, useEffect } from 'react';

import Aside from '../../Component/Aside/Aside';
import { AsideRight } from '../../Component/AsideRight/AsideRIght';
import CreatePost from '../../Component/CreatePost/CreatePost';
import Loader from '../../Component/Loader/Loader';
import { SortBar } from '../../Component/SortBar/SortBar';
import { TweetCard } from '../../Component/TweetCard/TweetCard';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import { userFeedPost } from '../../utlis/utlis';
import './Home.css';

export default function Home() {
  const {
    posts,
    dispatch,
    state: { filterType, users },
    setLoading,
    loading,
  } = useContext(PostContext);
  const { userInfo, token } = useContext(AuthContext);

  const userFollowing = userInfo?.following.map((user) => user.username);
  const userFeed = userFeedPost(posts, filterType, userFollowing, userInfo);

  useEffect(() => {}, [userInfo]);

  return (
    <div className='home-Container'>
      <aside className='aside'>
        <Aside />
      </aside>
      <div className='main-content'>
        <div className='page-Title'>
          <h3 className='title'>Home</h3>
        </div>
        <div className='home-createPost'> 
        <CreatePost />
        </div>
        <div className='filter-Tweet'>
          <SortBar />
        </div>

        {loading ? (
          <Loader />
        ) : (
       
        
        <div style={{ width: '100%' }}>
      {userFeed.length===0?<h3 style={{textAlign:"center",marginTop:"1rem"}}>Explore other Post in Explore Section</h3>:
      <div>
            {userFeed.map((post) => (
              <TweetCard
                key={post._id}
                post={post}
                userInfo={userInfo}
                token={token}
                dispatch={dispatch}
              />
            ))}
            </div>
}
          </div>
        
           
        )
        
        }

            
      </div>

      <div className='aside-right'>
        <AsideRight />
      </div>
    </div>
  );
}
