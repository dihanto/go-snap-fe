import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostData from './post';
import Home from './home';
import Register from './register';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/post' element={<PostData />} />
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
        </Routes>
    </Router>
  );
}

export default App;
