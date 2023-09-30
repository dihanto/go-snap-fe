import images from "./asset";
/* eslint-disable jsx-a11y/anchor-is-valid */
const Navbar = () => {
    return (
        <div className="bg-slate-50  lg:w-1/5 lg:text-sm lg:fixed lg:h-screen">
            <p className="text-left ml-10 mt-3 text-2xl"> Gosnap </p>
            <div className="ml-5 py-4 mt-3 flex">
                <img src={images.home} alt="home" className="scale-90 mr-4" /> 
                <a href="#" className="my-auto">Home</a>
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
                <a href="#" className="my-auto">Create</a>
            </div>
        </div>
    );
};

export default Navbar;