/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { host } from "./endpoint";
import styled from "styled-components";

const StyledSVG = styled.svg`fill: #0a1f42;`;

function HandleCommentIcon () {
    return(
        <div className="mt-[10px] scale-[.85]">
          <StyledSVG xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512">
            <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" />
          </StyledSVG> 
        </div>
    )
}

function HandleWriteComment({ token, photoId, onCommentToggle }) {
  const [message, setMessage] = useState('');

  const handleSubmitComment = async () => {
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
    const response = await fetch(host.commentEndpoint.writeComment(), requestOptions);
    const responseJson = await response.json();
    if (responseJson.status === 201){
      setMessage('');
      onCommentToggle()
    }else {
      console.log('failed to send comment : ', responseJson.message)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitComment();
    };
  };

  return (
    <div>
      <form className="text-sm2 leading-sm2 mt-1">
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

function HandleGetComment({ token, photoId, commentToggle }) {
  const [allComments, setAllComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [showAllCommentsToggle, setShowAllCommentsToggle] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    if(!token){
      return;
    }
    
    async function fetchComments() {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(host.commentEndpoint.getComment(), requestOptions);
        const responseJson = await response.json();

        if (responseJson.status === 200) {
          if (responseJson.data == null){
            return
          }
          const filteredComments = responseJson.data.filter(
            // eslint-disable-next-line eqeqeq
            (comment) => comment.photoId == photoId
          );
          setAllComments(filteredComments);
          setCommentCount(filteredComments.length);
          setComments(filteredComments);
          setShowAllCommentsToggle(false)
          
        } else {
          console.log('Gagal mengambil komentar:', responseJson.message);
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    }

    fetchComments();
  }, [photoId, token, commentToggle]);

  const handleShowAllCommentsToggle = () => {
    setComments(allComments);
    setShowAllCommentsToggle(!showAllCommentsToggle);
  };

  return (
    <div className="mt-1">
      {showAllCommentsToggle ? (
        <div>
          {comments.map((comment) => (
            <div key={comment.id}>
              <p className="text-sm2 leading-sm2 mb-1">
                <span className="font-semibold">{comment.User.username} </span>
                {comment.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <button
          className="text-sm2 leading-sm2 text-slate-600 font-normal"
          onClick={handleShowAllCommentsToggle}
          style={{ display: comments.length > 0 ? 'block' : 'none'}}
        >
          View all {commentCount} comments
        </button>
      )}
    </div>
  );
}

  export { HandleWriteComment, HandleCommentIcon, HandleGetComment };