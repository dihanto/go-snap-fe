import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import  Navbar  from "./navbar";
import  Content  from "./content";
import  Suggest  from "./suggest";

export default function Home({ token }){
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/'); 
        } else {
            navigate('/register');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div className="font-sans">
          <Navbar />
            <div className=" flex">
              <div className=' w-1/5'>  </div>
              <Content token={token}  /> 
              <Suggest token={token} />
            </div>
          </div>
    )
}