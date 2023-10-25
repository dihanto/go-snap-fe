import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  PostPhoto  from "./post";
import  Home from "./home";
import  Register from "./register";
import  Login  from "./login";
import GetCookie from './cookieUtils';
import {  useState } from 'react';
import Profile from './profile';
function App() {

  const [token, setToken] = useState(GetCookie('jwt'));
  const [userLogin ,setUserLogin] = useState('');

  const handleToken = () => {
    const newToken = GetCookie('jwt');
    if (newToken && newToken.trim() !== '') {
      setToken(newToken);
    }
  }

  const handleUserLogin = (username) => {
    setUserLogin(username);
  }
  console.log(userLogin)
  
  return (
    <div>
      <Router>
      <Routes>
          <Route path='/user' element={<Profile token={token} userLogin={userLogin}/>} />
          <Route path='/post' element={<PostPhoto token={token} />} />
          <Route path='/' element={<Home token={token} onUserLogin={handleUserLogin}/>} />
          <Route path='/register' element={<Register onToken={handleToken}/>} />
          <Route path='/login' element={<Login onToken={handleToken}/>} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;
