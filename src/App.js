import './App.css';
import Content from './content';

function App() {
  return (
    <div className="App container">
      <div className="Header w-full mt-3 mx-2">
        <p className="text-left ml-1 text-2xl"> Gosnap </p>
      </div>
      <div className="Content w-full my-5 mx-2">
          <Content />
      </div>
    </div>
  );
}

export default App;
