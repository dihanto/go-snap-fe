import React, { useState } from 'react';

const PostData = () => {
  const [title, setTitle] = useState(''); 
  const [caption, setCaption] = useState(''); 
  const [photoUrl, setPhotoUrl] = useState(''); 

  const handleChange = (e) => {
     if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'caption') {
      setCaption(e.target.value);
    } else if (e.target.name === 'photoUrl') {
      setPhotoUrl(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = 'http://localhost:8000/photos';
    const postData = {
      title,
      caption,
      photoUrl,
    };

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTYyMTc5ODEsImlkIjoiMDIzYWVlMzYtNjZlNy00NjMwLTgzNWUtZTJmNjNlYzUwZjQ4IiwibGV2ZWwiOiJ1c2VyIiwidXNlcm5hbWUiOiJrdXJuaWF3YW4ifQ.WuuUWwkblrKgmoqZb2es7YP4MQ6nljCSO0bdMuYR1RQ';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Post photo success');
      })
      .catch(error => {
        console.error('POST photo failed:', error);
      });
  }

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
};

export default PostData;