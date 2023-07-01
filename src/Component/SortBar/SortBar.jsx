import React, { useContext, useRef, useState } from 'react'
import {MdTune} from "react-icons/md"
import "./SortBar.css"
import  SortModal  from './Modal/SortModal';
import { PostContext } from '../../context/PostContext';
import { useClickOutside } from '../../hook/clickOutside';
export const SortBar = () => {

    // const [sortType,setSortType]=use
    const {state:{filterType}}=useContext(PostContext);
    const postRef=useRef(null);
    // console.log(filterType,"filterType")
    const [isOpenPostOptions,setPostOption]=useState(false);


    useClickOutside(postRef,setPostOption)

  return (
    <div className='sortFilter' >
        <h3>{filterType?filterType:"Filter"}</h3>
        <div className='pointer' onClick={()=>setPostOption(!isOpenPostOptions)} ref={postRef}><MdTune/></div>
        <div className='post-option'>
        {
            isOpenPostOptions&&<SortModal/>
        }
        </div>
    </div>
  )
}
