import { useState } from "react";
import { useNavigate } from "react-router-dom";

let exportUsername, exportPassword;
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();
    let isSuccess

    const handleChange = (e) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password'){
            setPassword(e.target.value);
        } else if (e.target.name === 'age') {
            setAge(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = 'http://localhost:8000/users/register';
        const registerData = {
            username,
            email,
            password,
            age: parseInt(age, 10),
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
            isSuccess = data.success;
            navigate("/");
        })
        .catch(error => {
            console.log('Register failed', error);
        });
    }

    if(isSuccess === 200){
        exportUsername = username;
        exportPassword = password;
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

export { Register, exportPassword, exportUsername };