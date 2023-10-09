import { useEffect, useState } from "react";
import images from "./asset";

function Like({ token, photoId, onLikeNumber, isLiked }) {
  const [like, setLike] = useState(false);

  const [initialStatusFetched, setInitialStatusFetched] = useState(false);

  useEffect(() => {
    if (!initialStatusFetched) {
      isLiked(photoId)
        .then((initialLikeStatus) => {
          setLike(initialLikeStatus);
          setInitialStatusFetched(true);
        })
        .catch((error) => {
          console.error("Error fetching initial like status:", error);
        });
    }
  }, [photoId, initialStatusFetched, isLiked]);
   
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
    if (!like) {
      handleLike();
    } else {
      handleUnlike();
    }

    setLike(!like);
    
  };


  const likeImage = like ? images.liked : images.like;

  return (
    <div className="mt-3">
      <img
        src={likeImage}
        alt={like ? 'Unlike' : 'Like'}
        onClick={handleClick}
        className={`${
          like ? 'scale-100' : 'scale-110'
        } transition-transform duration-300 cursor-pointer`}
      />
    </div>
  );
}

export default Like;
