import {  useEffect, useState } from "react"
import { useNavigate} from "react-router-dom";
import { host } from "./endpoint";


export default function Register ({ onToken, token })  {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();  

    
    
    useEffect(() =>{
        onToken();
        if(token){
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])
    

    const handleChange = (e) => {
        if (e.target.name === 'username'){
            setUsername(e.target.value);
        } else if (e.target.name === 'name'){
            setName(e.target.value);
        } else if (e.target.name === 'email'){
            setEmail(e.target.value);
        } else if (e.target.name === 'password'){
            setPassword(e.target.value);
        } else if (e.target.name === 'age'){
            setAge(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!username || !name || !email || !password || !age){
            return
        }

        const registerData = {
            username, name, email, password, age: parseInt(age, 10),
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        };

        const response = await fetch(host.UserEndpoint.register(), requestOptions);
        const responseJson = await response.json();

        if (responseJson.status === 201){
                const urlLogin = host.UserEndpoint.login();
                const loginData = {
                    username, password
                }
                const requestOptionsLogin = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                };

               const responseLogin = await fetch(urlLogin, requestOptionsLogin);
               const responseLoginJson = await responseLogin.json();
               if (responseLoginJson.status === 200){
                document.cookie = `jwt=${responseLoginJson.data}; path=/`;
                onToken();
                navigate('/');
               } else {
                console.log(responseLogin.data);
               }

        } else {
            console.log(responseJson.message);
        };
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setLogin(true)
        
        if (login){
            navigate('/login');
        };
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
                <div className="bg-sky-400 w-2/5 p-8  rounded-lg shadow-lg">
                    <div className="flex justify-center mb-4">
                       <h1 className="text-lg font-semibold text-slate-100 text-center">Welcome to Gosnap, please sign up to see photos from your friends.</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-center my-2 h-7">
                            <input type="text" name="username" value={username} onChange={handleChange} placeholder="Username" className="w-3/4 rounded-md pl-3"/>
                        </div>
                        <div className="flex justify-center my-2 h-7">
                            <input type="text" name="name" value={name} onChange={handleChange} placeholder="Name" className="w-3/4 rounded-md pl-3"/>
                        </div>
                        <div className="flex justify-center  my-2 h-7">
                            <input type="text" name="email" value={email} onChange={handleChange} placeholder="Email" className="w-3/4 rounded-md pl-3" />
                        </div>
                        <div className="flex justify-center  my-2 h-7">
                            <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" className="w-3/4 rounded-md pl-3"/>
                        </div>
                        <div className="flex justify-center  my-2 h-7">
                            <input type="number" name="age" value={age} onChange={handleChange} placeholder="Age" className="w-3/4 rounded-md pl-3" />
                        </div>
                        <div className="mt-4 bg-slate-200 flex justify-center mx-auto w-28 rounded-lg group hover:bg-slate-600 ease-in-out duration-500">
                            <button type="submit" className="text-lg w-full text-slate-700 group-hover:text-slate-200 ease-in-out duration-500">Sign up</button>
                        </div>
                    </form>
                    <form onSubmit={handleLogin}>
                        <div className=" flex flex-col justify-center mt-3">
                            <p className="mb-2 text-base text-slate-800 mx-auto">Already have an account?</p>
                            <button type="submit" className="bg-slate-200 rounded-lg mx-auto text-slate-700 text-lg w-28 hover:bg-slate-600 hover:text-slate-200 ease-in-out duration-500">Login</button>
                        </div>
                    </form>

                </div>
        </div>
    );
};