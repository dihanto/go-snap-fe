import { useEffect, useState, useCallback, useMemo } from "react";
import Like from "./like";
import { HandleCommentIcon, HandleGetComment, HandleWriteComment } from "./comment";
import { host } from "./endpoint";
import SkeletonLoader from "./skeleton";

export default function Content({ token }) {
  const [photos, setPhotos] = useState([]);
  const [likeNumbers, setLikeNumbers] = useState({});
  const [commentToggle, setCommentToggle] = useState(false);
  const [photosToDisplay, setPhotosToDisplay] = useState(2);
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

  const getRandomPhotos = (data, numItems) => {
    const shuffledArray = data.slice().sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, numItems);
  };

  const fetchPhotos = async (numItems) => {
    setIsLoading(true);
    try {
      const response = await fetch(host.photoEndpoint.getPhoto(), requestOptions);
      const responseJson = await response.json();

      if (responseJson.status === 200 && responseJson.data) {
        const randomPhotos = getRandomPhotos(responseJson.data, numItems);
        setPhotos(randomPhotos);

        const initialLikeNumbers = {};
        randomPhotos.forEach(photo => {
          initialLikeNumbers[photo.id] = photo.like.likeCount;
        });
        setLikeNumbers(initialLikeNumbers);
      } else {
        console.log('Failed to get Photos:', responseJson.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading photos:', error);
      setIsLoading(false);
    }
  };

  const loadMorePhotos = useCallback(async () => {
    if (loadingMore) return;

    setLoadingMore(true);

    try {
      const response = await fetch(host.photoEndpoint.getPhoto(), requestOptions);
      const responseJson = await response.json();

      if (responseJson.status === 200 && responseJson.data) {
        const newRandomPhotos = getRandomPhotos(responseJson.data, 2);
        const filteredNewPhotos = newRandomPhotos.filter(
          photo => !photos.find(existingPhoto => existingPhoto.id === photo.id)
        );
        const initialLikeNumbers = {}
        filteredNewPhotos.forEach(photo => {
          initialLikeNumbers[photo.id] = photo.like.likeCount;
        });
        setLikeNumbers(prevLikeNumbers => ({
          ...prevLikeNumbers,
          ...initialLikeNumbers,
        }));
        setPhotos(prevPhotos => [...prevPhotos, ...filteredNewPhotos]);
        setPhotosToDisplay(prev => prev + filteredNewPhotos.length);

        setLoadingMore(false);
      } else {
        console.log('Failed to get more photos:', responseJson.message);
      }
    } catch (error) {
      console.error('Error loading more photos:', error);
      setLoadingMore(false);
    }
  }, [loadingMore, photos, requestOptions]);

  const handleScroll = useCallback(() => {
    if(!token){
      return
    }
    const { innerHeight, scrollY } = window;
    const { offsetHeight } = document.body;

    if (innerHeight + scrollY >= offsetHeight - 200) {
      loadMorePhotos();
    }
  }, [loadMorePhotos, token]);

  useEffect(() => {
    if (!token) return;
    fetchPhotos(2);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleIsLiked = async (photoId) => {
    const response = await fetch(host.photoEndpoint.likePhoto(photoId), requestOptions);
    const responseJson = await response.json();
    if (responseJson.status === 200) {
      return responseJson.data;
    } else {
      console.log('Failed to get like data:', responseJson.message);
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
    <div className='w-[1000px]'>
    {isLoading ? (
      <SkeletonLoader />
    ) : (
      photos.slice(0, photosToDisplay).map((photo) => (
          <div key={photo.id} className='bg-slate-50 pb-3 text-left text-sm'>
            <div className='w-[500px] mx-auto'>
              <p className='py-3 font-semibold'>{photo.user.username}</p>
            </div>
            <div className='flex items-center justify-center w-[500px] h-[500px] bg-black mx-auto'>
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
                <p className='mt-3 text-xs font-semibold'>{likeNumbers[photo.id]} likes</p>
              </div>
              <p className='mt-3 text-xs pb-1 font-normal'>
                <span className='font-semibold'>{photo.user.username}</span> {photo.caption}
              </p>
              <HandleGetComment token={token} photoId={photo.id} commentToggle={commentToggle} />
              <HandleWriteComment token={token} photoId={photo.id} onCommentToggle={handleCommentToggle} />
            </div>
            <div className='border-b border-slate-300 w-[500px] mx-auto'></div>
          </div>
         )))}
       </div>
  );
}
