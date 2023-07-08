import React, { useContext } from 'react';
import { SearchUser } from '../SearchUser/SearchUser';
import { PostContext } from '../../context/PostContext';
import { AuthContext } from '../../context/AuthContext';
import { suggestedUser } from '../../utlis/utlis';
import { followUser, loaduserHandler } from '../../services/postServices';
import { AiOutlinePlus } from 'react-icons/ai';
import { useEffect } from 'react';
import './AsideRight.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

export const AsideRight = () => {
  const {
    state: { users },
    setLoading,
    loading,
  } = useContext(PostContext);
  const { userInfo } = useContext(AuthContext);

  const suggestedInfo = suggestedUser(users, userInfo);
  const { token, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='aside-Right'>
      <div className='serachUser-container'>
      <SearchUser />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {suggestedInfo.length ? (
            <div className='user-container'>
              <h2>Who To Follow</h2>
              {suggestedInfo.map((user) => (
                <div
                  className='suggestedUser'
                  onClick={() => navigate(`/profile/${user?.username}`)}
                >
                  <span className='suggestedUserInfo'>
                    <img
                      className='suggestedUser-image'
                      src={user.profileAvatar}
                      alt='i'
                    />
                    <h3>{user.username}</h3>
                  </span>
                  <AiOutlinePlus
                    size={20}
                    onClick={(e) => {
                      e.stopPropagation();
                      followUser(
                        user._id,
                        token,
                        updateUser,
                        loaduserHandler,
                        setLoading
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
