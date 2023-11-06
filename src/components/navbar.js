/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import images from "./asset";
import Logout from "./logout";

export default function Navbar({ onToken, onProfilePicture }) {
    return (
        <div className="bg-slate-50   w-1/5 max-w-[250px] text-sm  fixed  h-screen  border-r-[1px]  border-slate-300">
            <p className="text-left ml-10 mt-5 text-2xl"> Gosnap </p>
            <div className="ml-5 py-4 mt-3 flex">
                <img src={images.home} alt="home" className="scale-90 mr-4" /> 
                <Link to="/">Home</Link>
            </div>
            <div className="ml-5 py-4 flex">
                <img src={images.search} alt="search" className="scale-90 mr-4" /> 
                <a href="#" className="my-auto">Search</a>
            </div>
            <div className="ml-5 py-4 flex">
                <img src={images.explore} alt="explore" className="scale-90 mr-4" /> 
                <a href="#" className="my-auto">Explore</a>
            </div>
            <div className="ml-5 py-4 flex">
                <img src={images.message} alt="message" className="scale-90 mr-4" /> 
                <a href="#" className="my-auto">Message</a>
            </div>
            <div className="ml-5 py-4 flex">
                <img src={images.notification} alt="notification"  className="scale-90 mr-4"/> 
                <a href="#" className="my-auto">Notification</a>
            </div>
            <div className="ml-5 py-4 flex">
                <img src={images.create} alt="create" className="scale-90 mr-4"/> 
                <Link to="/post">Create</Link>
            </div>
            <Logout onToken={onToken} onProfilePicture={onProfilePicture}/>
        </div>
    );
};