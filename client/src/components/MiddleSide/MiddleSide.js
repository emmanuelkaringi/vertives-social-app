import React from "react";
import NavBar from "../NavBar/NavBar";
import PostShare from "../PostShare/PostShare";
import Posts from "../posts/Posts";
import "./MiddleSide.css";

const MiddleSide = () => {
  return (
    <div className="postside">
      <NavBar />
      <PostShare />
      <Posts />
    </div>
  );
};

export default MiddleSide;
