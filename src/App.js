import './App.css';
import {Routes,Route} from "react-router-dom";
import Login from "./Pages/Login/Login"
import SignUp from './Pages/SignUp/SignUp';
import Landing from './Pages/Landing/Landing';

function App() {
  return (
    <div className="App">

      

      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
