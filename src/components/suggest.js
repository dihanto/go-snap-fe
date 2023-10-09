/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";

export default function Suggest ({ token })  {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const getUser = async () => {
    const url = 'http://localhost:8000/users'
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }

            const response = await fetch(url, requestOptions);
            const responseJson = await response.json();
            if(responseJson.status === 200){
                setUsername(responseJson.data.username);
                setName(responseJson.data.name);
            } else {
                console.log('failed to get user data : ', responseJson.message);
            };
    };

    useEffect(() => {
        if(!token){
            return ;
        }
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token]);

    return (
        <div className="bg-slate-50  w-1/5   text-sm min-h-screen">
           <div>
                <p className="mt-10 -mb-[6px] font-semibold">{ username }</p>
                <p className="text-slate-500">{ name }</p>
           </div>
           <div>
                <p className="font-semibold text-slate-400 my-3">Suggested for you</p>
           </div>
           <div>
                <p className="my-4 -mb-[6px]">user1</p>
                <p className="text-slate-500">name</p>
           </div>
           <div>
                <p className="my-4 -mb-[6px]">user2</p>
                <p className="text-slate-500">name</p>
           </div>
           <div>
                <p className="my-4 -mb-[6px]">user3</p>
                <p className="text-slate-500">name</p>
           </div>
           <div>
                <p className="my-4 -mb-[6px]">user4</p>
                <p className="text-slate-500">name</p>
           </div>
           <div>
                <p className="my-4 -mb-[6px]">user5</p>
                <p className="text-slate-500">name</p>
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