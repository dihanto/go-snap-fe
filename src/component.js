import { useState } from "react";
import images from "./asset";

function Like({ token, photoId, onLikeNumber }) {
  const [liked, setLiked] = useState(false);
   
  const handleLike = async () => {

    const url = `http://localhost:8000/photos/${photoId}/like`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error("failed to send like");
      }

      const apiResponse = await response.json();
      onLikeNumber(Number(apiResponse.data.likes), photoId);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUnlike = async () => {

    const url = `http://localhost:8000/photos/${photoId}/unlike`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('failed to unlike');
      }

      const apiResponse = await response.json();
      onLikeNumber(Number(apiResponse.data.likes), photoId)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = () => {
    if (!liked) {
      handleLike();
    } else {
      handleUnlike();
    }

    setLiked(!liked);
    
  };

  const likeImage = liked ? images.liked : images.like;

  return (
    <div className="ml-[205px] mt-3">
      <img
        src={likeImage}
        alt={liked ? 'Unlike' : 'Like'}
        onClick={handleClick}
        className={`${
          liked ? 'scale-100' : 'scale-110'
        } transition-transform duration-300 cursor-pointer`}
      />
    </div>
  );
}

export default Like;
