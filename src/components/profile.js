import { useEffect, useState } from "react";
import { host } from "./endpoint";
import Navbar from "./navbar";
import FetchApi from "./utils";
import { Link, useNavigate } from "react-router-dom";
import images from "./asset";

export default function Profile({ token, userLogin, followingCount, profilePicture, onToken }) {
  const [userPhoto, setUserPhoto] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
        navigate('/register');
    } 
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [token]);

  const requestOptions = {
      method: "GET",
      headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      },
  };

  const getPhoto = async () => {
      const response = await fetch(host.photoEndpoint.getPhoto(), requestOptions);
      const responseJson = await response.json();
      if (responseJson.status === 200){
        const filteredPhotos = responseJson.data.filter(
        (photo) => photo.user.username === userLogin
      );
      setUserPhoto(filteredPhotos);
      } else{
        console.error(responseJson.data);
      }
  };

  const getFollower = async () => {
    const response = await fetch(host.followEndpoint.getFollower(), requestOptions);
    const responseJson = await response.json();
        if(responseJson.status === 200){
            setFollowerCount(responseJson.data.followerCount)
        } else {
            console.error(responseJson.data)
        }
  }

  useEffect(() => {
    getPhoto();
    getFollower();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogin]);

  return (
    <div>
      <Navbar onToken={onToken}/>
      <div className="bg-slate-50 p-4 h-screen flex">
        <div className="w-1/5"></div>
        <div className="w-4/5 px-20"> 
          <div className="flex mt-5 ml-16 text-sm">
            <div className="mr-5 w-[150px] h-[150px] ring-2 ring-slate-600 rounded-full flex justify-center items-center">
              <div className="ring-1 ring-slate-400 rounded-full">
                <img
                  src={profilePicture || images.profilePicture}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover"
                />
              </div>
            </div>
            <div>
                  <div className="flex">
                    <p className=" font-semibold text-base pr-2">{userLogin}</p>
                    <Link to='/user/update' className="bg-slate-200 hover:bg-slate-300 rounded-lg py-1 px-2">Edit Profile</Link>
                  </div>
                  <div>
                    <p className="text-gray-600">Bio</p>
                  </div>
                  <div className="flex mt-3">
                      <p className="mr-7"><span className="font-semibold">{userPhoto.length}</span> posts</p>
                      <p className="mr-7"><span className="font-semibold">{followerCount}</span> followers</p>
                      <p className="mr-7"><span className="font-semibold">{followingCount}</span> following</p>
                  </div>
            </div>
          </div>
          <div className="border border-slate-300 mt-10">

          </div>
          <div className="grid grid-cols-3 gap-1 mt-1">
              {userPhoto.map((photo) => (
              <div key={photo.id} className="relative aspect-square">
                  <img
                  src={photo.photoBase64}
                  alt={photo.title}
                  className="object-cover w-full h-full rounded-sm"
                  />
              </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UpdateProfile ({ token, userLogin, profilePicture, onToken }){
  const [updateProfilePicture, setUpdateProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
        navigate('/register');
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleChange = (e) => {
    if(e.target.name === 'profilePicture'){
        if(e.target.files.length > 0){
        const reader = new FileReader();
        reader.onload = (e) => {
          setUpdateProfilePicture(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({profilePicture : updateProfilePicture}),
    };

    const response = await FetchApi(host.UserEndpoint.updateUser(), requestOptions)
    if (response.status === 200){
      setUpdateProfilePicture(response.data.profilePicture);
    } else{
      console.error('failed to update user:', response.message)
    };
  };

  return (
    <div className="bg-slate-50 flex text-sm">
      <Navbar onToken={onToken}/>
      <div className="w-1/5"></div>
      <div className="w-4/5 ml-28">
        <h1 className="text-lg mt-7 ml-4 mb-3">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <img src={ updateProfilePicture ||profilePicture || images.profilePicture} alt="profile" className="w-9 h-9 my-auto rounded-full mr-4"></img>
            <div>
              <p>{userLogin}</p>
              <label htmlFor="profilePicture" className="my-2 cursor-pointer text-blue-600 font-semibold">Change profile picture</label>
              <input type="file" name="profilePicture" id="profilePicture" onChange={handleChange} className="hidden"/>
            </div>
          </div>
          <br/>
          <button type="submit" className="bg-slate-900 hover:bg-slate-500 rounded-lg text-white px-2 py-1 mt-2">Submit</button>
        </form>
      </div>
    </div>
  )
}

export {UpdateProfile};