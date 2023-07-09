import React, { useContext, useRef, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { BsBookmarkDash, BsSearch } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';\

import ConnectLogo from '../../asset/ConnectLogo1.png';
import { AuthContext } from '../../context/AuthContext';
import { useClickOutside } from '../../hook/clickOutside';
import CreatePost from '../CreatePost/CreatePost';
import './Aside.css';

const Aside = () => {
  const { userInfo, logoutHandler } = useContext(AuthContext);
  const [createPostModal, setCreatePostModal] = useState(false);
  const postRef = useRef(null);
  const navigate = useNavigate();
  useClickOutside(postRef, setCreatePostModal);

  return (
    <aside className='aside-container' ref={postRef}>
      <nav className='aside-nav'>
        <NavLink to='/' className='aside-logo'>
          <img
            src={ConnectLogo}
            className='aside-logo-image'
            alt='ConnectLogo'
          />
        </NavLink>
        <NavLink to='/' className='aside-link'>
         <span>
          <span className='aside-icon'>
            <AiOutlineHome color='white' size={25} />
          </span>
          <span className='aside-link-text'>Home</span>
          </span>
        </NavLink>
        <NavLink to='/explore' className='aside-link'>
        <span>
          <span className='aside-icon'>
            <BsSearch color='white' size={25} />
          </span>
          <span className='aside-link-text'>Explore</span>
          </span>
        </NavLink>
        <NavLink to='/bookmark' className='aside-link'>
          <span>
          <span className='aside-icon'>
            <BsBookmarkDash color='white' size={25} />
          </span>
          <span className='aside-link-text'>Bookmarks</span>
          </span>
        </NavLink>
        <NavLink to={`/profile/${userInfo?.username}`} className='aside-link'>
          <span>
          <span className='aside-icon'>
            <MdOutlineAccountCircle color='white' size={25} />
          </span>
          <span className='aside-link-text'>Profile</span>
          </span>
        </NavLink>
        <NavLink onClick={() => logoutHandler()} className='aside-link'>
          <span>
          <span className='aside-icon'>
            <BiLogOut color='white' size={25} />
          </span>
          <span className='aside-link-text'>Logout</span>
          </span>
        </NavLink>
      </nav>
      <div>
        <button
          className='aside-postBtn'
          onClick={() => setCreatePostModal(!createPostModal)}
        >
          Post
        </button>
      </div>
      <div className='aside-footer'>
        <div
          className='aside-profile'
          onClick={() => navigate(`/profile/${userInfo?.username}`)}
        >
          <img
            className='aside-profile-image'
            src={userInfo?.profileAvatar}
            alt='userProfile'
          />
          <div className='aside-profile-info'>
            <p>{`${userInfo?.firstName} ${userInfo?.lastName}`}</p>
            <p>@{userInfo?.username}</p>
          </div>
          <FiMoreHorizontal fill='white' stroke='white' size={20} />
        </div>
      </div>

      
        {createPostModal && (
          <div className='Modal-wrapper' >
          <div className='Modal'>
          <CreatePost setCreatePostModal={setCreatePostModal}  />
          </div>
          </div>
        )}
   
    </aside>
  );
};

export default Aside;
