import './App.css';
import {Routes,Route} from "react-router-dom";
import Login from "./Pages/Login/Login"
import SignUp from './Pages/SignUp/SignUp';
import Landing from './Pages/Landing/Landing';
import Home from './Pages/Home/Home';
import RequireAuth from './Component/RequireAuth/RequireAuth';

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
      </Routes>
      
    </div>
  );
}

export default App;
