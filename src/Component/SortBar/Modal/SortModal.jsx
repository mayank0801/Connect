import React, { useContext, useState } from 'react';
import './SortModal.css';
import { PostContext } from '../../../context/PostContext';
import { useRef } from 'react';
import {FiTrendingUp} from "react-icons/fi";
import {AiFillCaretDown} from "react-icons/ai";
import {AiFillCaretUp} from "react-icons/ai"
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
