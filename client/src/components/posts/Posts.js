import React from 'react'
import { postData } from '../../data/postData'
import Post from '../post/Post'
import './posts.css'

const Posts = () => {
  return (
    <div className='Posts'>
        {postData.map((post, id)=>{
            return <Post data={post} id={id}/>
        })}
    </div>
  )
}

export default Posts