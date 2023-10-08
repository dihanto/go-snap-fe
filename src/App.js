import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostPhoto, Register, Login, Home } from './handler';
function App() {



  return (
    <div>
      <Router>
      <Routes>
          <Route path='/post' element={<PostPhoto />} />
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
