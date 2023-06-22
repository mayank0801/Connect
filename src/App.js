import './App.css';
import {Routes,Route} from "react-router-dom";
import Login from "./Pages/Login/Login"
import SignUp from './Pages/SignUp/SignUp';
import Landing from './Pages/Landing/Landing';
import Home from './Pages/Home/Home';
import RequireAuth from './Component/RequireAuth/RequireAuth';
import { Explore } from './Pages/Explore/Explore';
import { BookMark } from './Pages/BookMark/BookMark';


import Mockman from "mockman-js";
import { PostDetail } from './Pages/PostDetail/PostDetail';

function App() {
  
  return (
    <div className="App">

      

      <Routes>
        <Route path="/landing" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path='/' element={
          <RequireAuth>
            <Home/>
          </RequireAuth>}/>
      
      <Route path='/explore' element={<Explore/>}
          />
          <Route path='/bookmark' element={
          <RequireAuth>
            <BookMark/>
          </RequireAuth>}/>

<Route path="/post/:postId" element={<PostDetail/>}/>
          <Route path="/mockman" element={<Mockman/>}/>
      
          </Routes>
      
    </div>
  );
}

export default App;
