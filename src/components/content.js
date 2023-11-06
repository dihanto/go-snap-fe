/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Like from "./like";
import { HandleCommentIcon, HandleGetComment, HandleWriteComment } from "./comment";
import { host } from "./endpoint";
import SkeletonLoader from "./skeleton";
import images from "./asset";

const DEBOUNCE_DELAY = 130;

export default function Content({ token }) {
  const [photos, setPhotos] = useState([]);
  const [availablePhoto, setAvailablePhoto] = useState([]);
  const [likeNumbers, setLikeNumbers] = useState({});
  const [commentToggle, setCommentToggle] = useState(false);
  const [photosToDisplay, setPhotosToDisplay] = useState(4);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const requestOptions = useMemo(() => {
    return {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  }, [token]);

  const getRandomPhotos = (data) => {
    const shuffledArray = data.slice().sort(() => Math.random() - 0.5);
    return shuffledArray;
  };

  const fetchPhotos = async () => {
    setIsLoading(true);
  
    const response = await fetch(host.photoEndpoint.getPhoto(), requestOptions);
    const responseJson = await response.json();
  
    if (responseJson.status === 200 && responseJson.data) {
      const randomPhotos = getRandomPhotos(responseJson.data);
  
      const newPhotos = randomPhotos.slice(0, 3);
      const remainingPhotos = randomPhotos.slice(3);
  
      const initialLikeNumbers = newPhotos.reduce((likeNumbers, photo) => {
        likeNumbers[photo.id] = photo.like.likeCount;
        return likeNumbers;
      }, {});
  
      setPhotos(newPhotos);
      setAvailablePhoto(remainingPhotos);
      setLikeNumbers(initialLikeNumbers);
    } else {
      console.log('Failed to get Photos:', responseJson.message);
    }
    setIsLoading(false);
  };
  

  const loadMorePhotos = useCallback(async () => {
    if (loadingMore || availablePhoto.length === 0) return;
  
    setLoadingMore(true);
  
    const newPhotos = availablePhoto.slice(0, 3);
  
    const initialLikeNumbers = newPhotos.reduce((likeNumbers, photo) => {
      likeNumbers[photo.id] = photo.like.likeCount;
      return likeNumbers;
    }, {});
  
    setLikeNumbers(prevLikeNumbers => ({ ...prevLikeNumbers, ...initialLikeNumbers }));
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
  
    setAvailablePhoto(prevAvailablePhoto => prevAvailablePhoto.slice(3));
    setPhotosToDisplay(prev => prev + newPhotos.length);
  
    setLoadingMore(false);
  }, [loadingMore, availablePhoto]);
  
  const handleScroll = useCallback(() => {
    if (!token) {
      return;
    }
    const { innerHeight, scrollY } = window;
    const { offsetHeight } = document.body;

    if (innerHeight + scrollY >= offsetHeight - 800) {
      loadMorePhotos();
    }
  }, [loadMorePhotos, token]);

  useEffect(() => {
    if (!token) return;
    fetchPhotos();
  }, [token]);

  useEffect(() => {
    let timeoutId;

    const handleScrollDebounced = () => {
      if (timeoutId){
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null
      }, DEBOUNCE_DELAY);
    };
    window.addEventListener('scroll', handleScrollDebounced);
    return () => {
      window.removeEventListener('scroll', handleScrollDebounced);
    };
  }, [handleScroll]);

  const handleIsLiked = async (photoId) => {
    try {
      const response = await fetch(host.photoEndpoint.likePhoto(photoId), requestOptions);
      const responseJson = await response.json();
      if (responseJson.status === 200) {
        return responseJson.data;
      } else {
        console.log('Failed to get like data:', responseJson.message);
      }
    } catch (error) {
      console.error('Error liking photo:', error);
    }
  };

  const handleLikeNumber = (photoId, likeNumber) => {
    setLikeNumbers(prevLikeNumbers => ({
      ...prevLikeNumbers,
      [photoId]: likeNumber,
    }));
  };

  const handleCommentToggle = () => {
    setCommentToggle(!commentToggle);
  };

  return (
    <div className='w-4/6 flex-1 mx-auto pt-5'>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        photos.slice(0, photosToDisplay).map((photo) => (
          <div key={photo.id} className='bg-slate-50 pb-3 text-left text-sm'>
            <div className='w-[500px] h-[37px] mx-auto items-center flex'>
              <img
                src={photo.user.profilePicture !== 'empty' ? photo.user.profilePicture : images.profilePicture}
                alt="profile"
                className="w-8 h-8 object-cover rounded-full mr-2"
              />
              <p className='font-semibold'>{photo.user.username}</p>
            </div>
            <div className='flex items-center justify-center w-[500px] h-[500px] bg-black mx-auto mt-1'>
              <img src={photo.photoBase64} alt={photo.title} className='rounded-sm max-w-full max-h-full' />
            </div>
            <div className='w-[500px] mx-auto'>
              <div className='flex'>
                <Like
                  token={token}
                  photoId={photo.id}
                  onLikeNumber={likeNumber => {
                    handleLikeNumber(photo.id, likeNumber);
                  }}
                  isLiked={handleIsLiked}
                />
                <HandleCommentIcon />
              </div>
              <div>
                <p className='mt-1 text-sm2 leading-sm2 font-semibold'>{likeNumbers[photo.id]} likes</p>
              </div>
              <p className='mt-2 text-sm2 leading-sm2 mb-1 font-normal'>
                <span className='font-semibold'>{photo.user.username}</span> {photo.caption}
              </p>
              <HandleGetComment token={token} photoId={photo.id} commentToggle={commentToggle} />
              <HandleWriteComment token={token} photoId={photo.id} onCommentToggle={handleCommentToggle} />
            </div>
            <div className='border-b border-slate-300 w-[500px] mx-auto'></div>
          </div>
        ))
      )}
    </div>
  );
}
