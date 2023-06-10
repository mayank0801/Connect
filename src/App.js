import './App.css';
import {Routes,Route} from "react-router-dom";
import Login from "./Pages/Login/Login"
import SignUp from './Pages/SignUp/SignUp';
import Landing from './Pages/Landing/Landing';
import Home from './Pages/Home/Home';

function App() {
  return (
    <div className="App">

      

      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
