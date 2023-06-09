import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import "../../App.css";
import Aside from '../../Component/Aside/Aside';
import { AsideRight } from '../../Component/AsideRight/AsideRIght';
import Loader from '../../Component/Loader/Loader';
import ProfilePost from '../../Component/ProfilePost/ProfilePost';
import ShowRelatedUser from '../../Component/ShowRelatedUserModal/ShowRelatedUser';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import { EditProfileModal } from '../../features/EditProfileModal';
import { useClickOutside } from '../../hook/clickOutside';
import { followUser, loaduserHandler, unfollow } from '../../services/postServices';
import { getJoinedMonth } from '../../utlis/utlis';
import './Profile.css';


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
      setProfileDetail(response.data.user);
    } catch (error) {
      console.log(error);
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


  // useClickOutside(postRef,setEditProfileModal);
  // useClickOutside(postRef,setShowRelatedUserModal)

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
                <h5 
                className='cursor'
                onClick={()=>setShowRelatedUserModal({
                  show:true,
                  title:"Follower",
                  list:profileDetail?.followers
                })}>{profileDetail?.followers?.length} Followers</h5>
                <h5
                className='cursor'
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
          <div className='Modal-wrapper'>
            <div className='Modal' style={{width:"20%"}} ref={postRef}>
            <ShowRelatedUser relatedUser={relatedUser} setShowRelatedUserModal={setShowRelatedUserModal}/>
            </div>
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
