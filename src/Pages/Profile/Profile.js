import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { EditProfileModal } from '../../features/EditProfileModal';
import { followUser, loaduserHandler, unfollow } from '../../services/postServices';
import { FiLogOut } from 'react-icons/fi';
import Aside from '../../Component/Aside/Aside';
import { AsideRight } from '../../Component/AsideRight/AsideRIght';
import './Profile.css';
import { getJoinedMonth, getUserId } from '../../utlis/utlis';
import { useClickOutside } from '../../hook/clickOutside';
import { useRef } from 'react';
import { posts } from '../../backend/db/posts';
import { getPostHandler } from '../../backend/controllers/PostController';
import ProfilePost from '../../Component/ProfilePost/ProfilePost';
import { PostContext } from '../../context/PostContext';
import Loader from '../../Component/Loader/Loader';
import ShowRelatedUser from '../../Component/ShowRelatedUserModal/ShowRelatedUser';
import "../../App.css";


export const Profile = () => {
  const { profileId } = useParams();
  const { userInfo, token, updateUser, logoutHandler} =
  useContext(AuthContext);
  const {setLoading,loading}=useContext(PostContext);
  const [relatedUser,setShowRelatedUserModal]=useState({
    show:false,
    title:"",
    list:[]
  })
  const postRef = useRef(null);

  const [profileDetail, setProfileDetail] = useState(null);
  const [editProfileModal, setEditProfileModal] = useState(false);

  const currentLoggedInUser = profileDetail?.username === userInfo?.username;
  const isUserFollowing = userInfo?.following?.find(
    ({ username }) => username === profileDetail?.username
  );

  // const profileUserName=getUserId(profileDetail?.username,users)

  const navigate = useNavigate();

  const getProfileData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/${profileId}`);
      // console.log(response,"ProfilePage");
      setProfileDetail(response.data.user);
    } catch (error) {
      console.log(error, 'ProfilePage');
    }
    finally{
      setLoading(false);
    }
  };

  // useEffect(()=>{
  // getProfileData();
  // },[])
  useEffect(() => {
    getProfileData();
  }, [userInfo,profileId]);

  console.log(profileDetail,"hii")

  // useClickOutside(postRef,setEditProfileModal)

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <aside className='aside'>
        <Aside />
      </aside>

      <div className='main-content'>

      {loading?<Loader/>:
      <>
        <div className='page-header'>
          <BiArrowBack size={30} onClick={() => navigate('/')} />
          <header>
            <h1>{profileDetail?.firstName}</h1>
          </header>
        </div>

        <div className='profile-containerr'>
          <div className='profile-backGround'>
            <img
            width={"100%"}
            height={"100%"}
              src={
                profileDetail?.backgroundImage
              }
              alt='backgroundimage'
            />
          </div>
          <div className='profile-detail'>
            <div className='profile-Action' ref={postRef}>
              {currentLoggedInUser ? (
                <>
                  <button
                    className='editbtn'
                    onClick={() => setEditProfileModal(!editProfileModal)}
                  >
                    Edit profile
                  </button>
                  <FiLogOut
                  style={{cursor:"pointer"}}
                  
                    size={30}
                 
                    onClick={() => logoutHandler()}
                  />
                </>
              ) : null}

              {!currentLoggedInUser && isUserFollowing && (
                <p
                  className='post-option-text'
                  onClick={() =>
                    unfollow(
                      profileDetail?._id,
                      token,
                      updateUser,
                      loaduserHandler
                    )
                  }
                >
                  Unfollow
                </p>
              )}
              {!currentLoggedInUser && !isUserFollowing && (
                <p
                  className='post-option-text'
                  onClick={() =>
                    followUser(
                      profileDetail?._id,
                      token,
                      updateUser,
                      loaduserHandler
                    )
                  }
                >
                  Follow
                </p>
              )}
            </div>
            <div className='profile-info'>
              <h1 className='profile-Name'>{`${profileDetail?.firstName} ${profileDetail?.lastName}`}</h1>
              <p className='profile-light'>@{profileDetail?.username}</p>
              <p>{profileDetail?.bio}</p>

              <a href={profileDetail?.website}>{profileDetail?.website}</a>
              <p className='profile-light'>
                Joined in {getJoinedMonth(profileDetail?.createdAt)}
              </p>
              <div className='user-infoCount'>
                <h5 onClick={()=>setShowRelatedUserModal({
                  show:true,
                  title:"Follower",
                  list:profileDetail?.followers
                })}>{profileDetail?.followers?.length} Followers</h5>
                <h5
                onClick={()=>setShowRelatedUserModal({
                  show:true,
                  title:"Following",
                  list:profileDetail?.following
                })}
                >{profileDetail?.following?.length} Following</h5>
              </div>
            </div>
            <div className='profileImagee'>
              <img src={profileDetail?.profileAvatar} alt='profileAvtar' />
            </div>
          </div>
        </div>
       
        {editProfileModal && (
          <EditProfileModal
            intialState={profileDetail}
            setEditProfileModal={setEditProfileModal}
          />
        )}


        {
          relatedUser.show?
          <div className='modal-wrapper'>
            <ShowRelatedUser relatedUser={relatedUser} setShowRelatedUserModal={setShowRelatedUserModal}/>
          </div>:null
        }
        <ProfilePost username={profileId} />
        
        </>
                }

      </div>


      <div className='aside-right'>
        <AsideRight />
      </div>
    </div>
  );
};
