import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import images from "./asset";
/* eslint-disable jsx-a11y/anchor-is-valid */

let JWTToken

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();
    // let isSuccess;

    const handleChange = (e) => {
        if (e.target.name === 'username'){
            setUsername(e.target.value);
        } else if (e.target.name === 'email'){
            setEmail(e.target.value);
        } else if (e.target.name === 'password'){
            setPassword(e.target.value);
        } else if (e.target.name === 'age'){
            setAge(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = 'http://localhost:8000/users/register';
        const registerData = {
            username, email, password, age: parseInt(age, 10),
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        };

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Register success', data);
            // isSuccess = data.success;
            navigate('/');
        })
        .catch(error => {
            console.log('Register failed', error);
        });
    }

    return (
        <div className="bg-sky-300 w-2/4 mx-auto">
            <h1>Form Registration</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" value={username} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" value={email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="text" name="password" value={password} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input type="text" name="age" value={age} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>

        </div>
    );
};

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const url = 'http://localhost:8000/users/login';
        const loginData = {
            username,
            password,
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        };

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Login success', data);
            JWTToken = data.data;
            navigate("/");
        })
        .catch(error => {
            console.log('Login failed', error);
        });
    }

    return (
        <div className="bg-yellow-300 w-2/4 mx-auto">
            <h1>Form Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" value={username} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={password} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

function Home(){
    return (
        <div className="container font-sans">
          <Navbar />
            <div className="lg:flex">
              <div className='lg:w-1/5'>  </div>
              <Content /> 
              <Suggest />
            </div>
          </div>
    )
}

const Content = () => {
    const url = 'http://localhost:8000/photos';
    const [photos, setPhotos] = useState([]);

    const getPhoto = async () => {
        const token = JWTToken;
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
            };

            const apiResponse = await response.json();
            setPhotos(apiResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        };
    };

    useEffect(() => {
        getPhoto();
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
}

const PostPhoto = () => {
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    const handleChange = (e) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value);
        } else if(e.target.name === 'caption'){
            setCaption(e.target.value);
        } else if (e.target.name === 'photoUrl'){
            setPhotoUrl(e.target.value);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = 'http://localhost:8000/photos';
        const postPhoto = {
            title,
            caption,
            photoUrl,
        };

        const token = JWTToken;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postPhoto),
        };

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Post photo success');
        })
        .catch(error => {
            console.error('Post photo failed:', error);
        });
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


const Navbar = () => {
    return (
        <div className="bg-slate-50  lg:w-1/5 lg:text-sm lg:fixed lg:h-screen">
            <p className="text-left ml-10 mt-3 text-2xl"> Gosnap </p>
            <div className="ml-5 py-4 mt-3 flex">
                <img src={images.home} alt="home" className="scale-90 mr-4" /> 
                <Link to="/">Home</Link>
            </div>
            <div className="ml-5 py-4 flex">
                <img src={images.search} alt="search" className="scale-90 mr-4" /> 
                <a href="#" className="my-auto">Search</a>
            </div>
            <div className="ml-5 py-4 flex">
                <img src={images.explore} alt="explore" className="scale-90 mr-4" /> 
                <a href="#" className="my-auto">Explore</a>
            </div>
            <div className="ml-5 py-4 flex">
                <img src={images.message} alt="message" className="scale-90 mr-4" /> 
                <a href="#" className="my-auto">Message</a>
            </div>
            <div className="ml-5 py-4 flex">
                <img src={images.notification} alt="notification"  className="scale-90 mr-4"/> 
                <a href="#" className="my-auto">Notification</a>
            </div>
            <div className="ml-5 py-4 flex">
                <img src={images.create} alt="create" className="scale-90 mr-4"/> 
                <Link to="/post">Create</Link>
            </div>
        </div>
    );
};

const Suggest = () => {
    return (
        <div className="bg-slate-50 lg:w-1/5  lg:text-sm">
            <p className="mt-10 ml-16 mb-0">username23</p>
            <p className="text-slate-500 ml-16">Username</p>
        </div>
    );
};


export { Register, Login, JWTToken, Content, Navbar, Suggest, PostPhoto, Home};