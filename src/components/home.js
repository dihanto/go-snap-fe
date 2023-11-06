import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import  Navbar  from "./navbar";
import  Content  from "./content";
import  Suggest  from "./suggest";

export default function Home({ token, onUserLogin, onFollowToggle, followings, followToggle, onProfilePicture, profilePicture, onToken }){

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
        <div className="font-sans flex relative">
          <Navbar onToken={onToken} onProfilePicture={onProfilePicture}/>
          <div className="w-1/5 max-w-[250px]"></div>
          <Content token={token}  /> 
          <Suggest token={token} onUserLogin={onUserLogin} onFollowToggle={onFollowToggle} followings={followings} followToggle={followToggle} onProfilePicture={onProfilePicture} profilePicture={profilePicture}/>
        </div>
    )
}