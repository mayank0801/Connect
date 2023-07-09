import React, { useContext, useRef, useState } from 'react';
import { MdTune } from 'react-icons/md';
import { PostContext } from '../../context/PostContext';
import { useClickOutside } from '../../hook/clickOutside';
import SortModal from './Modal/SortModal';
import './SortBar.css';
export const SortBar = () => {
  // const [sortType,setSortType]=use
  const {
    state: { filterType },
  } = useContext(PostContext);
  const postRef = useRef(null);
  const [isOpenPostOptions, setPostOption] = useState(false);

  useClickOutside(postRef, setPostOption);

  return (
    <div className='sortFilter'>
      <h3>{filterType ? filterType : 'Filter'}</h3>
      <div
        className='pointer'
        onClick={() => setPostOption(!isOpenPostOptions)}
      >
        <MdTune size={18}/>
      </div>
      <div className='post-option' ref={postRef}>
        {isOpenPostOptions && <SortModal />}
      </div>
    </div>
  );
};
