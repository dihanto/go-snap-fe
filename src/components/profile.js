import { useEffect, useState } from "react";
import { host } from "./endpoint";
import Navbar from "./navbar";

export default function Profile({ token, userLogin, followings }) {
  const [userPhoto, setUserPhoto] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

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
    if(!followings){
      setFollowingCount(0)
    } else{
    setFollowingCount(followings.length)
    }
    getPhoto();
    getFollower();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogin]);

  return (
    <div>
      <Navbar />
      <div className="bg-white p-4 flex">
        
        <div className="w-1/5"></div>
        <div className="w-4/5 px-20"> 
          <div className="flex justify-center mt-5 text-xs">
              <div className="w-44 h-44 bg-yellow-100">
                  {/* <img
                  src="your-profile-picture-url.jpg"
                  alt="Your Profile"
                  className="w-16 h-16 rounded-full"
                  /> */}
              </div>
              <div>
                  <div>
                  <h1 className=" font-semibold">{userLogin}</h1>
                  <p className="text-gray-600">Bio</p>
                  </div>
                  <div className="flex mt-3">
                      <p className="mr-7"><span className="font-semibold">{userPhoto.length}</span> posts</p>
                      <p className="mr-7"><span className="font-semibold">{followerCount}</span> followers</p>
                      <p className="mr-7"><span className="font-semibold">{followingCount}</span> following</p>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-3 gap-1 mt-4">
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
