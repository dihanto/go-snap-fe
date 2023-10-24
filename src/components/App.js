import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  PostPhoto  from "./post";
import  Home from "./home";
import  Register from "./register";
import  Login  from "./login";
import GetCookie from './cookieUtils';
import {  useState } from 'react';
function App() {

  const [token, setToken] = useState(GetCookie('jwt'));

  const handleToken = () => {
    const newToken = GetCookie('jwt');
    if (newToken && newToken.trim() !== '') {
      setToken(newToken);
    }
  }
  
  return (
    <div>
      <Router>
      <Routes>
          <Route path='/post' element={<PostPhoto token={token} />} />
          <Route path='/' element={<Home token={token} />} />
          <Route path='/register' element={<Register onToken={handleToken}/>} />
          <Route path='/login' element={<Login onToken={handleToken}/>} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;
