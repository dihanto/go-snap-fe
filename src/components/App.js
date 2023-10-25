import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  PostPhoto  from "./post";
import  Home from "./home";
import  Register from "./register";
import  Login  from "./login";
import GetCookie from './cookieUtils';
import {  useEffect, useState } from 'react';
import Profile from './profile';
import { host } from './endpoint';
function App() {

  const [token, setToken] = useState(GetCookie('jwt'));
  const [userLogin ,setUserLogin] = useState('');
  const [followings, setFollowings] = useState([]);
  const [followToggle, setFollowToggle] = useState(true);


  const getFollowing = async () => {
    const requestOptions = {
         method: 'GET',
         headers: {
              'Authorization' : `Bearer ${token}`,
              'Content-Type': 'application/json',
         },
    };
    const response = await fetch(host.followEndpoint.getFollowing(), requestOptions);
    const responseJson = await response.json();
    setFollowings(responseJson.data);
};

  const handleFollowToggle = () => {
    setFollowToggle(!followToggle);
  }

  useEffect(() => {
      getFollowing();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [followToggle]);

  const handleToken = () => {
    const newToken = GetCookie('jwt');
    if (newToken && newToken.trim() !== '') {
      setToken(newToken);
    }
  }

  const handleUserLogin = (username) => {
    setUserLogin(username);
  }
  
  return (
    <div>
      <Router>
      <Routes>
          <Route path='/user' element={<Profile token={token} userLogin={userLogin} followings={followings}/>} />
          <Route path='/post' element={<PostPhoto token={token} followings={followings}/>} />
          <Route path='/' element={<Home token={token} onUserLogin={handleUserLogin} onFollowToggle={handleFollowToggle} followings={followings} followToggle={followToggle}/>} />
          <Route path='/register' element={<Register onToken={handleToken}/>} />
          <Route path='/login' element={<Login onToken={handleToken}/>} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;
