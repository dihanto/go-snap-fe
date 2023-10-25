import { useEffect, useState } from "react";
import { host } from "./endpoint";

export default function Profile({ token, userLogin }) {
  const [userPhoto, setUserPhoto] = useState([]);

  const fetchData = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(host.photoEndpoint.getPhoto(), requestOptions);
      const responseJson = await response.json();
      const filteredPhotos = responseJson.data.filter(
        (photo) => photo.user.username === userLogin
      );
      setUserPhoto(filteredPhotos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogin]);

  return (
    <div className="bg-white p-4">
      <div className="flex items-center space-x-4">
        <img
          src="your-profile-picture-url.jpg"
          alt="Your Profile"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-semibold">Your Name</h1>
          <p className="text-gray-600">Your Bio</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {userPhoto.map((photo) => (
          <div key={photo.id} className="relative aspect-w-1 aspect-h-1">
            <img
              src={photo.photoBase64}
              alt={photo.title}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
