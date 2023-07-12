import React, { useState, useRef } from "react";
import "./postshare.css";
import ProfileImg from "../../img/profile.jpg";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const imageRef = useRef();
  const videoRef = useRef();

  const onImageChange = (e) => {
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

  return (
    <div className="PostShare">
      <img src={ProfileImg} alt="" />
      <div>
        <input type="text" placeholder="What is happening?" />
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
          <button className="button ps-button">Share</button>
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
            <img src={image.image} alt="" />
          </div>
        )}
        {video && (
            <div className='previewVideo'>
                <i className="fa fa-light fa-xmark" onClick={()=>setVideo(null)}></i>
                <video src={video.video} alt="" />
            </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
