import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  cloudinaryImageFetcher,
  cloudinaryVideoFetcher,
  updateUserhandler,
} from '../services/postServices';
import { AuthContext } from '../context/AuthContext';
import { AiOutlineCamera } from 'react-icons/ai';
import { useClickOutside } from '../hook/clickOutside';

const avatars = [
  'https://png.pngtree.com/png-clipart/20210619/ourlarge/pngtree-instagram-social-media-men-round-glasses-avatar-png-image_3483988.jpg',
  'https://png.pngtree.com/png-clipart/20210619/ourlarge/pngtree-instagram-lady-social-media-flat-style-avatar-png-image_3483977.jpg',
  'https://images.assetsdelivery.com/compings_v2/elvie15veronika/elvie15veronika2005/elvie15veronika200500053.jpg',
  'https://media.istockphoto.com/id/1227320122/es/vector/lindo-icono-de-avatar-de-chica-vectorial-bonito-retrato-de-dama.jpg?s=170667a&w=0&k=20&c=cWF7e0o_IU-ZJpWb2G8ZocBPM6hY6W5EyRY3m_eUUK8=',
  'https://img.freepik.com/premium-vector/hippie-old-woman-avatar-vector-illustration_621685-62.jpg?w=2000',
  'https://img.freepik.com/premium-vector/portrait-elderly-man-wearing-glasses-avatar-grandfather-social-media_645574-624.jpg',
  'https://png.pngtree.com/png-clipart/20220909/original/pngtree-man-avatar-wearing-gray-suit-png-image_8494093.png',
  'https://png.pngtree.com/png-clipart/20230102/original/pngtree-business-man-avatar-png-image_8855195.png'
];
export const EditProfileModal = ({ intialState, setEditProfileModal }) => {
  const [userData, setuserData] = useState(intialState);
  const { token, userInfo, updateUser } = useContext(AuthContext);
  const [profileFileAvatar, setProfileAvatar] = useState(
    intialState.profileAvatar
  );
  const [profileBackground,setProfileBackground]=useState(intialState.backgroundImage)
  const inputRef = useRef(null);
  const backgroundRef=useRef(null);

  const [cloudnaryImage, setCloudnaryImage] = useState('');
  const [cloudnaryBackgroundImage,setCloudnaryBackgroundImage]=useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setuserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    let profileAvatarUrl = await cloudinaryImageFetcher(cloudnaryImage);
    let backgroundImage=await cloudinaryImageFetcher(cloudnaryBackgroundImage);
    console.log(backgroundImage,"url")
    if (!profileAvatarUrl) profileAvatarUrl = intialState?.profileAvatar;
    if(!backgroundImage) backgroundImage=intialState?.backgroundImage;
    updateUserhandler(
      { ...userData, profileAvatar: profileAvatarUrl.url,backgroundImage:backgroundImage.url },
      token,
      updateUser
    );
    setEditProfileModal(false);
  };

  const performAction = (e) => {
    e.stopPropagation();
    inputRef.current.click();
  };
  const performAction1=(e)=>{
    e.stopPropagation();
    backgroundRef.current.click();
  }

  const containerRef = useRef(null);
  useClickOutside(containerRef, setEditProfileModal);

  return (
    <div className='edit-profile-modal' ref={containerRef}>


<div className='edit-profile-image'>
        <span className='user-background-image'>
          <img src={profileBackground} alt='background'/>
          <AiOutlineCamera
            size={30}
            fill='blue'
            stroke='blue'
            className='camera-icon1'
            onClick={performAction1}
          />
          <input
            type='file'
            ref={backgroundRef}
            style={{ display: 'none' }}
            onChange={(e) => {
              if(e.target.files[0]){
              setProfileBackground(URL?.createObjectURL(e.target.files[0]));
              setCloudnaryBackgroundImage(e.target.files[0]);
              }
            }}
          />
        </span>
        <span className='user-profile-image'>
          <img
            className='edit-profile-avatar'
            src={profileFileAvatar}
            alt='profileAvatar'
          />
          <AiOutlineCamera
            size={30}
            fill='blue'
            stroke='blue'
            className='camera-icon'
            onClick={performAction}
          />
          <input
            type='file'
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={(e) => {
              if(e.target.files[0]){
              setProfileAvatar(URL?.createObjectURL(e.target.files[0]));
              setCloudnaryImage(e.target.files[0]);
              }
            }}
          />
        </span>
      </div>


      <div style={{padding:"1rem",marginTop:"10%"}}> 
      <div className='chooseavatar-container'>
        {avatars.map((avatar) => (
          <div key={avatar}>
            <img
              className='avatar-image'
              src={avatar}
              alt='avatar'
              onClick={() => {
                setCloudnaryImage(avatar);
                setProfileAvatar(avatar);
              }}
            />
          </div>
        ))}
      </div>

  
      <div className='editProfile-modal-input'>
        <label>Name:</label>
        <input
          name='bio'
          type='text'
          value={userData?.bio}
          onChange={handleChange}
        />
        <label>Website:</label>
        <input
          name='website'
          type='text'
          value={userData?.website}
          onChange={handleChange}
        />
      </div>
      <button className='updateBtn' onClick={() => handleSubmit()}>
        Update
      </button>
      <button className='updateBtn' onClick={() => setEditProfileModal(false)}>
        Discard
      </button>
      </div>
    </div>

  );
};
