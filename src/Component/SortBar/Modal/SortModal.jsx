import React, { useContext, useState } from 'react';
import './SortModal.css';
import { PostContext } from '../../../context/PostContext';
import { useRef } from 'react';
const SortModal = () => {
  const { state, dispatch } = useContext(PostContext);
  return (
    <div className='sort-modal'>
      <p
        className='sort-option'
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ TYPE: 'SET_FILTERTYPE', payLoad: 'LATEST' });
        }}
      >
        Latest
      </p>
      <p
        className='sort-option'
        onClick={() => dispatch({ TYPE: 'SET_FILTERTYPE', payLoad: 'OLDEST' })}
      >
        Oldest
      </p>
      <p
        className='sort-option'
        onClick={() =>
          dispatch({ TYPE: 'SET_FILTERTYPE', payLoad: 'TRENDING' })
        }
      >
        Trending
      </p>
    </div>
  );
};

export default SortModal;
