import React, { useContext, useState } from 'react'
import {MdTune} from "react-icons/md"
import "./SortBar.css"
import  SortModal  from './Modal/SortModal';
import { PostContext } from '../../context/PostContext';
export const SortBar = () => {

    // const [sortType,setSortType]=use
    const {state:{filterType}}=useContext(PostContext);
    // console.log(filterType,"filterType")
    const [isOpenPostOptions,setPostOption]=useState(false);

  return (
    <div className='sortFilter'>
        <h3>{filterType?filterType:"Filter"}</h3>
        <div className='pointer' onClick={()=>setPostOption(!isOpenPostOptions)}><MdTune/></div>
        <div className='post-option'>
        {
            isOpenPostOptions&&<SortModal/>
        }
        </div>
    </div>
  )
}
