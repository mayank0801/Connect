import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';

import Home from './Pages/Home/Home';
import RequireAuth from './Component/RequireAuth/RequireAuth';
import { Explore } from './Pages/Explore/Explore';
import { BookMark } from './Pages/BookMark/BookMark';

import Mockman from 'mockman-js';
import { PostDetail } from './Pages/PostDetail/PostDetail';
import { Profile } from './Pages/Profile/Profile';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route
          path='/'
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path='/explore'
          element={
            <RequireAuth>
              <Explore />
            </RequireAuth>
          }
        />
        <Route
          path='/bookmark'
          element={
            <RequireAuth>
              <BookMark />
            </RequireAuth>
          }
        />

        <Route path='/post/:postId' element={
        <RequireAuth>
          <PostDetail />
        </RequireAuth>
        } />
        <Route path='/profile/:profileId' element={
          <RequireAuth>
        <Profile />
        </RequireAuth>
        } />
        <Route path='/mockman' element={<Mockman />} />
      </Routes>
      <Toaster
        position='bottom-left'
        reverseOrder={false}
        containerStyle={{
          bottom: '4rem',
          right: '1rem',
          fontSize: '0.9rem',
        }}
      />
    </div>
  );
}

export default App;
