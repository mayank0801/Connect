import React, { useContext } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FiTrendingUp } from "react-icons/fi";
import { PostContext } from '../../../context/PostContext';
import './SortModal.css';
const SortModal = () => {
  const { state, dispatch } = useContext(PostContext);
  return (
    <div className='sort-modal'>
      <span className='sort-option'  onClick={(e) => {
          e.stopPropagation();
          dispatch({ TYPE: 'SET_FILTERTYPE', payLoad: 'LATEST' });
        }}>
        <AiFillCaretUp/>
      <p>
        Latest
      </p>
      </span>
      <span className='sort-option' onClick={() => dispatch({ TYPE: 'SET_FILTERTYPE', payLoad: 'OLDEST' })}>
        <AiFillCaretDown/>
      <p>
        Oldest
      </p>
      </span>
      <span className='sort-option'  onClick={() =>
          dispatch({ TYPE: 'SET_FILTERTYPE', payLoad: 'TRENDING' })
        }>
      <FiTrendingUp color="white" 
      />
      <p>
        Trending
      </p>
      </span>
    </div>
  );
};

export default SortModal;
