/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import Follow from "./follow";

export default function Suggest ({ token })  {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);

    const getUser = async () => {
    const url = 'http://localhost:8000/users'
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

     const response = await fetch(url, requestOptions);
     const responseJson = await response.json();
     if(responseJson.status === 200){
       setUsername(responseJson.data.username);
       setName(responseJson.data.name);
     } else {
       console.log('failed to get user data : ', responseJson.message);
     };
    };

    const getAllUsers = async () => {
     const url = 'http://localhost:8000/users/all'
     const requestOptions = {
          method: 'GET',
          headers: {
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'application/json',
          },
     };

     const response = await fetch(url, requestOptions);
     const responseJson = await response.json();

     const getRandomUsersFromArray = (arr, numItems) => {
          if (numItems >= arr.length) {
            return arr; 
          }
        
          const shuffledArray = arr.slice();
          for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
          }
        
          return shuffledArray.slice(0, numItems);
        }
        const randomUsers = getRandomUsersFromArray(responseJson.data, 5)
     setUsers(randomUsers);

    }

    useEffect(() => {
        if(!token){
            return ;
        }
        getUser();
        getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token]);

    return (
        <div className="bg-slate-50  w-1/5  max-w-xs text-xs min-h-screen">
           <div>
                <p className="mt-10 -mb-[6px] font-semibold">{ username }</p>
                <p className="text-slate-500">{ name }</p>
           </div>
           <div>
                <p className="font-semibold text-slate-400 my-3">Suggested for you</p>
           </div>

           <div>
               {
                    users.map((user) => (
                         <div key={user.username}>
                              <div className="my-4 -mb-[6px] font-medium flex"><p className="flex-1">{user.username} </p><Follow token={token} username={user.username}/></div>
                              <p className="text-slate-500 text-xss mt-[5.5px]">Followed by...</p>
                         </div>
                    ))
               }
           </div>
           <div className="text-xs text-slate-400 mt-5">
                <a href="#" className="mr-1">About</a>.
                <a href="#" className="mx-1">Help</a>.
                <a href="#" className="mx-1">Privace</a>.
                <a href="#" className="mx-1">Terms</a>
           </div>
           <div className="text-xs text-slate-400 mt-6">
                <p>© 2023 GOSNAP FROM HANS</p>
           </div>
        </div>
    );
};