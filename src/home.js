import Content from './content';
import Suggest from './suggest';

function Home(){
    return (
        <div className="container font-sans">
            <div className="lg:flex">
              <div className='lg:w-1/5'>  </div>
              <Content /> 
              <Suggest />
            </div>
          </div>
    )
}

export default Home;