import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  PostPhoto  from "./post";
import  Home from "./home";
import  Register from "./register";
import  Login  from "./login";
import GetCookie from './cookieUtils';
import {  useEffect, useState } from 'react';
import Profile, { UpdateProfile } from './profile';
import { host } from './endpoint';
function App() {

  const [token, setToken] = useState(GetCookie('jwt'));
  const [userLogin ,setUserLogin] = useState('');
  const [followings, setFollowings] = useState([]);
  const [followingCount, setFollowingCount] = useState(0);
  const [followToggle, setFollowToggle] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null)


  const getFollowing = async () => {
    if (token === undefined){
      return;
    }
    const requestOptions = {
         method: 'GET',
         headers: {
              'Authorization' : `Bearer ${token}`,
              'Content-Type': 'application/json',
         },
    };
    const response = await fetch(host.followEndpoint.getFollowing(), requestOptions);
    const responseJson = await response.json();
    if (responseJson.data === null){
      return
    }
    setFollowings(responseJson.data.username);
    setFollowingCount(responseJson.data.followingCount);
};

  const handleFollowToggle = () => {
    setFollowToggle(!followToggle);
  }

  useEffect(() => {
      getFollowing();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, followToggle]);

  const handleToken = () => {
    const newToken = GetCookie('jwt');
    if (newToken && newToken.trim() !== '') {
      setToken(newToken);
    }
  }

  const handleUserLogin = (username) => {
    setUserLogin(username);
  }
  
  const  handleProfilePicture = (profilePicture) => {
    setProfilePicture(profilePicture);
  }
  
  return (
    <div>
      <Router>
      <Routes>
          <Route path='/user' element={<Profile token={token} userLogin={userLogin} followingCount={followingCount} profilePicture={profilePicture}/>} />
          <Route path='/user/update' element={<UpdateProfile token={token} userLogin={userLogin}  profilePicture={profilePicture}/>} />
          <Route path='/post' element={<PostPhoto token={token} />} />
          <Route path='/' element={<Home token={token} onUserLogin={handleUserLogin} onFollowToggle={handleFollowToggle} followings={followings} followToggle={followToggle} onProfilePicture={handleProfilePicture} profilePicture={profilePicture}/>} />
          <Route path='/register' element={<Register onToken={handleToken}/>} />
          <Route path='/login' element={<Login onToken={handleToken}/>} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;
