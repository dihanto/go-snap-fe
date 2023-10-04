import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostPhoto, Register, Login, Home } from './handler';
function App() {
  return (
    <Router>
      <Routes>
          <Route path='/post' element={<PostPhoto />} />
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
