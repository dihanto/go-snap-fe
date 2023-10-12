import { useEffect, useState } from "react";
import images from "./asset"

export default function Like({ token, photoId, onLikeNumber, isLiked }) {
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
    };
  }, [photoId, initialStatusFetched, isLiked]);
   
  const handleLike = async () => {

    const url = `http://localhost:8000/photos/${photoId}/likes`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    
      const response = await fetch(url, requestOptions);
      const responseJson = await response.json();
      if (responseJson.status === 200){
        onLikeNumber(Number(responseJson.data.likeCount), photoId);
      } else {
        console.log('failed to send like : ', responseJson.message);
      };
  };

  const handleUnlike = async () => {

    const url = `http://localhost:8000/photos/${photoId}/unlikes`;
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    
      const response = await fetch(url, requestOptions);
      const responseJson = await response.json();
      if (responseJson.status === 200){
        onLikeNumber(Number(responseJson.data.likeCount), photoId)
      } else {
        console.log('failed to unlike :', responseJson.message);
      };
  };

  const handleClick = () => {
    if (!like) {
      handleLike();
    } else {
      handleUnlike();
    };

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
          like ? 'scale-90' : 'scale-[.85]'
        } transition-transform duration-300 cursor-pointer ${
          like ? 'hover:opacity-100' : 'hover:opacity-70'
        }`}
      />
    </div>
  );
};
