import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import ConnectLogo from '../../asset/ConnectLogo1.png';
import './Login.css';

const Login = () => {
  const { loginHandler } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const guestUser = { username: 'Spidy', password: 'Spidy123' };

  const submitHandler = (e) => {
    e.preventDefault();
    loginHandler(loginInfo.username, loginInfo.password);
    setLoginInfo({ username: '', password: '' });
    navigate('/');
  };
  console.log(loginInfo);
  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='logo'>
          <span className='logo-item'>
            <img height={'50px'} width={'50px'} src={ConnectLogo} />
            <span className='logo-text'>Connecting People</span>
          </span>
        </div>
        <h1 style={{ textAlign: 'center', color: 'blue' }}>Login</h1>

        <div>
          <form onSubmit={(e) => submitHandler(e)}>
            <label className='input-lable'>
              <span className='label-text'>UserName*</span>
              <input
                type='text'
                value={loginInfo?.username}
                placeholder='Enter UserName'
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, username: e.target.value })
                }
                required
              />
            </label>
            <label className='input-lable'>
              <span className='label-text'>PassWord*</span>
              <input
                type='password'
                value={loginInfo?.password}
                placeholder='Enter PassWord'
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, password: e.target.value })
                }
                required
              />
            </label>
            <div className='login-action'>
              <button type='submit' value='Submit'>
                Login In
              </button>
              <button onClick={() => setLoginInfo(guestUser)}>
                Guest Mode
              </button>
            </div>
          </form>
        </div>
        <p className='redirect'>
          Don't have an account?
          <span className='signup-page' onClick={() => navigate('/signUp')}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
