import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  PostPhoto  from "./components/post";
import  Home from "./components/home";
import  Register from "./components/register";
import  Login  from "./components/login";
import { useState } from 'react';
function App() {

  const [jwtToken, setJwtToken] = useState('');

  const handleJwtToken = (token) => {
      setJwtToken(token)
  }

  return (
    <div>
      <Router>
      <Routes>
          <Route path='/post' element={<PostPhoto token={jwtToken}/>} />
          <Route path='/' element={<Home token={jwtToken}/>} />
          <Route path='/register' element={<Register onJwtToken={handleJwtToken}/>} />
          <Route path='/login' element={<Login onJwtToken={handleJwtToken}/>} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;
