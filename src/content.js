import { useEffect, useState } from 'react';

const Content = () => {
    const url = 'http://localhost:8000/photos';
    const [photos, setPhotos] = useState([]);

    const getDataPhoto = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTU3MTAxMTEsImlkIjoiMDIzYWVlMzYtNjZlNy00NjMwLTgzNWUtZTJmNjNlYzUwZjQ4IiwibGV2ZWwiOiJ1c2VyIiwidXNlcm5hbWUiOiJrdXJuaWF3YW4ifQ.ksmIzicu3Pg4Hi8X9l4IjjJJlLUSihrf6A6q8QLiORs';
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
        <div>
            {photos.map((photo) => (
                <div key={photo.id} className='bg-slate-200 pb-3'>
                    <p className='py-2 pl-2'>{photo.user.username}</p>
                    <img src={photo.photoUrl} alt={photo.title}></img>
                    <p className='mt-3 text-sm pl-4 pb-3'>{photo.caption}</p>
                    <hr className='h-px bg-slate-700'/>    
                </div>
            ))}
        </div>
    );
};

export default Content;
