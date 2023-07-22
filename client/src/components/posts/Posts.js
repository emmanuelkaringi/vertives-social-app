import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import Post from '../post/Post'
import './posts.css'
import axios from 'axios'

const Posts = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [Posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("forYou");


  useEffect(()=>{
    fetchPosts();
  },[activeTab]);

  const fetchPosts = async () => {
    try {
      let response;
      if (activeTab === "following") {
        response = await axios.get(`http://localhost:4020/feed/following/${user.user_id}`, {
          withCredentials: true,
        });
      } else if (activeTab === "forYou") {
        response = await axios.get('http://localhost:4020/feed/all', {
          withCredentials: true,
        });
      }
      setPosts(response.data.data); // Check if response.data.data is the correct array
    } catch (error) {
      console.error('Error fetching Posts:', error);
    }
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='Posts'>
      <div className="feed__header">
        <div
          className={`feed__tab ${activeTab === "forYou" ? "active" : ""}`}
          onClick={() => handleTabChange("forYou")}
        >
          For You
        </div>
        <div
          className={`feed__tab ${activeTab === "following" ? "active" : ""}`}
          onClick={() => handleTabChange("following")}
        >
          Following
        </div>
      </div>

      {Posts.length === 0 ? (
      <p>No posts found.</p>
    ) : (
      Posts.map((post) => <Post post={post} key={post.post_id} />)
    )}
  </div>
  )
}

export default Posts