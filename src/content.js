import { useEffect, useState } from 'react';

const Content = () => {
    const url = 'http://localhost:8000/photos';
    const [photos, setPhotos] = useState([]);

    const getDataPhoto = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTYyMTc5ODEsImlkIjoiMDIzYWVlMzYtNjZlNy00NjMwLTgzNWUtZTJmNjNlYzUwZjQ4IiwibGV2ZWwiOiJ1c2VyIiwidXNlcm5hbWUiOiJrdXJuaWF3YW4ifQ.WuuUWwkblrKgmoqZb2es7YP4MQ6nljCSO0bdMuYR1RQ';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                },
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const dataPhoto = await response.json();
            setPhotos(dataPhoto.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getDataPhoto();
    }, [url]);

    return (
        <div className='lg:w-3/5'>
            {photos.map((photo) => (
                <div key={photo.id} className='bg-slate-100 pb-3 text-left text-sm'>
                    <p className='lg:py-3 lg:ml-[230px]  font-semibold'>{photo.user.username}</p>
                    <div className='lg:flex lg:items-center lg:justify-center'>
                        <img src={photo.photoUrl} alt={photo.title} className='rounded-sm'/>
                    </div>
                    <p className='mt-3 text-xs pl-4 pb-3 lg:ml-[190px]'>{photo.caption}</p>
                    <div className='border border-solid bg-slate-500'> </div>
                </div>
            ))}
        </div>
    );
};

export default Content;
