import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostData from './post';
import Home from './home';
import { Register } from './register';
import { Login } from './login';
function App() {
  return (
    <Router>
      <Routes>
          <Route path='/post' element={<PostData />} />
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
