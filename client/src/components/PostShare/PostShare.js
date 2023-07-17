import React, { useState, useRef } from "react";
import axios from "axios";
import "./postshare.css";
import ProfileImg from "../../img/profile.jpg";
import { useAuth } from "../../AuthContext";

const PostShare = () => {
  const { user } = useAuth();
  const user_id = user?.user_id;
  const [content_txt, setcontent_txt] = useState("");
  const [media_url, setmedia_url] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const imageRef = useRef();
  const videoRef = useRef();
  const cloudName=process.env.REACT_APP_CLOUDINARY_NAME

  const onImageChange = (e) => {
    console.log(e.target.files)
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  const onVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let vid = e.target.files[0];
      setVideo({
        video: URL.createObjectURL(vid),
      });
    }
  };

  const uploadImage = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "rcjzhiuu");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
      );

      setmedia_url(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const uploadVideo = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "rcjzhiuu");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        formData,
      );

      setmedia_url(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if contentTxt is empty before submitting
    if (!content_txt) {
      console.error("Post content is empty");
      return;
    }
    // Check if either image or video is selected
    if (image) {
      // Upload the image to Cloudinary
      uploadImage(image.image);
    } else if (video) {
      // Upload the video to Cloudinary
      uploadVideo(video.video);
    } else {
      // If neither image nor video is selected, proceed without media_url
      createPost();
    }
  };
  
  const createPost = async () => {
    const newPost = {
      user_id: user_id,
      content_txt: content_txt,
      media_url: media_url.toString(),
    };
  
    try {
      const response = await axios.post(
        "http://localhost:4020/post/new",
        newPost,
        { withCredentials: true }
      );
  
      console.log(response);
      console.log(newPost)
  
      // Clear form fields and reset state as needed
      setcontent_txt("");
      setImage(null); // Clear the image state
      setVideo(null); // Clear the video state
    } catch (error) {
      // Handle errors if the post creation fails
      console.error("Error:", error);
    }
  };

  return (
    <div className="PostShare">
      <img src={ProfileImg} alt="" />
      <div>
        <input
          type="text"
          placeholder="What is happening?"
          value={content_txt} // Bind the input value to the state variable
          onChange={(e) => setcontent_txt(e.target.value)}
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <i className="fa fa-image"> Photo</i>
          </div>
          <div
            className="option"
            style={{ color: "var(--video)" }}
            onClick={() => videoRef.current.click()}
          >
            <i className="fa fa-video"> Video</i>
          </div>
          <button className="button ps-button" onClick={handleSubmit}>
            Share
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
            <input
              type="file"
              name="myVideo"
              ref={videoRef}
              onChange={onVideoChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <i
              className="fa fa-light fa-xmark"
              onClick={() => setImage(null)}
            ></i>
            <img src={image.image} alt="" publicid={media_url}/>
          </div>
        )}
        {video && (
          <div className="previewVideo" onClick={() => setVideo(null)}>
            <i
              className="fa fa-light fa-xmark"
              
            ></i>
            <video src={video.video} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
