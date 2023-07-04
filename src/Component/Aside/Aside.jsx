import React, { useContext } from 'react';
import './Aside.css';
import ConnectLogo from '../../asset/ConnectLogo1.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { AiOutlineHome } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { BsBookmarkDash } from 'react-icons/bs';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { FiMoreHorizontal } from 'react-icons/fi';
import { LuVerified } from 'react-icons/lu';
import { BiLogOut } from 'react-icons/bi';
import { useState } from 'react';
import { CreatePostModal } from '../../features/CreatePostModal';
import CreatePost from '../CreatePost/CreatePost';
import { useClickOutside } from '../../hook/clickOutside';
import { useRef } from 'react';

const Aside = () => {
  const { userInfo, logoutHandler } = useContext(AuthContext);
  const [createPostModal, setCreatePostModal] = useState(false);
  const postRef = useRef(null);
  const navigate = useNavigate();
  useClickOutside(postRef, setCreatePostModal);

  return (
    <aside className='aside-container'>
      <nav className='aside-nav'>
        <NavLink to='/' className='aside-logo'>
          <img
            src={ConnectLogo}
            className='aside-logo-image'
            alt='ConnectLogo'
          />
        </NavLink>
        <NavLink to='/' className='aside-link'>
          <span className='aside-icon'>
            <AiOutlineHome color='white' size={25} />
          </span>
          <span className='aside-link-text'>Home</span>
        </NavLink>
        <NavLink to='/explore' className='aside-link'>
          <span className='aside-icon'>
            <BsSearch color='white' size={25} />
          </span>
          <span className='aside-link-text'>Explore</span>
        </NavLink>
        <NavLink to='/bookmark' className='aside-link'>
          <span className='aside-icon'>
            <BsBookmarkDash color='white' size={25} />
          </span>
          <span className='aside-link-text'>Bookmarks</span>
        </NavLink>
        <NavLink to={`/profile/${userInfo?.username}`} className='aside-link'>
          <span className='aside-icon'>
            <MdOutlineAccountCircle color='white' size={25} />
          </span>
          <span className='aside-link-text'>Profile</span>
        </NavLink>
        <NavLink onClick={() => logoutHandler()} className='aside-link'>
          <span className='aside-icon'>
            <BiLogOut color='white' size={25} />
          </span>
          <span className='aside-link-text'>Logout</span>
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

      <div className='createPostModal' ref={postRef}>
        {createPostModal && (
          <CreatePost setCreatePostModal={setCreatePostModal} />
        )}
      </div>
    </aside>
  );
};

export default Aside;
