/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import Follow from "./follow";
import { host } from "./endpoint";
import { Link } from "react-router-dom";
import images from "./asset";

export default function Suggest ({ token, onUserLogin, onFollowToggle, followings, followToggle, onProfilePicture, profilePicture })  {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [usersNotFiltered, setUsersNotFiltered] = useState([]);
    const [users, setUsers] = useState([]);

    const getUser = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

     const response = await fetch(host.UserEndpoint.getUserLogin(), requestOptions);
     const responseJson = await response.json();
     if(responseJson.status === 200){
       setUsername(responseJson.data.username);
       setName(responseJson.data.name);
       if (responseJson.data.profilePicture === 'empty'){
          return;
       }
       onProfilePicture(responseJson.data.profilePicture);
     } else {
       console.log('failed to get user data : ', responseJson.message);
     };
    };

    const getAllUsers = async () => {
     const requestOptions = {
          method: 'GET',
          headers: {
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'application/json',
          },
     };

     const response = await fetch(host.UserEndpoint.getAllUser(), requestOptions);
     const responseJson = await response.json();
     setUsersNotFiltered(responseJson.data);
    }

    
    const handleFilterUsers = async () => {
     if (!usersNotFiltered) {
       return;
     };
     if (!followings){
          setUsers(usersNotFiltered);
     };
   
     const filteredUsers = usersNotFiltered.filter((user) => {
       return !followings.includes(user.username);
     });
   
     setUsers(filteredUsers);
   };
   
     

     useEffect(() => {
          if (!token) {
              return;
          }
          getUser();
          getAllUsers();
          // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [token]);

      useEffect(()=> {
          onUserLogin(username)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      })
      
      useEffect(() => {
          handleFilterUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [followings, usersNotFiltered, followToggle]);

    return (
        <div className="bg-slate-50  w-1/5  max-w-xs text-sm min-h-screen">
           <div className="flex mt-5">
               <div className="mr-2">
                    <img src={profilePicture || images.profilePicture} alt="profilePicture" className="w-8 h-8 rounded-full object-cover"></img>
               </div>
               <Link to='/user' >
                    <p className="-mb-[4px] font-semibold">{ username }</p>
                    <p className="text-slate-500">{ name }</p>
               </Link>
           </div>
           <div>
                <p className="font-semibold text-slate-400 my-3">Suggested for you</p>
           </div>
           <div>
               {users !== null ? (
               users.map((user) => (
               <div key={user.username}>
                    <div className="my-4 -mb-[6px] font-medium flex">
                         <p className="flex-1">{user.username}</p>
                         <Follow token={token} username={user.username} onFollowToggle={onFollowToggle} />
                    </div>
                    <p className="text-slate-500 text-xs mt-[5.5px]">Followed by...</p>
               </div>
               ))
               ) : (
                    <p>No users to display</p>
               )}
           </div>
           <div className="text-slate-400 mt-5">
                <a href="#" className="mr-1">About</a>.
                <a href="#" className="mx-1">Help</a>.
                <a href="#" className="mx-1">Privace</a>.
                <a href="#" className="mx-1">Terms</a>
           </div>
           <div className="text-slate-400 mt-3">
                <p>© 2023 GOSNAP FROM HANS</p>
           </div>
        </div>
    );
};