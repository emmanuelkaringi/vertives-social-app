import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./postshare.css";
import ProfileImg from "../../img/profile.jpg";

const PostShare = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [content_txt, setcontent_txt] = useState("");
  const [mediaType, setMediaType] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const mediaRef = useRef();
  const cloudName = process.env.REACT_APP_CLOUDINARY_NAME;

  const onMediaChange = (e) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      const mediaFile = e.target.files[0];
      setMediaType(mediaFile.type);
      setMediaUrl(URL.createObjectURL(mediaFile));
    }
  };

  const handlePostSuccess = () => {
    toast.success("Post created successfully");
  };

  const handlePostFailure = () => {
    toast.error("Failed to create a post. Please try again");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        mediaType &&
        (mediaType.includes("image") || mediaType.includes("video"))
      ) {
        const formData = new FormData();
        formData.append("file", mediaRef.current.files[0]);
        formData.append("upload_preset", "rcjzhiuu");
        const response1 = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/${
            mediaType.includes("image") ? "image" : "video"
          }/upload`,
          formData
        );
        const media_url = response1.data.secure_url;
        console.log("Media uploaded to Cloudinary:", media_url);

        const newPost = {
          user_id: user.user_id,
          content_txt: content_txt,
          media_url: media_url.toString(),
        };

        const response = await axios.post(
          "http://localhost:4020/post/new",
          newPost,
          { withCredentials: true }
        );

        if (response.data) {
          console.log("Post shared successfully:", response.data);
          handlePostSuccess();
        }

        console.log(response);
        console.log(newPost);
      } else {
        const newPost = {
          user_id: user.user_id,
          content_txt: content_txt,
        };

        const response = await axios.post(
          "http://localhost:4020/post/new",
          newPost,
          { withCredentials: true }
        );

        if (response.data) {
          console.log("Post shared successfully:", response.data);
          handlePostSuccess();
        }
      }

      // Clear form fields and reset state as needed
      setcontent_txt("");
      setMediaType(null);
      setMediaUrl("");
    } catch (error) {
      console.error("Error sharing post:", error.response.data);
      handlePostFailure();
    }
  };

  return (
    <>
      <div className="PostShare">
        <img src={user.profilepic_url} alt="" />
        <div>
          <input
            type="text"
            placeholder="What is happening?"
            value={content_txt}
            onChange={(e) => setcontent_txt(e.target.value)}
          />
          <div className="postOptions">
            <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={() => mediaRef.current.click()}
            >
              <i className="fa fa-image"> Photo</i>
            </div>
            <div
              className="option"
              style={{ color: "var(--video)" }}
              onClick={() => mediaRef.current.click()}
            >
              <i className="fa fa-video"> Video</i>
            </div>
            <button className="button ps-button" onClick={handleSubmit}>
              Share
            </button>
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myMedia"
                ref={mediaRef}
                onChange={onMediaChange}
              />
            </div>
          </div>
          {mediaType && mediaType.includes("image") && (
            <div className="previewImage">
              <i
                className="fa fa-light fa-xmark"
                onClick={() => setMediaType(null)}
              ></i>
              <img src={mediaUrl} alt="" />
            </div>
          )}
          {mediaType && mediaType.includes("video") && (
            <div className="previewVideo">
              <i
                className="fa fa-light fa-xmark"
                onClick={() => setMediaType(null)}
              ></i>
              <video src={mediaUrl} alt="" controls />
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PostShare;
