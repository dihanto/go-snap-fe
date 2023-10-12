import { useEffect, useState } from "react";
import  Like  from "./like"
import Comment from "./comment";

export default function Content ({ token }) {
    
    const [photos, setPhotos] = useState([]);
    const [ likeNumbers, setLikeNumbers ] = useState({});

    const getPhoto = async () => {
        const url = 'http://localhost:8000/photos';
        const requestOptions = {
            method: 'GET',
            headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, requestOptions);
        const responseJson = await response.json();
        if (responseJson.status === 200){
            if(!responseJson.data){
                return
            }
            
            const reversedPhotos = responseJson.data.reverse();
            setPhotos(reversedPhotos);

            const initialLikeNumbers = {};
            reversedPhotos.forEach(photo => {
                initialLikeNumbers[photo.id] = photo.like.likeCount;
            });
            setLikeNumbers(initialLikeNumbers);

        } else {
            console.log('failed to get Photo :', responseJson.message);
        };
    };

    // const handleComment = async () => {
    //     const url = `http://localhost:8000/comments`
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //         },
    //         body: 
    //     }
    // }

    const handleIsLiked = async (photoId) => {
        const url = `http://localhost:8000/photos/${photoId}/likes`;
        const requestOptions = {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        }
        const response = await fetch(url, requestOptions);
        const responseJson = await response.json();
        if (responseJson.status === 200){
            return responseJson.data;
        } else {
            console.log('failed to get like data : ', responseJson.message)
        }
      }

    useEffect(() => {
        if (!token){
            return ;
        }
        getPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token]);

    const handleLikeNumber = (photoId, likeNumber) => {
        setLikeNumbers(prevLikeNumber => ({
            ...prevLikeNumber,
            [photoId]: likeNumber,
        }));
    };


    return (
        <div className=' w-[1000px]'>
            {photos.map((photo) => (
                <div key={photo.id} className='bg-slate-50 pb-3 text-left text-sm'>
                    <div className="w-[500px] mx-auto">
                        <p className=' py-3 font-semibold'>{photo.user.username}</p>
                    </div>
                    <div className=' flex  items-center  justify-center'>
                        <img src={photo.photoUrl} alt={photo.title} className='rounded-sm'/>
                    </div> 
                    <div className="w-[500px] mx-auto">
                        <div className="flex">
                            <Like
                                token={token}
                                photoId={photo.id}
                                onLikeNumber={(likeNumber) => {
                                    handleLikeNumber(photo.id, likeNumber);
                                }}
                                isLiked={handleIsLiked}
                            />
                            <Comment />
                        </div>
                        <div>
                            <p className="mt-3 text-xs font-semibold"> {likeNumbers[photo.id]} likes</p>
                        </div>
                        <p className='mt-3 text-xs pb-3'><span className="font-semibold">{photo.user.username} </span>{photo.caption}</p>
                    </div>
                    <div className='border-b border-slate-300 w-[500px] mx-auto'> </div>
                </div>
            ))}
        </div>
    );
};