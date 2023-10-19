export default function Follow({ token, username, onFollowToggle }) {
    const handleFollow = async () => {
        const url = `http://localhost:8000/follows/${username}`;
        const requestOptions = {
            method: 'POST',
            headers: {
                 'Authorization': `Bearer ${token}`,
                 'Content-Type': 'application/json',
            },
       };

        const response = await fetch(url, requestOptions);
        const responseJson = await response.json();
        if (responseJson.status === 200){
            onFollowToggle();
        } else {
            console.log('fail follow', responseJson.message);
        };
    };

    return(
        <span className="flex-1">
            <button onClick={handleFollow} className="text-sky-500"><span>Follow</span></button>
        </span>
    )
}