/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import images from "./asset"
function HandleCommentIcon () {
    return(
        <div>
            <img src={images.comment} alt="comment" className="scale-[.84] hover:opacity-70 cursor-pointer pt-[13.5px] pl-1" />
        </div>
    )
}

function HandleWriteComment({ token, photoId, onCommentState }) {
  const [message, setMessage] = useState('');

  const handleSubmitComment = async () => {
    const url = `http://localhost:8000/comments`;
    const commentData = {
      message,
      photoId,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    };
    const response = await fetch(url, requestOptions);
    const responseJson = await response.json();
    if (responseJson.status === 201){
      setMessage('');
      onCommentState()
    }else {
      console.log('failed to send comment : ', responseJson.message)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  return (
    <div>
      <form className="text-xs">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown} 
          placeholder="Add a comment..."
          className="placeholder-text-slate-500 mb-4 focus:outline-none bg-slate-50 placeholder:font-light w-full h-auto"
        />
      </form>
    </div>
  );
}



function HandleGetComment({ token, photoId, commentState }) {
  const [allComments, setAllComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [showAllCommentsButton, setShowAllCommentsButton] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const url = 'http://localhost:8000/comments';

  useEffect(() => {
    async function fetchComments() {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(url, requestOptions);
        const responseJson = await response.json();

        if (responseJson.status === 200) {
          const filteredComments = responseJson.data.filter(
            // eslint-disable-next-line eqeqeq
            (comment) => comment.photoId == photoId
          );
          setAllComments(filteredComments);
          setCommentCount(filteredComments.length);

          if (filteredComments.length > 2) {
            setComments(filteredComments.slice(-2));
            setShowAllCommentsButton(true);
          } else {
            setComments(filteredComments);
          }
        } else {
          console.log('Gagal mengambil komentar:', responseJson.message);
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    }

    fetchComments();
  }, [photoId, token, url, commentState]);

  const handleShowAllCommentsButton = () => {
    setComments(allComments);
    setShowAllCommentsButton(false);
  };

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p className="text-xs my-1"><span className="font-semibold">{comment.User.username} </span>{comment.message}</p>
        </div>
      ))}
      {showAllCommentsButton && (
        <div>
        <button className="text-xs text-slate-600 font-normal" onClick={handleShowAllCommentsButton}>View all {commentCount} comments</button>
      </div>
      )}
    </div>
  )
}

  export { HandleWriteComment, HandleCommentIcon, HandleGetComment };