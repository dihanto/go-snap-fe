import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostData from './post';
import Home from './home';
import Navbar from './navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
          <Route path='/post' element={<PostData />} />
          <Route path='/' element={<Home />} />
        </Routes>
    </Router>
  );
}

export default App;
