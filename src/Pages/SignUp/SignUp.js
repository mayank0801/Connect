import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';
import ConnectLogo from '../../asset/ConnectLogo1.png';
const SignUp = () => {
  const { signupHandler } = useContext(AuthContext);
  const[confirmPassWord,setConfirmPassWord]=useState("");
  const [signUpInfo, setSignUpInfo] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    profileAvatar:
      'https://png.pngtree.com/png-clipart/20210619/ourlarge/pngtree-instagram-social-media-men-round-glasses-avatar-png-image_3483988.jpg',
  });
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await signupHandler(signUpInfo);
      console.log(response);
      navigate('/');
    } catch {}
  };
  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='logo'>
          <span className='logo-item'>
            <img height={'50px'} width={'50px'} src={ConnectLogo} alt='logo' />
            <span className='logo-text'>Connecting People</span>
          </span>
        </div>
        <h1 style={{ textAlign: 'center', color: 'blue' }}>Signup</h1>
      
          <form onSubmit={submitHandler}>
            <label className='input-lable'>
              <span className='label-text'>FirstName*</span>
              <input
                type='text'
                placeholder='Mayank Kumar'
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, firstName: e.target.value })
                }
                required
              />
            </label>

            <label className='input-lable'>
              <span className='label-text'>LastName</span>
              <input
                type='text'
                placeholder='mayankkumar'
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, lastName: e.target.value })
                }
              />
            </label>

            <label className='input-lable'>
              <span className='label-text'>UserName*</span>
              <input
                type='text'
                placeholder='mayank@gmail.com'
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, username: e.target.value })
                }
                required
              />
            </label>

            <label className='input-lable'>
              <span className='label-text'>PassWord*</span>
              <input
                type='password'
                placeholder='***'
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, password: e.target.value })
                }
                required
              />
            </label>

            <label className='input-lable'>
              <span className='label-text'>Confirm-PassWord*</span>
              <input type='password' value={confirmPassWord} placeholder='****' onChange={(e)=>setConfirmPassWord(e.target.value)} required />
              <span>{signUpInfo.password!==confirmPassWord&&<p style={{fontSize:"0.9rem",color:"red",margin:"0",padding:"0"}}>Password does not match</p>}</span>
            </label>

            <div className='signup-action'>
              <button type='submit' value='submit'
              disabled={confirmPassWord!=signUpInfo?.password}
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className='redirect'>
          Already have an account?
          <span className='signup-page' onClick={() => navigate('/login')}>
            SignIn
          </span>
        </p>
        </div>
      </div>
   
  );
};

export default SignUp;
