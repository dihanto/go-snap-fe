import './App.css';
import Content from './content';
import Navbar from './navbar';
import Suggest from './suggest';

function App() {
  return (
    <div className="App container">
      <div className="Header w-full mt-3 mx-2">
        <p className="text-left ml-1 text-2xl"> Gosnap </p>
      </div>
      <div className="w-full my-5 mx-2 lg:flex lg:flex-wrap">
          <Content />
          <Navbar />
          <Suggest />
      </div>
    </div>
  );
}

export default App;
