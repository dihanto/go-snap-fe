import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "./endpoint";

export default function PostPhoto ({ token })  {
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value);
        } else if(e.target.name === 'caption'){
            setCaption(e.target.value);
        } else if (e.target.name === 'photoUrl'){
            setPhotoUrl(e.target.value);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const photoData = {
            title,
            caption,
            photoUrl,
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(photoData),
        };

        const response = await fetch(host.photoEndpoint.postPhoto(), requestOptions);
        const responseJson = await response.json();
        if (responseJson.status === 201){
            navigate('/');
        } else {
            console.log('failed to post photo :', responseJson.message);
        };
    };

    return (
        <div className='bg-lime-300 w-[500px] h-52 ml-96 z-50'>
          <h2>Form Post Data</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title" 
                value={title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="caption">Caption:</label>
              <input
                type="text"
                name="caption" 
                value={caption}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="photoUrl">Photo URL:</label>
              <input
                type="text"
                name="photoUrl" 
                value={photoUrl}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit">Post Data</button>
            </div>
          </form>
        </div>
      );
}