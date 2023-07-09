import EmojiPicker from 'emoji-picker-react';
import GifPicker from 'gif-picker-react';
import { useContext, useRef, useState } from 'react';
import { AiOutlineGif } from "react-icons/ai";
import { BsEmojiSmile } from 'react-icons/bs';
import { MdPermMedia } from 'react-icons/md';
import { RxCrossCircled } from 'react-icons/rx';
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';
import { useClickOutside } from '../../hook/clickOutside';
import {
  cloudinaryImageFetcher,
  cloudinaryVideoFetcher,
  createPosthandler,
} from '../../services/postServices';
import { CreatePostEmpty, isMediaFileLarge, isVideo } from '../../utlis/utlis';
import './CreatePost.css';

export default function CreatePost({ setCreatePostModal }) {
  const {
    posts, 
    dispatch,
    state: { filterType, users },
    setLoading,
  } = useContext(PostContext);
  const { userInfo, token } = useContext(AuthContext);

  const [postContent, setpostContent] = useState({
    content: '',
    postImage: '',
    postVideo:'',
  });
  const [emojiModal, setEmojiModal] = useState(false);
  const [cloudinaryMedia, setcloudinaryMedia] = useState('');
  const [gifModal,setGifModal]=useState(false);

  const inputRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name,value,"event.target")
    if (name === 'postImage') {
    if(!value){return ;}
     else if(isVideo(event.target.files[0])){
        console.log("Video","event.target");
        if(!isMediaFileLarge(event.target.files[0])) 
        {
        return null;
        }
        else{
        setpostContent({
          ...postContent,
          postVideo:URL.createObjectURL(event.target.files[0])
        })
        setcloudinaryMedia(event.target.files[0]);
      }
      }
      else {
        setpostContent({
          ...postContent,
          postImage: URL.createObjectURL(event.target.files[0]),
        });
        setcloudinaryMedia(event.target.files[0]);
      }
    
      
    } else setpostContent({ ...postContent, [name]: value });
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };
  const postSubmitHandler = async () => {
    console.log("CheckPoint")
    let postMedia = '';
    if (postContent.postImage)
      postMedia = await cloudinaryImageFetcher(cloudinaryMedia);
    else if(postContent.postVideo)
      postMedia=await cloudinaryVideoFetcher(cloudinaryMedia);
    await createPosthandler(
      {
        ...postContent,
        postImage: postContent.postImage ? postMedia?.url : '',
        postVideo:postContent.postVideo?postMedia?.url:''
      },
      token,
      dispatch,
      setLoading
    );
    console.log(postMedia,"videoUrl")
    setpostContent({ content: '', postImage: '',postVideo:"" });
    setCreatePostModal && setCreatePostModal(false);
  };

  const openFile = () => {
    inputRef.current.click();
  };
  const emojiRef = useRef(null);
  const gifRef=useRef(null);
  const refOutisde=useRef()
  useClickOutside(emojiRef, setEmojiModal);
  useClickOutside(gifRef,setGifModal);
  return (
    <div className='createPost' ref={refOutisde}>
      <div className='profileImage'>
        <img className='profile' src={userInfo?.profileAvatar} alt='profile' />
      </div>

      <div className='postContent'>
        <textarea
          className={postContent.content ? 'postContent' : 'placeholder'}
          name='content'
          rows='1'
          value={postContent?.content}
          onChange={handleChange}
          placeholder='What is Happening?!'
        />
        <div className='post-img'>
          {postContent?.postImage && (
            <>
              <img
                width={'100%'}
                src={postContent?.postImage}
                alt='postimage'
              />
              <RxCrossCircled
                size={30}
                color='red'
                className='cross-icon'
                onClick={() =>
                  setpostContent({ ...postContent, postImage: '' })
                }
              />
            </>
          )}
        </div>
        <div className='post-video'>
          {
            postContent?.postVideo&&(
              <>
              <video width={"100%"} height={"100%"} src={postContent?.postVideo} controls>
              Your browser does not support the video tag.
                </video>
                <RxCrossCircled
                size={30}
                color='red'
                className='cross-icon'
                onClick={() =>
                  setpostContent({ ...postContent, postVideo: '' })
                }
              />
              
              </>
            )
          }
        </div>

        <div className='post-icons'>
          <div className='post-icons-item'>
            <span>
              <MdPermMedia
                size={30}
                fill='white'
                className='icon'
                onClick={openFile}
              />
              <input
                type='file'
                name='postImage'
                style={{ display: 'none' }}
                ref={inputRef}
                onChange={handleChange}
              />
            </span>

           
            <span>
              <BsEmojiSmile
                fill='white'
                size={30}
                className='icon'
                onClick={() => setEmojiModal(!emojiModal)}
              />
              <div ref={emojiRef} style={{ position: 'absolute', zIndex: '5' }}>
                {emojiModal && (
                  <EmojiPicker
                    theme='dark'
                    onEmojiClick={(emoji, event) => {
                      console.log(emoji.emoji);
                      setpostContent({
                        ...postContent,
                        content: postContent.content + emoji.emoji,
                      });
                    }}
                  />
                )}
              </div>
            </span>


            <span>
              <AiOutlineGif size={30} fill='white' stroke='white' onClick={()=>setGifModal(!gifModal)} />
              <div className='gif-wrapper' ref={gifRef}>
                {gifModal&&<GifPicker tenorApiKey={'AIzaSyC3f2te0YYy3yg9e-dEGdxou0J52mOWsgo'}
                onGifClick={(TenorImage)=>
                  {
                    setpostContent({...postContent,postImage:TenorImage.url})
                    setcloudinaryMedia(TenorImage.url)
                  }}
                />}
              </div>
            </span>

          </div>
          <button
            className='postbtn'
            onClick={() => postSubmitHandler()}
            disabled={CreatePostEmpty(postContent)}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
