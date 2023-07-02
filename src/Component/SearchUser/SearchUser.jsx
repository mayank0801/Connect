import React, { useContext, useRef } from 'react';
import { useState } from 'react';
import { PostContext } from '../../context/PostContext';
import { searchUser } from '../../utlis/utlis';
import './SearchUser.css';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '../../hook/clickOutside';
export const SearchUser = () => {
  const {
    state: { users },
  } = useContext(PostContext);
  const [searchUserText, setSearchUserText] = useState('');
  const searchSuggestedUser = searchUser(users, searchUserText);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const navigate=useNavigate();
  const inputRef=useRef(null);
  useClickOutside(inputRef,setIsInputFocused);
  return (
    <div className='searchContainer'>
      <div className='searchUser-input'>
        <input
          type='text'
          value={searchUserText}
          onChange={(e) => setSearchUserText(e.target.value.trim())}
          onFocus={handleInputFocus}
          
          placeholder='Search Connect'
        />
      </div>
      {isInputFocused && (
        <div className='searchedUser' ref={inputRef}>
          {searchSuggestedUser.length === 0 ? (
            <div>Search People Across</div>
          ) : (
            searchSuggestedUser.map((user) => (
              <div className='searchUsercontainer' onClick={(e)=>{
                e.stopPropagation();
                navigate(`/profile/${user?.username}`)}
              }>
                <img
                  className='aside-profile-image'
                  src={user?.profileAvatar}
                  alt='userProfile'

                />
                <div>
                  <p>{`${user.firstName} ${user.lastName}`}</p>
                  <p>{user?.username}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
