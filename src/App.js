import './App.css';
import Content from './content';
import Navbar from './navbar';
import Suggest from './suggest';

function App() {
  return (
    <div className="App container font-sans">
      <Navbar />
      <div className="lg:flex">
        <div className='lg:w-1/5'>  </div>
          <Content />
          <Suggest />
      </div>
    </div>
  );
}

export default App;
