import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "./endpoint";

export default function PostPhoto({ token }) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Added state for image preview
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "caption") {
      setCaption(e.target.value);
    } else if (e.target.name === "photoBase64") {
      setPhotoFile(e.target.files[0]);

      // Display a preview of the selected image
      if (e.target.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photoFile) {
      alert("Please select a photo");
      return;
    }

    const requestData = {
      title: title,
      caption: caption,
      photoBase64: imagePreview, // Use the preview image instead of base64Image
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };

    try {
      const response = await fetch(host.photoEndpoint.postPhoto(), requestOptions);
      const responseJson = await response.json();
      if (responseJson.status === 201) {
        navigate("/");
      } else {
        console.log("Failed to post photo:", responseJson.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-sm">
      <div className="bg-lime-300 w-2/4 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center my-3">
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              placeholder="Write a title..."
              className="w-3/4 rounded-md pl-3 p-1 border-0 text-slate-800 ring-1 ring-inset ring-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-600"
            />
          </div>
          <div className="flex justify-center my-3">
            <textarea
              name="caption"
              value={caption}
              onChange={handleChange}
              placeholder="Write a caption..."
              className="w-3/4 rounded-md pl-3 p-1 border-2 border-gray-200 text-slate-800 resize-none focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
              rows="4" 
            ></textarea>
          </div>
          <div className="flex items-center justify-center my-3">
            <label htmlFor="photoUpload" className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 cursor-pointer">
              {imagePreview ? (
                <img src={imagePreview} alt="Selected" className="w-12 h-12 object-cover rounded-md" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
            </label>
            <input type="file" name="photoBase64" id="photoUpload" className="hidden" onChange={handleChange} />
          </div>
          <div className="flex justify-center my-3">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
