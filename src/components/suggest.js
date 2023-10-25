/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import Follow from "./follow";
import { host } from "./endpoint";
import { Link } from "react-router-dom";

export default function Suggest ({ token, onUserLogin })  {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [usersNotFiltered, setUsersNotFiltered] = useState([]);
    const [users, setUsers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [followToggle, setFollowToggle] = useState(true);

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

    const getFollowing = async () => {
     const requestOptions = {
          method: 'GET',
          headers: {
               'Authorization' : `Bearer ${token}`,
               'Content-Type': 'application/json',
          },
     };
     const response = await fetch(host.followEndpoint.getFollowing(), requestOptions);
     const responseJson = await response.json();
     setFollowings(responseJson.data);
};
     const handleFilterUsers = async () => {
          if(!followings || !usersNotFiltered){
               setUsers(usersNotFiltered);
               return;
          }
          const filteredUsers = usersNotFiltered.filter((user) => {
               
               const isFollower = followings.some((following) => user.username === following.username);
               return !isFollower;
          })
          setUsers(filteredUsers)
     }
     const handleFollowToggle = () => {
          setFollowToggle(!followToggle);
         }

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
          if (!token) {
               return;
           }
          getFollowing();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [followToggle]);
      
      useEffect(() => {
          handleFilterUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [followings, usersNotFiltered, followToggle]);

    return (
        <div className="bg-slate-50  w-1/5  max-w-xs text-xs min-h-screen">
           <div>
               <Link to='/user' >
                <p className="mt-10 -mb-[6px] font-semibold">{ username }</p>
               </Link>
                <p className="text-slate-500">{ name }</p>
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
                         <Follow token={token} username={user.username} onFollowToggle={handleFollowToggle} />
                    </div>
                    <p className="text-slate-500 text-xss mt-[5.5px]">Followed by...</p>
               </div>
               ))
               ) : (
                    <p>No users to display</p>
               )}
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