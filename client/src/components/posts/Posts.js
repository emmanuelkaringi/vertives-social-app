import React, { useEffect, useState } from 'react'
//import { postData } from '../../data/postData'
import Post from '../post/Post'
import './posts.css'
import axios from 'axios'

const Posts = () => {

  const [Posts, setPosts] = useState([]);

  useEffect(()=>{
    fetchPosts();
  },[]);

  const fetchPosts = async () => {
    try{
      const response = await axios.get('http://localhost:4020/feed/all',{
        withCredentials:true,
      });
      const results = response.data.data;
      setPosts(results);
      console.log(results)
    }catch(error) {
      console.error('Error fetching Posts:', error);
    }

   
  };

  return (
    <div className='Posts'>
      {Posts?.map((post, post_id) => (
        <Post post={post} key={post_id} />
      ))}
    </div>
  )
}

export default Posts