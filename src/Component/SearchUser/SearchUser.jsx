import React, { useContext } from 'react';
import { useState } from 'react';
import { PostContext } from '../../context/PostContext';
import { searchUser } from '../../utlis/utlis';
import './SearchUser.css';
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

  console.log(users, 'search', searchSuggestedUser);

  return (
    <div className='searchContainer'>
      <div className='searchUser-input'>
        <input
          type='text'
          value={searchUserText}
          onChange={(e) => setSearchUserText(e.target.value.trim())}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder='Search Connect'
        />
      </div>
      {isInputFocused && (
        <div className='searchedUser'>
          {searchSuggestedUser.length === 0 ? (
            <div>Search People Across</div>
          ) : (
            searchSuggestedUser.map((user) => (
              <div className='searchUsercontainer'>
                <img
                  className='aside-profile-image'
                  src={user?.profileAvatar}
                  alt='userProfile'
                />
                <div>
                  <p>{`${user.firstName} ${user.lastName}`}</p>
                  <p>@mayank0801</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
